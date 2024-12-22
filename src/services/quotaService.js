const WARMING_UP_PERIODS = {
  INITIAL: { maxEmails: 200, duration: 24 * 60 * 60 * 1000 }, // 24 hours
  SECOND_WEEK: { maxEmails: 1000 },
  THIRD_WEEK: { maxEmails: 5000 },
  PRODUCTION: { maxEmails: 50000 },
};

let accountCreationDate = new Date();
let dailyEmailCount = 0;

export const getQuotaStatus = async () => {
  const now = new Date();
  const accountAge = now - accountCreationDate;

  const startOfDay = new Date(now.setHours(0, 0, 0, 0));
  if (dailyEmailCount > 0 && startOfDay > accountCreationDate) {
    dailyEmailCount = 0;
  }

  let currentQuota;
  if (accountAge < 7 * 24 * 60 * 60 * 1000) {
    currentQuota = WARMING_UP_PERIODS.INITIAL;
  } else if (accountAge < 14 * 24 * 60 * 60 * 1000) {
    currentQuota = WARMING_UP_PERIODS.SECOND_WEEK;
  } else if (accountAge < 21 * 24 * 60 * 60 * 1000) {
    currentQuota = WARMING_UP_PERIODS.THIRD_WEEK;
  } else {
    currentQuota = WARMING_UP_PERIODS.PRODUCTION;
  }

  return {
    canSend: dailyEmailCount < currentQuota.maxEmails,
    remainingQuota: currentQuota.maxEmails - dailyEmailCount,
    maxSendRate: currentQuota.maxEmails,
    sentLast24Hours: dailyEmailCount,
  };
};
