import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function StatsCharts({ stats, contributions }) {
  if (!stats) return null;

  // Language usage chart data
  const languageData = {
    labels: Object.keys(stats.languageStats || {}),
    datasets: [
      {
        label: 'Repositories',
        data: Object.values(stats.languageStats || {}),
        backgroundColor: [
          '#3b82f6',
          '#ef4444',
          '#10b981',
          '#f59e0b',
          '#8b5cf6',
          '#06b6d4',
          '#84cc16',
          '#f97316',
        ],
        borderColor: [
          '#1d4ed8',
          '#dc2626',
          '#059669',
          '#d97706',
          '#7c3aed',
          '#0891b2',
          '#65a30d',
          '#ea580c',
        ],
        borderWidth: 2,
      },
    ],
  };

  // Contribution activity chart data
  const contributionDates = Object.keys(contributions || {}).sort();
  const last30Days = contributionDates.slice(-30);
  
  const contributionData = {
    labels: last30Days.map(date => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
    datasets: [
      {
        label: 'Contributions',
        data: last30Days.map(date => contributions[date] || 0),
        backgroundColor: '#3fb950',
        borderColor: '#2ea043',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-slide-up">
      {/* Stats Overview */}
      <div className="card">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          GitHub Stats
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-50 dark:bg-github-dark rounded-lg">
            <div className="text-2xl font-bold text-github-blue">{stats.totalRepos}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Repositories</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 dark:bg-github-dark rounded-lg">
            <div className="text-2xl font-bold text-yellow-500">{stats.totalStars}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Stars</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 dark:bg-github-dark rounded-lg">
            <div className="text-2xl font-bold text-github-green">{stats.totalForks}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Forks</div>
          </div>
          
          <div className="text-center p-4 bg-gray-50 dark:bg-github-dark rounded-lg">
            <div className="text-2xl font-bold text-purple-500">{stats.followers}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
          </div>
        </div>
      </div>

      {/* Language Usage Chart */}
      {Object.keys(stats.languageStats || {}).length > 0 && (
        <div className="card">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Language Usage
          </h3>
          <div className="h-64">
            <Doughnut data={languageData} options={doughnutOptions} />
          </div>
        </div>
      )}

      {/* Contribution Activity */}
      {last30Days.length > 0 && (
        <div className="card lg:col-span-2">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Recent Activity (Last 30 Days)
          </h3>
          <div className="h-64">
            <Bar data={contributionData} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
}