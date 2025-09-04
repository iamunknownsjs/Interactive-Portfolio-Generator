# Interactive Portfolio Generator

Automatically create and update a dynamic GitHub portfolio using an intelligent agent.

![Portfolio Demo](https://github.com/user-attachments/assets/da78b7c2-d936-4370-bc21-4ab6e2b79452)

## Overview

This project helps developers showcase their work effortlessly. An agent fetches your GitHub projects, stats, and contributions, then generates an interactive, customizable portfolio website.  
No manual updates required—just connect your GitHub account and let the agent do the work.

## ✨ Features

- **🤖 Agent-Based Automation:** Periodically pulls your latest projects, commits, and stats from GitHub
- **🎨 Customizable Portfolio:** Choose which projects to feature, edit descriptions, and hide certain repos
- **📊 Interactive Visualizations:** See your language usage, commit history, and contributions via dynamic charts
- **🚀 Easy Deployment:** One-click deploy to GitHub Pages or Vercel
- **🔗 Social Integration:** Display contact info and social profile links
- **📱 Responsive Design:** Mobile-optimized UI with dark/light theme support
- **⚡ Real-time Updates:** Live refresh of portfolio data with automatic agent synchronization

## 🛠 Tech Stack

- **Frontend:** Next.js 14, React 18, Tailwind CSS
- **Charts:** Chart.js, React Chart.js 2
- **Agent Backend:** Node.js with GitHub API integration
- **Hosting:** GitHub Pages, Vercel, Netlify support
- **Icons:** Lucide React

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/iamunknownsjs/Interactive-Portfolio-Generator.git
cd Interactive-Portfolio-Generator
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Configure Environment Variables
```bash
cp .env.example .env
```

Edit the `.env` file with your GitHub credentials:
```env
GITHUB_TOKEN=your_github_personal_access_token_here
GITHUB_USERNAME=your_github_username
```

**📝 Getting a GitHub Token:**
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate a new token with `public_repo` scope
3. Copy the token to your `.env` file

### 4. Run the Portfolio Agent (Optional)
```bash
npm run agent
```
This will fetch your GitHub data and create a `portfolio-data.json` file.

### 5. Start the Development Server
```bash
npm run dev
```
Visit `http://localhost:3000` to see your portfolio!

### 6. Build for Production
```bash
npm run build
```

## 📋 Deployment Options

### GitHub Pages (Automated)
1. Push your code to GitHub
2. Enable GitHub Pages in repository settings
3. The included GitHub Action will automatically build and deploy your portfolio
4. Your portfolio will be available at `https://yourusername.github.io/Interactive-Portfolio-Generator`

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on every push

### Manual Deployment
```bash
npm run build
npm run export
```
Deploy the `out/` directory to any static hosting service.

## 🎮 Usage Guide

### Portfolio Customization
- **Settings Panel:** Click the settings button to change GitHub username
- **Project Management:** Use Hide/Show buttons to manage which projects appear
- **Filters:** Filter projects by language, stars, or update date
- **Export Data:** Download your portfolio data as JSON

### Agent Features
The portfolio agent automatically:
- Fetches repository information and statistics
- Tracks contribution activity
- Updates language usage statistics
- Maintains fresh data with scheduled runs

### Interactive Features
- **Dynamic Charts:** Language usage pie chart and contribution activity graph
- **Project Filtering:** Sort and filter repositories by various criteria
- **Contact Form:** Built-in contact form for portfolio visitors
- **Responsive Design:** Works seamlessly on desktop and mobile

## 🔧 Configuration

### Customizing the Agent
Edit `lib/agent.js` to modify:
- Update frequency (default: 30 minutes)
- Data collection methods
- Storage location

### Styling
- Tailwind CSS configuration in `tailwind.config.js`
- Global styles in `styles/globals.css`
- GitHub-themed color palette included

### GitHub API Integration
The portfolio uses GitHub's REST API to fetch:
- User profile information
- Repository data and statistics
- Public activity events
- Language statistics

## 📁 Project Structure

```
Interactive-Portfolio-Generator/
├── components/           # React components
│   ├── ProfileHeader.js  # User profile display
│   ├── ProjectsGrid.js   # Repository grid with filtering
│   ├── StatsCharts.js    # Interactive charts
│   └── ContactForm.js    # Contact form component
├── lib/                  # Utilities and API integration
│   ├── github.js         # GitHub API wrapper
│   └── agent.js          # Portfolio update agent
├── pages/                # Next.js pages
│   ├── _app.js           # App configuration
│   └── index.js          # Main portfolio page
├── public/               # Static assets
├── styles/               # Global styles
├── .github/workflows/    # GitHub Actions for deployment
└── package.json          # Dependencies and scripts
```

## 🤝 Contributing

Contributions are welcome! Please see our contributing guidelines:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a pull request

## 🐛 Troubleshooting

### Common Issues

**Agent fails to start:**
- Ensure `GITHUB_TOKEN` is set in your environment
- Check token permissions (needs `public_repo` scope)

**Portfolio shows "No data":**
- Run the agent manually: `npm run agent`
- Check if `public/portfolio-data.json` exists
- Verify GitHub username is correct

**Build fails:**
- Run `npm install` to ensure all dependencies are installed
- Check for any TypeScript/ESLint errors

### Rate Limiting
The GitHub API has rate limits:
- **Unauthenticated:** 60 requests per hour
- **Authenticated:** 5,000 requests per hour

The agent is designed to work within these limits.

## 🗺 Roadmap

- [x] GitHub OAuth for user login
- [x] Project selection UI
- [x] Dynamic chart visualizations
- [x] Easy deployment options
- [x] Agent scheduling & notifications
- [ ] Support for GitLab and Bitbucket
- [ ] Blog post integration
- [ ] Advanced theming options
- [ ] Portfolio templates
- [ ] Analytics dashboard

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- GitHub API for providing comprehensive developer data
- Next.js team for the excellent React framework
- Chart.js for beautiful, interactive charts
- Tailwind CSS for rapid UI development

---

**🎯 Ready to showcase your GitHub journey?** Get started now and let your code speak for itself!
