# Yellow Mantis Technology Group - Project Context & Memory

**Last Updated:** April 6, 2026  
**Workspace:** `/Users/jpvanzyl/Workspaces/Yellow-Manits`

---

## Project Overview

Yellow Mantis is a technology holding company with ventures in:
- **Y-QA Platform** - AI-powered QA testing (Valuation: R15M)
- **Quantum Bridge** - Quantum-classical computing bridge (Valuation: R7.5M-R12.5M)
- **Qyvella Robotics** - AI robotics platform (Valuation: R5M-R7.5M)
- **Y-Accounting** - Autonomous financial management (50% ownership, Valuation: R2.5M-R5M)

**Total Portfolio Valuation:** R30M - R40M (Conservative)

The repo contains **three applications** in a monorepo:

| App | Directory | Stack | Purpose |
|-----|-----------|-------|---------|
| **Pitch Deck** | `/` (root) | React 18, Webpack 5, Express.js | Investor-facing website at yellow-mantis.com |
| **PM Web App** | `/web` | React 19, Vite, TypeScript, Tailwind CSS 4, TanStack Query, Zustand, Radix UI | Linear-style project management tool |
| **PM API** | `/api` | Rails 7.1, Ruby 3.1.6, PostgreSQL, Puma, JWT, Pundit, Sidekiq | Backend API for PM web app |

---

## Deployment Information

### Production URLs

| App | Heroku App Name | Production URL |
|-----|-----------------|----------------|
| **Pitch Deck** | `yellow-mantis-pitch` | https://yellow-mantis.com / https://yellow-mantis-pitch-cbf8600f787f.herokuapp.com |
| **PM Web App** | `yellow-mantis-pm-web` | https://yellow-mantis-pm-web-fa3ee43b29be.herokuapp.com |
| **PM API** | `yellow-mantis-pm-api` | https://yellow-mantis-pm-api-dbc580dfc947.herokuapp.com |

### Git Remotes

| Remote | URL | Deploys |
|--------|-----|---------|
| `origin` | https://github.com/jpvzyl/Yellow-Mantis.git | GitHub (source of truth) |
| `heroku` | https://git.heroku.com/yellow-mantis-pitch.git | Pitch deck site |
| `heroku-api` | https://git.heroku.com/yellow-mantis-pm-api.git | PM API |
| `heroku-web` | https://git.heroku.com/yellow-mantis-pm-web.git | PM web app |

### Heroku Buildpack Config (PM Web App)

The `heroku-web` app uses a monorepo buildpack to build from the `web/` subdirectory:

1. `https://github.com/lstoll/heroku-buildpack-monorepo` (copies `web/` to root)
2. `heroku/nodejs` (builds the Vite app)

**Config vars:**
- `APP_BASE=web`
- `VITE_API_URL=https://yellow-mantis-pm-api-dbc580dfc947.herokuapp.com`

### Pitch Deck Pages

| Page | URL | Description |
|------|-----|-------------|
| Introduction Letter | `/introduction-letter` | Company overview |
| Pitch Deck | `/pitch-deck` | Investor pitch with deep dives |
| Features | `/full-features` | Tech stack breakdown |
| Quantum Guide | `/quantum-guide` | Quantum computing explainer |
| Funding Requirements | `/funding` | Interactive budget planner (standalone) |
| Company Structure #1 | `/structure/7x3k9` | Interactive org chart (standalone) |
| Company Structure #2 | `/structure/m4p2n` | Interactive org chart (standalone) |
| Company Structure #3 | `/structure/q8f5t` | Interactive org chart (standalone) |

### PM Web App Pages

| Page | URL | Description |
|------|-----|-------------|
| Dashboard | `/` | Team overview |
| Team Issues | `/team/:id/issues` | Issue list per team |
| Team Board | `/team/:id/board` | Kanban board per team |
| Inbox | `/inbox` | Notifications |
| My Issues | `/my-issues` | Personal issue list |
| Favorites | `/favorites` | Starred items |
| Projects | `/projects` | Project management |
| Roadmap | `/roadmap` | Roadmap view |
| Settings | `/settings` | Workspace settings |
| Admin | `/admin` | User management (admin only) |
| AI Presentation | `/presentations/ai` | "AI: The Full Picture" — 15-section standalone presentation (April 2026) |

### Presentations (Live URLs)

- **AI: The Full Picture:** https://yellow-mantis-pm-web-fa3ee43b29be.herokuapp.com/presentations/ai

### Deployment Commands

**Pitch Deck (yellow-mantis.com):**
```bash
cd /Users/jpvanzyl/Workspaces/Yellow-Manits
npm run build
git push origin main
heroku login  # If authentication expired
git push heroku main
```

**PM Web App:**
```bash
cd /Users/jpvanzyl/Workspaces/Yellow-Manits
git push origin main
git push heroku-web main
```

**PM API:**
```bash
cd /Users/jpvanzyl/Workspaces/Yellow-Manits
git push origin main
git push heroku-api main
```

---

## Tech Stack

### Pitch Deck (root)
- **Frontend:** React 18 + React Router DOM
- **Bundler:** Webpack 5
- **Server:** Express.js (for Heroku)
- **Styling:** CSS with CSS Variables (themes)

### PM Web App (`/web`)
- **Frontend:** React 19, TypeScript, react-router-dom v7
- **Bundler:** Vite 7
- **Styling:** Tailwind CSS 4
- **State:** Zustand (auth, UI), TanStack Query (server state)
- **UI Components:** Radix UI, Lucide icons
- **Layout:** Sidebar + main content via `AppLayout` → `<Outlet />`
- **Auth:** JWT token, `AuthGuard` wrapper

### PM API (`/api`)
- **Framework:** Rails 7.1, Ruby 3.1.6
- **Database:** PostgreSQL
- **Server:** Puma
- **Auth:** JWT (Devise + jwt gem)
- **Authorization:** Pundit
- **Background Jobs:** Sidekiq + Redis
- **Multi-tenancy:** Company → Workspace scoping

---

## File Structure

```
Yellow-Manits/
├── src/                              # Pitch deck (root app)
│   ├── App.js
│   ├── index.js
│   ├── components/
│   └── pages/
├── server.js                         # Express server (pitch deck)
├── webpack.config.js
├── package.json                      # Root pitch deck package
│
├── web/                              # PM Web App (Vite + React)
│   ├── src/
│   │   ├── App.tsx                   # Router + AuthGuard
│   │   ├── main.tsx                  # Entry point
│   │   ├── api/                      # API client + hooks
│   │   ├── components/
│   │   │   └── layout/
│   │   │       ├── AppLayout.tsx     # Sidebar + Outlet shell
│   │   │       ├── Sidebar.tsx       # Navigation sidebar
│   │   │       └── CommandPalette.tsx
│   │   ├── pages/
│   │   │   ├── DashboardPage.tsx
│   │   │   ├── TeamIssuesPage.tsx
│   │   │   ├── AiPresentationPage.tsx  # Standalone AI presentation
│   │   │   └── ...
│   │   ├── stores/                   # Zustand stores (auth, ui)
│   │   └── types/
│   ├── package.json
│   └── vite.config.ts
│
├── api/                              # PM API (Rails)
│   ├── app/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── policies/                 # Pundit policies
│   │   └── serializers/
│   ├── db/
│   │   └── migrate/
│   ├── Gemfile
│   ├── Dockerfile
│   └── Procfile
│
├── Architecture/                     # Documentation
│   └── PROJECT_CONTEXT.md            # This file
├── DEPLOY_AND_DOMAIN.md
└── public/
    ├── index.html
    ├── favicon.ico
    └── mantis-logo-transparent.png
```

---

## Interactive Features (Pitch Deck)

### 1. Funding Requirements Page (`/funding`)

**Features:**
- Executive Summary with auto-calculated totals
- Per-project expense tables (monthly → 12-month calculations)
- Growth % inputs per project
- Share purchase section with equity calculations
- Milestones & deliverables tracking
- Notes section
- Save to localStorage / Export as JSON

**Key Calculations:**
- IP Valuation + Growth % = Total Valuation
- Equity Purchase = Total Valuation × Equity %
- Running Cost Contribution = Project Operating × Running Cost %

### 2. Company Structure Pages (`/structure/[id]`)

**3 Unique URLs (5-character codes):**
- `/structure/7x3k9`
- `/structure/m4p2n`
- `/structure/q8f5t`

**Features:**
- Add company nodes (Holding, Subsidiary, Associate, Joint Venture, Trust, External)
- Drag & drop positioning
- Connect nodes to show ownership relationships
- Click connections to set shareholding %
- Color-coded by company type
- Notes section at bottom
- Save to localStorage / Export as JSON
- Each URL has independent data storage

---

## Design System

### Pitch Deck Colors (Deep Charcoal Theme)
```css
--bg-primary: #1a1a1a
--bg-secondary: #242424
--bg-tertiary: #2d2d2d
--primary-yellow: #F2D974
--text-primary: #E8E8E8
--text-secondary: #D0D0D0
--text-muted: #909090
--border-subtle: rgba(255, 255, 255, 0.1)
```

### PM Web App
- Tailwind CSS 4 with custom theme tokens (defined in Tailwind config)
- Dark theme with surface/text/border token system

### Fonts
- Headers: System fonts with fallbacks
- Mono: JetBrains Mono (for numbers/code)

---

## Recent Changes

### April 2026
1. **Added AI Presentation page** — "AI: The Full Picture" at `/presentations/ai` in PM web app, 15-section standalone presentation for company AI talk
2. **Fixed Heroku PM web deployment** — Added monorepo buildpack + `APP_BASE=web` config so `heroku-web` correctly builds the Vite app instead of the root pitch deck
3. **Multi-tenant company management** — Added company model, company switcher in sidebar, admin user management

### December 2025
1. **Added Company Structure pages** - Interactive drag-and-drop org charts with 3 unique URLs
2. **Enhanced Funding Requirements** - Added growth percentages, share purchase section, unit costs for robotics
3. **Removed theme switcher** - Static Deep Charcoal theme
4. **Logo updated** - Using `mantis-logo-transparent.png` (static, no animation)
5. **Renamed Nova Robotics → Qyvella Robotics**
6. **Changed Y-QA status** - "Rollout Q1 2026"
7. **Added Y-Accounting note** - "In conjunction with a third party"
8. **Changed "Founder & CEO" → "Founder"**

---

## Valuations (IP_VALUATION_ANALYSIS.md)

| Product | Current Value | Moderate Growth | High Growth | Maturity |
|---------|---------------|-----------------|-------------|----------|
| Y-QA Platform | R15M | R22.5M (1.5x) | R37.5M (2.5x) | R30M-R50M |
| Quantum Bridge | R7.5M-R12.5M | R13M-R16.25M | R37.5M-R125M | R50M-R150M+ |
| Qyvella Robotics | R5M-R7.5M | R6.5M-R9.75M | R15M-R37.5M | R15M-R40M |
| Y-Accounting (50%) | R2.5M-R5M | R3.5M-R7M | R5M-R10M | R5M-R12.5M |

**TAM (Total Addressable Market):**
- Y-QA: $4.8B (12% CAGR)
- Quantum: $1.3B → $8.6B (32% CAGR)
- Robotics: $18.4B (15% CAGR)
- Accounting: $19.6B (8% CAGR)

---

## GitHub Repository

- **Repo:** https://github.com/jpvzyl/Yellow-Mantis
- **Branch:** main

---

## Contact

**JP van Zyl - Founder**
- Email: jp@yellow-mantis.com
- Phone: +27 76 486 3294
- Website: yellow-mantis.com

---

## Troubleshooting

### Heroku Push Fails
```bash
heroku login  # Re-authenticate
git push heroku main       # Pitch deck
git push heroku-web main   # PM web app
git push heroku-api main   # PM API
```

### Heroku Push Rejected (non-fast-forward)
Heroku remotes can diverge. Since GitHub is the source of truth, force push is safe:
```bash
git push heroku-web main --force
```

### Port 3000 in Use (Local Dev)
```bash
lsof -ti:3000 | xargs kill  # Kill process
npm start
```

### Build Errors
```bash
rm -rf node_modules
npm install
npm run build
```

### PM Web App Build Errors
```bash
cd web
rm -rf node_modules
npm install
npm run build
```

---

## Related Workspaces

| Workspace | Path | Description |
|-----------|------|-------------|
| Y-QA | `/Users/jpvanzyl/Workspaces/Y-QA` | QA Platform Rails App |
| Quantum | `/Users/jpvanzyl/Workspaces/Quantum` | Quantum Bridge Python |
| Robotics | `/Users/jpvanzyl/Workspaces/Robotics v1` | Django Command Center |
| Y-Accounting | `/Users/jpvanzyl/Workspaces/Y-Accounting` | Accounting Software |
| Faces App | `/Users/jpvanzyl/Workspaces/Faces/Faces App` | Event Tracking Rails |

---

*This file serves as a project memory for AI assistants. Update after significant changes.*

