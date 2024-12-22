import { body, validationResult } from 'express-validator';

export const validateSendEmail = [
  body('Source').isEmail().withMessage('Valid email address required for Source'),
  body('Destination.ToAddresses').isArray().withMessage('ToAddresses must be an array'),
  body('Destination.ToAddresses.*').isEmail().withMessage('Valid email addresses required'),
  body('Message.Subject.Data').notEmpty().withMessage('Subject is required'),
  body('Message.Body').custom((body) => {
    if (!body.Html?.Data && !body.Text?.Data) {
      throw new Error('Either Html or Text content is required');
    }
    return true;
  }),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          code: 'ValidationError',
          message: 'Invalid input parameters',
          details: errors.array()
        }
      });
    }
    next();
  }
];