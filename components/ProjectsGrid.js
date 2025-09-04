import { useState } from 'react';
import { Star, GitFork, Eye, Calendar, ExternalLink } from 'lucide-react';

export default function ProjectsGrid({ repos, onProjectToggle, hiddenRepos = [] }) {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('updated');

  if (!repos || repos.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">No repositories found.</p>
      </div>
    );
  }

  const filteredRepos = repos
    .filter(repo => {
      if (filter === 'all') return true;
      if (filter === 'starred') return repo.stargazers_count > 0;
      if (filter === 'forked') return repo.forks_count > 0;
      return repo.language === filter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stargazers_count - a.stargazers_count;
        case 'forks':
          return b.forks_count - a.forks_count;
        case 'updated':
        default:
          return new Date(b.updated_at) - new Date(a.updated_at);
      }
    });

  const languages = [...new Set(repos.map(repo => repo.language).filter(Boolean))];

  return (
    <div className="animate-slide-up">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Projects ({filteredRepos.length})
        </h2>
        
        <div className="flex flex-wrap gap-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-github-gray text-gray-900 dark:text-white"
          >
            <option value="all">All Projects</option>
            <option value="starred">Starred</option>
            <option value="forked">Forked</option>
            {languages.map(lang => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-github-gray text-gray-900 dark:text-white"
          >
            <option value="updated">Last Updated</option>
            <option value="stars">Most Stars</option>
            <option value="forks">Most Forks</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRepos.map(repo => {
          const isHidden = hiddenRepos.includes(repo.id);
          
          return (
            <div
              key={repo.id}
              className={`card hover:shadow-xl transition-shadow duration-300 ${
                isHidden ? 'opacity-50' : ''
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-github-blue transition-colors flex items-center gap-2"
                  >
                    {repo.name}
                    <ExternalLink size={16} />
                  </a>
                </h3>
                
                {onProjectToggle && (
                  <button
                    onClick={() => onProjectToggle(repo.id)}
                    className={`px-2 py-1 text-xs rounded ${
                      isHidden
                        ? 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        : 'bg-github-blue text-white hover:bg-blue-600'
                    } transition-colors`}
                  >
                    {isHidden ? 'Show' : 'Hide'}
                  </button>
                )}
              </div>
              
              {repo.description && (
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                  {repo.description}
                </p>
              )}
              
              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-4">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      />
                      {repo.language}
                    </span>
                  )}
                  
                  <span className="flex items-center gap-1">
                    <Star size={14} />
                    {repo.stargazers_count}
                  </span>
                  
                  <span className="flex items-center gap-1">
                    <GitFork size={14} />
                    {repo.forks_count}
                  </span>
                </div>
                
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(repo.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Simple language color mapping
function getLanguageColor(language) {
  const colors = {
    JavaScript: '#f7df1e',
    TypeScript: '#3178c6',
    Python: '#3776ab',
    Java: '#ed8b00',
    'C++': '#00599c',
    C: '#555555',
    'C#': '#239120',
    PHP: '#777bb4',
    Ruby: '#cc342d',
    Go: '#00add8',
    Rust: '#000000',
    Swift: '#fa7343',
    Kotlin: '#f18e33',
    HTML: '#e34f26',
    CSS: '#1572b6',
    Vue: '#4fc08d',
    React: '#61dafb',
  };
  
  return colors[language] || '#586069';
}