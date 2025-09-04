// Agent for automatically updating portfolio data
const GitHubAPI = require('./github');
const fs = require('fs').promises;
const path = require('path');

class PortfolioAgent {
  constructor(token, username) {
    this.github = new GitHubAPI(token, username);
    this.username = username;
    this.dataPath = path.join(process.cwd(), 'public', 'portfolio-data.json');
    this.updateInterval = 30 * 60 * 1000; // 30 minutes
  }

  async fetchAndUpdateData() {
    try {
      console.log('🤖 Agent: Fetching latest GitHub data...');
      
      const [stats, contributions] = await Promise.all([
        this.github.getUserStats(),
        this.github.getContributionActivity()
      ]);

      const portfolioData = {
        ...stats,
        contributions,
        lastUpdated: new Date().toISOString(),
        username: this.username
      };

      // Save data to public directory for static access
      await fs.writeFile(this.dataPath, JSON.stringify(portfolioData, null, 2));
      
      console.log('✅ Agent: Portfolio data updated successfully!');
      console.log(`📊 Repos: ${stats.stats.totalRepos}, ⭐ Stars: ${stats.stats.totalStars}`);
      
      return portfolioData;
    } catch (error) {
      console.error('❌ Agent: Error updating portfolio data:', error.message);
      throw error;
    }
  }

  async start() {
    console.log('🚀 Portfolio Agent started!');
    console.log(`👤 Monitoring GitHub user: ${this.username}`);
    
    // Initial fetch
    await this.fetchAndUpdateData();
    
    // Set up periodic updates
    setInterval(async () => {
      try {
        await this.fetchAndUpdateData();
      } catch (error) {
        console.error('❌ Agent: Scheduled update failed:', error.message);
      }
    }, this.updateInterval);

    console.log(`⏰ Agent will update every ${this.updateInterval / 60000} minutes`);
  }
}

// Run agent if this file is executed directly
if (require.main === module) {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME || 'octocat';

  if (!token) {
    console.error('❌ GITHUB_TOKEN environment variable is required');
    process.exit(1);
  }

  const agent = new PortfolioAgent(token, username);
  agent.start().catch(error => {
    console.error('❌ Failed to start agent:', error);
    process.exit(1);
  });
}

module.exports = PortfolioAgent;