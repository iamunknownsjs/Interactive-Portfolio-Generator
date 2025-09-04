import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { Settings, RefreshCw, Download, Github } from 'lucide-react';

import ProfileHeader from '../components/ProfileHeader';
import ProjectsGrid from '../components/ProjectsGrid';
import StatsCharts from '../components/StatsCharts';
import ContactForm from '../components/ContactForm';
import GitHubAPI from '../lib/github';

export default function Portfolio() {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hiddenRepos, setHiddenRepos] = useState([]);
  const [showSettings, setShowSettings] = useState(false);
  const [githubUsername, setGithubUsername] = useState('octocat');

  const loadPortfolioData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Try to load from agent-generated data first
      try {
        const response = await fetch('/portfolio-data.json');
        if (response.ok) {
          const data = await response.json();
          setPortfolioData(data);
          setGithubUsername(data.username || 'octocat');
          setLoading(false);
          return;
        }
      } catch (e) {
        console.log('No cached data found, fetching fresh data...');
      }

      // Fallback to direct API call
      const github = new GitHubAPI(null, githubUsername);
      const [stats, contributions] = await Promise.all([
        github.getUserStats(),
        github.getContributionActivity()
      ]);

      const data = {
        ...stats,
        contributions,
        lastUpdated: new Date().toISOString(),
        username: githubUsername
      };

      setPortfolioData(data);
    } catch (err) {
      setError(err.message || 'Failed to load portfolio data');
    } finally {
      setLoading(false);
    }
  }, [githubUsername]);

  useEffect(() => {
    loadPortfolioData();
  }, [loadPortfolioData]);

  const handleRefresh = async () => {
    await loadPortfolioData();
  };

  const handleProjectToggle = (projectId) => {
    setHiddenRepos(prev => 
      prev.includes(projectId)
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handleUsernameChange = (newUsername) => {
    setGithubUsername(newUsername);
    setPortfolioData(null);
    setLoading(true);
    
    // Reload with new username
    setTimeout(() => {
      loadPortfolioData();
    }, 100);
  };

  const exportData = () => {
    if (!portfolioData) return;
    
    const dataStr = JSON.stringify(portfolioData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${githubUsername}-portfolio-data.json`;
    link.click();
    
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-github-dark flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-github-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">Loading portfolio data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-github-dark flex items-center justify-center">
        <div className="card text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Error Loading Portfolio</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <button onClick={handleRefresh} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{portfolioData?.profile?.name || githubUsername} - Portfolio</title>
        <meta
          name="description"
          content={`${portfolioData?.profile?.name || githubUsername}'s developer portfolio - automatically generated from GitHub`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-github-dark">
        {/* Header Controls */}
        <div className="bg-white dark:bg-github-gray shadow-sm border-b border-gray-200 dark:border-gray-700">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Github className="text-github-blue" size={24} />
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                Interactive Portfolio Generator
              </h1>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleRefresh}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                title="Refresh Data"
              >
                <RefreshCw size={16} />
                Refresh
              </button>
              
              <button
                onClick={exportData}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                title="Export Data"
              >
                <Download size={16} />
                Export
              </button>
              
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                title="Settings"
              >
                <Settings size={16} />
                Settings
              </button>
            </div>
          </div>
          
          {/* Settings Panel */}
          {showSettings && (
            <div className="max-w-6xl mx-auto px-4 pb-4">
              <div className="bg-gray-50 dark:bg-github-dark rounded-lg p-4">
                <div className="flex items-center gap-4">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    GitHub Username:
                  </label>
                  <input
                    type="text"
                    value={githubUsername}
                    onChange={(e) => handleUsernameChange(e.target.value)}
                    className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-github-gray text-gray-900 dark:text-white text-sm"
                    placeholder="Enter GitHub username"
                  />
                  {portfolioData?.lastUpdated && (
                    <span className="text-xs text-gray-500">
                      Last updated: {new Date(portfolioData.lastUpdated).toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
          {/* Profile Header */}
          <ProfileHeader profile={portfolioData?.profile} />

          {/* Stats Charts */}
          <StatsCharts 
            stats={portfolioData?.stats} 
            contributions={portfolioData?.contributions} 
          />

          {/* Projects Grid */}
          <ProjectsGrid
            repos={portfolioData?.repos}
            onProjectToggle={handleProjectToggle}
            hiddenRepos={hiddenRepos}
          />

          {/* Contact Form */}
          <ContactForm />

          {/* Footer */}
          <footer className="text-center py-8 text-gray-600 dark:text-gray-400">
            <p className="mb-2">
              Built with{' '}
              <a
                href="https://github.com/iamunknownsjs/Interactive-Portfolio-Generator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-github-blue hover:underline"
              >
                Interactive Portfolio Generator
              </a>
            </p>
            <p className="text-sm">
              Automatically synced with GitHub • Last updated:{' '}
              {portfolioData?.lastUpdated
                ? new Date(portfolioData.lastUpdated).toLocaleDateString()
                : 'Never'}
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}