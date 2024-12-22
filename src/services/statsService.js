class StatsService {
  constructor() {
    this.emailStats = [];
    this.bounces = new Map();
    this.complaints = new Map();
  }

  recordEmailSent(emailData) {
    this.emailStats.push(emailData);
  }

  getStats() {
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    return {
      totalEmailsSent: this.emailStats.length,
      last24Hours: this.emailStats.filter(stat => stat.timestamp > last24Hours).length,
      uniqueSenders: new Set(this.emailStats.map(stat => stat.source)).size,
      uniqueRecipients: new Set(this.emailStats.map(stat => stat.destination)).size
    };
  }
}

export const statsService = new StatsService();