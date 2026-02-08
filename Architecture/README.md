# Yellow Mantis Pitch Deck

A modern React static site for Yellow Mantis pitch deck pages.

## 🚀 Quick Start

### Install Dependencies

```bash
npm install
```

### Development Server

```bash
npm start
```

This will start the development server at `http://localhost:3000`.

### Production Build

```bash
npm run build
```

This generates optimized production files in the `dist/` folder.

## 📁 Project Structure

```
yellow-mantis-pitch/
├── public/
│   ├── index.html          # HTML template
│   └── favicon.ico         # Favicon (placeholder)
├── src/
│   ├── components/
│   │   ├── Header.js       # Navigation header
│   │   ├── Header.css
│   │   ├── Footer.js       # Site footer
│   │   └── Footer.css
│   ├── pages/
│   │   ├── IntroductionLetter.js    # Introduction page
│   │   ├── IntroductionLetter.css
│   │   ├── PitchDeck.js             # Pitch deck page
│   │   ├── PitchDeck.css
│   │   ├── FullFeatures.js          # Features page
│   │   └── FullFeatures.css
│   ├── styles/
│   │   └── global.css      # Global styles & CSS variables
│   ├── App.js              # Main app component with routing
│   └── index.js            # Entry point
├── package.json
├── webpack.config.js
└── README.md
```

## 🎨 Design System

### Colors

| Variable | Value | Usage |
|----------|-------|-------|
| `--primary-yellow` | `#F4B940` | Primary brand color |
| `--primary-gold` | `#D4A012` | Accent gold |
| `--bg-primary` | `#0D0D0D` | Main background |
| `--bg-secondary` | `#1A1A1A` | Card backgrounds |
| `--text-primary` | `#FFFFFF` | Main text |
| `--text-secondary` | `#B3B3B3` | Secondary text |

### Typography

- **Font Family:** Outfit (Google Fonts)
- **Weights:** 300, 400, 500, 600, 700, 800, 900

## 📄 Pages

1. **Introduction Letter** (`/introduction-letter`)
   - Hero section with company intro
   - Problem & solution overview
   - Impact metrics
   - Contact information

2. **Pitch Deck** (`/pitch-deck`)
   - Problem statements with statistics
   - Solution methodology
   - Competitive comparison table
   - Market opportunity
   - Roadmap timeline

3. **Full Features** (`/full-features`)
   - Tabbed feature categories
   - 50+ capabilities listed
   - Technology stack
   - Interactive comparison

## 🛠️ Technologies

- **React 18** - UI framework
- **React Router 6** - Client-side routing
- **Webpack 5** - Module bundler
- **Babel** - JavaScript compiler
- **CSS3** - Styling with CSS variables

## 📝 Notes

- The logo currently uses an emoji placeholder (🦗). Replace with your custom logo when ready.
- Update contact information in the pages as needed.
- The site is fully responsive and works on mobile, tablet, and desktop.

## 🚢 Deployment

For static hosting (Vercel, Netlify, GitHub Pages):

1. Run `npm run build`
2. Deploy the `dist/` folder

For Heroku or similar:
- Add a `static.json` for buildpack configuration
- Or use a simple Node.js server to serve the built files

---

© 2025 Yellow Mantis


