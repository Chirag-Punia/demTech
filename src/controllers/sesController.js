import { getQuotaStatus } from "../services/quotaService.js";
import { statsService } from "../services/statsService.js";
import { generateMessageId } from "../utils/messageId.js";

export const sendEmail = async (req, res) => {
  const { Source, Destination, Message } = req.body;

  try {
    const quotaStatus = await getQuotaStatus();
    if (!quotaStatus.canSend) {
      return res.status(400).json({
        error: {
          code: "ThrottlingException",
          message:
            "Daily message quota exceeded or account in warming up period",
        },
      });
    }

    statsService.recordEmailSent({
      source: Source,
      destination: Destination,
      timestamp: new Date(),
      messageId: generateMessageId(),
    });

    res.status(200).json({
      MessageId: generateMessageId(),
      RequestId: generateMessageId(),
    });
  } catch (error) {
    res.status(500).json({
      error: {
        code: "InternalFailure",
        message: "An internal error occurred",
      },
    });
  }
};
