import axios from 'axios';

const GITHUB_API_BASE = 'https://api.github.com';

class GitHubAPI {
  constructor(token, username) {
    this.token = token;
    this.username = username;
    this.api = axios.create({
      baseURL: GITHUB_API_BASE,
      headers: {
        'Authorization': token ? `token ${token}` : undefined,
        'Accept': 'application/vnd.github.v3+json',
      },
    });
  }

  async getUserProfile(username = this.username) {
    try {
      const response = await this.api.get(`/users/${username}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }

  async getUserRepos(username = this.username, options = {}) {
    try {
      const { sort = 'updated', per_page = 100, type = 'owner' } = options;
      const response = await this.api.get(`/users/${username}/repos`, {
        params: { sort, per_page, type }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching repositories:', error);
      throw error;
    }
  }

  async getUserStats(username = this.username) {
    try {
      const [profile, repos] = await Promise.all([
        this.getUserProfile(username),
        this.getUserRepos(username)
      ]);

      // Calculate language statistics
      const languageStats = {};
      let totalStars = 0;
      let totalForks = 0;

      repos.forEach(repo => {
        if (repo.language) {
          languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
        }
        totalStars += repo.stargazers_count || 0;
        totalForks += repo.forks_count || 0;
      });

      return {
        profile,
        repos,
        stats: {
          totalRepos: repos.length,
          totalStars,
          totalForks,
          followers: profile.followers,
          following: profile.following,
          languageStats
        }
      };
    } catch (error) {
      console.error('Error fetching user stats:', error);
      throw error;
    }
  }

  async getContributionActivity(username = this.username) {
    try {
      // Note: GitHub's contribution graph API is not public, so we'll simulate it
      // In a real implementation, you might use GitHub GraphQL API or scraping
      const response = await this.api.get(`/users/${username}/events/public`, {
        params: { per_page: 100 }
      });
      
      const events = response.data;
      const contributionData = {};
      
      events.forEach(event => {
        const date = new Date(event.created_at).toISOString().split('T')[0];
        contributionData[date] = (contributionData[date] || 0) + 1;
      });

      return contributionData;
    } catch (error) {
      console.error('Error fetching contribution activity:', error);
      return {};
    }
  }
}

export default GitHubAPI;