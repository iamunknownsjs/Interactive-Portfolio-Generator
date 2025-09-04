# Interactive Portfolio Generator

Automatically create and update a dynamic GitHub portfolio using an intelligent agent.

## Overview

This project helps developers showcase their work effortlessly. An agent fetches your GitHub projects, stats, and contributions, then generates an interactive, customizable portfolio website.  
No manual updates required—just connect your GitHub account and let the agent do the work.

## Features

- **Agent-Based Automation:** Periodically pulls your latest projects, commits, and stats from GitHub.
- **Customizable Portfolio:** Choose which projects to feature, edit descriptions, and hide certain repos.
- **Interactive Visualizations:** See your language usage, commit history, and contributions via dynamic charts.
- **Easy Deployment:** One-click deploy to GitHub Pages or Vercel.
- **Social Integration:** Display contact info and social profile links.

## How It Works

1. **Connect your GitHub profile.**
2. **Agent fetches your repositories, contributions, and activity.**
3. **Portfolio site is generated and deployed.**
4. **Agent keeps your portfolio up to date automatically!**

## Tech Stack

- **Frontend:** React (Next.js or Vite), Chart.js/D3.js
- **Agent Backend:** Node.js or Python (FastAPI)
- **Hosting:** GitHub Pages, Vercel, Netlify

## Getting Started

1. Clone the repo:
   ```bash
   git clone https://github.com/iamunknownsjs/interactive-portfolio-generator.git
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Configure your GitHub token in `.env`:
   ```
   GITHUB_TOKEN=your_token_here
   ```
4. Run the agent and frontend:
   ```bash
   npm run agent
   npm run dev
   ```
5. Visit `localhost:3000` to see your portfolio!

## Roadmap

- [ ] GitHub OAuth for user login
- [ ] Project selection UI
- [ ] Dynamic chart visualizations
- [ ] Easy deployment options
- [ ] Agent scheduling & notifications

## Contributing

PRs welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

MIT
