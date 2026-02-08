# Yellow Mantis — Full Implementation & Design Reference

**Purpose:** Reference for all Yellow Mantis pages before migration.  
**Context:** Content is moving to a Sarfat folder in Workspaces. Yellow Mantis pages will focus only on **dev ventures and dev capabilities**; nothing about the collective/holding companies.  
**Date:** February 2026

---

## 1. App & routing

### 1.1 Entry & layout

- **Entry:** `src/index.js` — `BrowserRouter` wraps `App`; imports `global.css` and `themes.css`.
- **App:** `src/App.js`
  - Renders `Header` and `Footer` only when **not** on a standalone page.
  - **Standalone pages** (no header/footer): `/funding`, any `/structure/*`, any `/organogram/*`, any `/due-diligence/*`.
  - Root `/` redirects to `/introduction-letter`.

### 1.2 Routes

| Path | Component | Header/Footer |
|------|-----------|----------------|
| `/` | Redirect → `/introduction-letter` | Yes |
| `/introduction-letter` | IntroductionLetter | Yes |
| `/pitch-deck` | PitchDeck | Yes |
| `/full-features` | FullFeatures | Yes |
| `/quantum-guide` | QuantumForInvestors | Yes |
| `/funding` | FundingRequirements | **No** (standalone) |
| `/structure/7x3k9` | CompanyStructure (`structureId="7x3k9"`) | **No** |
| `/structure/m4p2n` | CompanyStructure (`structureId="m4p2n"`) | **No** |
| `/structure/q8f5t` | CompanyStructure (`structureId="q8f5t"`) | **No** |
| `/organogram/yellow-mantis` | Organogram | **No** |
| `/due-diligence` | DueDiligenceSummary | **No** |
| `/due-diligence/yqa` | DueDiligenceYQA | **No** |
| `/due-diligence/qproteus` | DueDiligenceQProteus | **No** |
| `/due-diligence/qyvella` | DueDiligenceQyvella | **No** |
| `/due-diligence/boaz` | DueDiligenceBoaz | **No** |
| `/due-diligence/rigelaz` | DueDiligenceRigelaz | **No** |

---

## 2. Shared components

### 2.1 Header (`src/components/Header.js` + `Header.css`)

- **Behaviour:** Fixed top; on scroll > 50px gets `.scrolled` (dark bg, blur, border).
- **Content:**
  - Logo: `MantisIcon` (36px) + text "Yellow Mantis" (gradient).
  - Nav links: Introduction, Pitch Deck, Quantum Guide, Features (from `navLinks`).
  - Active link: `location.pathname === link.path` → `.active` (yellow, underline).
  - CTA: "Contact Us" → `mailto:jp@yellow-mantis.com`.
- **Layout:** `nav-container` max-width 1400px, flex, space-between. Nav links gap 40px.
- **Responsive:** &lt;768px nav links hidden; logo and CTA only.

### 2.2 Footer (`src/components/Footer.js` + `Footer.css`)

- **Content:** MantisIcon (28px), "Yellow Mantis", links (Introduction, Pitch Deck, Features), badges (Innovative, Creative, Fast), copyright.
- **Layout:** Centered column, max-width 1400px; footer-nav flex; badges wrap.

### 2.3 MantisIcon (`src/components/MantisIcon.js`)

- **Props:** `size` (default 60), `className`.
- **Renders:** `<img src="/mantis-logo-transparent.png" alt="Yellow Mantis Logo" width={size} height={size} />` with `objectFit: contain`.

### 2.4 ThemeSwitcher (`src/components/ThemeSwitcher.js` + `themes.css`)

- **Note:** ThemeSwitcher component exists but is **not** rendered in `App.js`. Theme options (charcoal, slate, midnight) are defined in `themes.css` via `html[data-theme="..."]`.

---

## 3. Global design system

### 3.1 Variables (`src/styles/global.css`)

- **Primary:** `--primary-yellow`, `--primary-gold`, `--accent-lime`, `--accent-orange`.
- **Backgrounds:** `--bg-primary`, `--bg-secondary`, `--bg-tertiary`, `--bg-card`.
- **Text:** `--text-primary`, `--text-secondary`, `--text-muted`.
- **Gradients:** `--gradient-primary`, `--gradient-hero`, `--gradient-glow`.
- **Effects:** `--shadow-glow`, `--shadow-card`, `--border-subtle`.
- **Typography:** `--font-primary` (Outfit).
- **Spacing:** `--spacing-xs` through `--spacing-xl`.
- **Radius:** `--radius-sm` through `--radius-xl`.

### 3.2 Global patterns

- **Hero sections:** Gradient hero bg, optional glow layer, centered logo + title + subtitle; many use `var(--gradient-hero)` and radial glows.
- **Sections:** Often `padding: 80px 40px`, `max-width: 1200px` (or 1100px), `margin: 0 auto`. Alternate `.dark-section` or `.alt-bg` with `--bg-secondary` full width, inner content constrained.
- **Cards:** `--bg-secondary` or `--bg-tertiary`, border `--border-subtle`, `--radius-lg`, hover border/glow/yellow.
- **Buttons:** `.btn`, `.btn-primary` (gradient), `.btn-secondary` (outline). Shared in global.css.
- **Lists:** Custom bullets (• or ✓) via `::before` in yellow.

---

## 4. Page-by-page implementation & layout

### 4.1 Introduction Letter (`/introduction-letter`)

**File:** `IntroductionLetter.js` + `IntroductionLetter.css`

**Layout & sections:**

1. **Hero** (`.intro-hero`)
   - Glow: `.intro-hero-glow` (radial gradient, pulse animation).
   - MantisIcon 120px, h1 "Yellow Mantis", tagline "Technology That Breaks Boundaries", subtitle paragraph.
   - Padding 100px 20px 80px; gradient hero bg.

2. **Our Vision** (`.intro-section`)
   - H2 "Our Vision".
   - `.vision-grid`: 5 cards (Quantum Computing, AI Robotics, Race Tracking, AI Accounting, Quality Assurance). Each: icon, h3, p. Grid `repeat(auto-fit, minmax(260px, 1fr))`, gap 30px.

3. **The Challenges We Solve** (`.intro-section.dark-section`)
   - H2 "The Challenges We Solve".
   - `.challenges-container`: 3 `.challenge-item` rows. Each row: `.challenge-before` (label "BEFORE", italic text), `.challenge-arrow` (→), `.challenge-after` (label e.g. "YELLOW MANTIS GROUP" or "RIGELAZ HOLDINGS", solution text). Flex; wrap on small screens.

4. **Proven Results** (`.intro-section`)
   - H2 "Proven Results".
   - `.metrics-grid`: 6 `.metric-card` (60,000+, &lt;10ms, 99%, √N, 5, 100%). Grid auto-fit minmax(180px, 1fr).

5. **Our Ventures** (`.intro-section.dark-section`)
   - H2 "Our Ventures".
   - `.ventures-grid`: 5 venture cards (Quantum Bridge, Qyvella Robotics, Faces Group, Y-Accounting, Y-QA). Each: venture-header (icon, h3, status/note), tagline, ul.venture-features, .venture-tech pills. Card has top gradient bar on hover.

6. **Why Now?** (`.intro-section`)
   - H2 "Why Now?".
   - `.why-now-grid`: 4 cards (AI Capabilities, Quantum Accessibility, Hardware Revolution, Market Demand). Grid auto-fit minmax(260px, 1fr).

7. **Leadership** (`.intro-section.founder-section`)
   - H2 "Leadership".
   - `.founder-card`: two-column grid — founder-info (name, title, bio, links), founder-quote (blockquote with left border).

8. **CTA** (`.intro-cta-section`)
   - MantisIcon 80px, h2 "Ready to See More?", p, two links: Pitch Deck, Full Features. Bg `--bg-secondary`.

**Responsive:** Hero h1 2.5rem on &lt;768px; challenge items column + arrow rotate 90deg; founder card single column; section padding reduced.

---

### 4.2 Pitch Deck (`/pitch-deck`)

**File:** `PitchDeck.js` + `PitchDeck.css`

**Layout & sections:**

1. **Hero** (`.pitch-hero`)
   - `.pitch-hero-bg` radial gradients; MantisIcon 100px; h1 "Investor Pitch Deck"; subtitle "Four Ventures. One Vision. Infinite Potential."

2. **Portfolio Overview** (`.pitch-section`)
   - H2 "The Yellow Mantis Portfolio".
   - `.portfolio-overview`: 5 clickable cards (Quantum Bridge, Qyvella Robotics, Faces Group, Y-Accounting, Y-QA) with anchor links to deep-dive sections. Grid 5 cols → 3 → 2 → 1 by breakpoint. Each: icon, h3, stage, market, short description. Faces has `.production` and ".live".

3. **Venture deep dives** (each `.pitch-section.venture-deep-dive`, full-width bg)
   - **#quantum-bridge:** Venture 1 badge, h2, tagline; problem (ul); solution "Three Paths" (paths-grid: Seamless API, Quantum-Native Data Structures, Reversible Compiler); tech-architecture (code-block); traction grid (1 hr/mo, 5,000+ qubits, etc.).
   - **#qyvella-robotics:** Venture 2; problem/solution; robotics-architecture layers; traction.
   - **#faces-group:** Venture 3; problem/solution; events-showcase grid; tech stack; integrations.
   - **#y-accounting:** Venture 4; note "In conjunction with a third party"; problem/solution; ai-agents-diagram; connection diagram; progress bars.
   - **#y-qa:** Venture 5; problem/solution; quantum-connection; code/showcase.

4. **Technical Excellence** (`.tech-excellence-section`)
   - H2; stack categories; tech pills; architecture diagram; metrics grid.

5. **Competitive Advantage** (`.competitive-section`)
   - H2; advantage-grid cards; comparison-table (us vs others).

6. **Case Study** (`.case-study-section`)
   - case-highlights grid; case-card; code-showcase; performance-metrics.

7. **Financials** (`.financials-section`)
   - funding-overview grid (funding-card, valuation-card); terms-grid.

8. **CTA** (`.pitch-cta-section`)
   - Logo, h2, p, cta-buttons (Features, Quantum Guide), contact info.

**Shared venture-deep-dive patterns:** `.venture-badge`, `.venture-tagline`, `.venture-content` (problem, solution, traction, tech blocks). Code blocks use `.code-block` (monospace, dark bg). Traction uses `.traction-grid` + `.traction-item` (value + label).

---

### 4.3 Full Features (`/full-features`)

**File:** `FullFeatures.js` + `FullFeatures.css`

**Layout & sections:**

1. **Hero** (`.features-hero`)
   - MantisIcon 80px; h1 "Full Feature List"; p "Deep technical breakdown across all Yellow Mantis Group ventures".

2. **Tab navigation** (`.feature-tabs`)
   - Sticky (top: 70px). Buttons: Quantum Bridge, Qyvella Robotics, Faces Group, Y-Accounting, Y-QA. State: `activeTab` ('quantum' | 'robotics' | 'faces' | 'accounting' | 'yqa'). Each tab has a color for `--tab-color`.

3. **Feature content** (`.feature-content`) — conditional per tab
   - **Quantum:** venture-header-bar; feature-category "Core Framework" (feature-grid of feature-cards: QuantumBridge, QUBO Encoder, Provider Layer); "Three Research Paths" (path-detail-cards with code-example); further categories.
   - **Robotics:** header bar; categories with feature-grid and path-detail-cards.
   - **Faces:** header bar; categories (events, mobile, integrations, etc.).
   - **Accounting:** header bar; categories (agents, document intelligence, etc.).
   - **Y-QA:** header bar; categories (AI testing, quantum integration, etc.).

**Patterns:** `.venture-header-bar` (h2 + status-badge); `.feature-category` (h3 + grid or path-details); `.feature-card` (h4, p, ul); `.path-detail-card` (path-header with path-num, difficulty badge, code-example); `.code-example` (pre, monospace).

---

### 4.4 Quantum for Investors (`/quantum-guide`)

**File:** `QuantumForInvestors.js` + `QuantumForInvestors.css`

**Layout & sections:**

1. **Hero** (`.quantum-hero`)
   - quantum-hero-bg; MantisIcon 100px; h1 "Quantum Computing: The Barrier & The Bridge"; subtitle "A Plain-English Guide for Investors".

2. **What is Quantum Computing?** (`.quantum-section`)
   - H2; intro-grid (Classical vs Quantum cards); comparison-example with quantum-table (Approach, How It Works, Time Required); key-insight paragraph.

3. **Observer Effect** (`.quantum-section.alt-bg`)
   - H2; investor-quote blockquote; section-intro; concept-card (measurement problem, analogy-box); business-implications with requirements-grid.

4. **Further sections** (alternating `.quantum-section` / `.quantum-section.alt-bg`)
   - Multiple educational sections (decoherence, why now, Yellow Mantis bridge, etc.) with concept-cards, tables, requirement-items, analogy-boxes.

**Patterns:** `.intro-card`, `.intro-card.highlight`; `.quantum-table`; `.concept-card`; `.analogy-box`; `.requirement-item` (req-number + req-content); `.investor-quote`.

---

### 4.5 Funding Requirements (`/funding`)

**File:** `FundingRequirements.js` + `FundingRequirements.css`

**Behaviour:** Standalone (no header/footer). Heavy state; localStorage not used by default in the code read — confirm if a save key is used.

**Layout & sections:**

1. **Hero** (`.funding-hero`)
   - funding-hero-bg; MantisIcon; h1 "Funding Requirements"; subtitle; hero-actions (e.g. Save, Export, Reset if present).

2. **Executive summary / totals**
   - Valuations and growth for: Y-QA, Quantum Bridge, Qyvella Robotics, Y-Accounting (50%). Display of totals / run rate.

3. **Per-project expense tables**
   - Projects: yqa, quantum, robotics, accounting. Each has expenses (categories: Personnel, Infrastructure, Hardware, Other; robotics has extra categories like Hardware Costs, Unit Cost, Facilities, Manufacturing Prep). Items: name, monthly amount, description. State: `data.yqa`, `data.quantum`, etc. with `expenses` and `milestones`.

4. **Operating expenses**
   - `data.operating.expenses` (Office, Corporate/Admin, Founder/Key Personnel, Equipment, Buffer).

5. **Growth % inputs**
   - Per-project growth; used for calculations.

6. **Share purchase section**
   - Equity calculations (valuation × equity %).

7. **Milestones & deliverables**
   - Per project: milestone name, target date, funding unlocked.

8. **Notes**
   - Free-text notes area.

**UI patterns:** Tables with editable inputs; buttons for Save/Export/Reset; possibly export as JSON. Funding page uses same theme variables; hero matches pitch deck style.

---

### 4.6 Company Structure (`/structure/7x3k9`, `m4p2n`, `q8f5t`)

**File:** `CompanyStructure.js` + `CompanyStructure.css`

**Props:** `structureId` — one of '7x3k9', 'm4p2n', 'q8f5t'. Each ID has **separate** localStorage: `yellowMantis_companyStructure_${structureId}`.

**Layout & sections:**

1. **Hero** (`.structure-hero`)
   - structure-hero-bg; MantisIcon; h1 "Company Structure"; subtitle; hero-actions (Add Company, Save, Export, Reset, etc.); saved notification.

2. **Legend** (`.structure-legend`)
   - Type labels and colours: Holding, Subsidiary, Associate, Joint Venture, Trust, External.

3. **Canvas** (`.structure-canvas-wrapper`)
   - Canvas ref for drawing. **Nodes:** companies (id, name, type, shareholding, shareholders, x, y, color). **Edges:** connections (from, to, percent, label). Drag nodes; click to select; "Connect" mode to draw connections; click connection to set shareholding %. Types and colors: holding (yellow), subsidiary (blue), associate (purple), joint (green), trust (red), external (grey).

4. **Add company modal**
   - newCompanyName, newCompanyType, newCompanyShareholding; addCompany().

5. **Node detail / edit**
   - When a company is selected: edit name, type, shareholding; add/remove shareholders (name, percent); delete company.

6. **Connection edit**
   - editingConnection state; set connection percent; delete connection.

7. **Notes** (bottom)
   - Textarea for notes; saved with structure.

**Data:** companies array (with shareholders sub-array); connections array; notes. Save/load from localStorage; export as JSON.

**CSS:** Canvas area; node styles; connection lines; modals; legend; responsive layout for controls.

---

### 4.7 Organogram (`/organogram/yellow-mantis`)

**File:** `Organogram.js` + `Organogram.css`

**Layout & sections:**

1. **Hero** (`.organogram-hero`)
   - organogram-hero-bg; MantisIcon; h1 "Yellow Mantis Holdings"; subtitle.

2. **Organogram container** (`.organogram-container`)
   - **Top level:** Yellow Mantis (holding) — single card in `.org-level-top`.
   - **Subsidiaries:** `.org-level-subsidiaries` — grid of 5 company cards: Y-QA, Rigelaz Holdings, Qyvella, QProteus, Boaz Holdings. Each card: icon, name, shortDesc, color bar; click to select.

3. **Detail panel** (when `selectedCompany` set)
   - Summary, shareholding, capabilities, tech, status, valuation (where applicable). Data is hardcoded in `companies` object (yellowmantis, yqa, rigelaz, qyvella, qproteus, boaz).

**Patterns:** `.org-node` cards; `.org-level` flex/grid; detail panel with lists and metadata. No localStorage; static data.

---

### 4.8 Due Diligence Summary (`/due-diligence`)

**File:** `DueDiligenceSummary.js` + `DueDiligence.css`

**Layout & sections:**

1. **Hero** (`.dd-summary-hero`)
   - Badge; MantisIcon; h1 "Due Diligence"; tagline; subtitle; total valuation display.

2. **Venture cards** (grid)
   - 5 ventures: Y-QA, QProteus, Qyvella, Boaz, Rigelaz. Each: icon, name, shortDesc, valuation, valuationNote, status, keyMetrics, competitiveAdvantage, link to detail page. Click opens modal or navigates to `/due-diligence/yqa` etc.

3. **Total valuation**
   - Sum of Y-QA + QProteus + Qyvella + Boaz (R22M + R18M + mid range + mid range).

4. **Links**
   - Each venture links to DueDiligenceYQA, DueDiligenceQProteus, DueDiligenceQyvella, DueDiligenceBoaz, DueDiligenceRigelaz.

**Venture data:** id, name, type (flagship/operational/rnd/joint), shortDesc, valuation, status, color, icon, keyMetrics, competitiveAdvantage, link.

---

### 4.9 Due Diligence detail pages

**Files:** `DueDiligenceYQA.js`, `DueDiligenceQProteus.js`, `DueDiligenceQyvella.js`, `DueDiligenceBoaz.js`, `DueDiligenceRigelaz.js`; all use `DueDiligence.css`.

**Shared structure:**

1. **Hero** (`.dd-hero`)
   - Venture-specific accent; icon; h1 (venture name); tagline; valuation box (`.dd-hero-valuation`).

2. **Sections** (venture-specific)
   - Multiple content blocks: overview, technology, traction, financials, risks, competitive advantage, etc. Uses shared DD classes: `.dd-section`, `.dd-card`, `.dd-metric`, lists, tables.

3. **Back / nav**
   - Link back to `/due-diligence` or to summary.

**Design:** Uses `--dd-accent` and shared DD hero/section/card styles from `DueDiligence.css`; venture-specific colours and content.

---

## 5. File inventory

### 5.1 Source files

| Path | Purpose |
|------|--------|
| `src/index.js` | Entry; Router; global + themes CSS |
| `src/App.js` | Routes; Header/Footer conditional; STRUCTURE_IDS |
| `src/components/Header.js` | Nav; logo; CTA |
| `src/components/Header.css` | Header layout; scrolled state; responsive |
| `src/components/Footer.js` | Brand; nav links; badges; copyright |
| `src/components/Footer.css` | Footer layout |
| `src/components/MantisIcon.js` | Logo img |
| `src/components/ThemeSwitcher.js` | Theme selector (not mounted in App) |
| `src/styles/global.css` | Variables; reset; buttons; cards; sections; scrollbar |
| `src/styles/themes.css` | data-theme overrides; ThemeSwitcher UI |
| `src/pages/IntroductionLetter.js` | Intro page |
| `src/pages/IntroductionLetter.css` | Intro layout |
| `src/pages/PitchDeck.js` | Pitch deck |
| `src/pages/PitchDeck.css` | Pitch layout |
| `src/pages/FullFeatures.js` | Tabbed features |
| `src/pages/FullFeatures.css` | Features layout |
| `src/pages/QuantumForInvestors.js` | Quantum guide |
| `src/pages/QuantumForInvestors.css` | Quantum guide layout |
| `src/pages/FundingRequirements.js` | Funding tool |
| `src/pages/FundingRequirements.css` | Funding layout |
| `src/pages/CompanyStructure.js` | Interactive structure (3 IDs) |
| `src/pages/CompanyStructure.css` | Structure canvas + UI |
| `src/pages/Organogram.js` | Static organogram |
| `src/pages/Organogram.css` | Organogram layout |
| `src/pages/DueDiligenceSummary.js` | DD hub |
| `src/pages/DueDiligenceYQA.js` | Y-QA DD |
| `src/pages/DueDiligenceQProteus.js` | QProteus DD |
| `src/pages/DueDiligenceQyvella.js` | Qyvella DD |
| `src/pages/DueDiligenceBoaz.js` | Boaz DD |
| `src/pages/DueDiligenceRigelaz.js` | Rigelaz DD |
| `src/pages/DueDiligence.css` | Shared DD styles |

### 5.2 Public / build

- `public/index.html` — root div, meta, title.
- `public/favicon.ico`
- `public/mantis-logo-transparent.png` — used by MantisIcon.
- `server.js` — Express server (e.g. Heroku); serves `dist` and SPA fallback.
- `webpack.config.js` — build config for React app.

---

## 6. Content to remove or refocus for “dev only”

When cleaning up Yellow Mantis for **dev ventures and abilities only** (no collective/holding):

- **Introduction Letter:** Remove or rewrite "Our Ventures" that name other group companies (e.g. Faces Group / Rigelaz); keep only dev ventures (e.g. Quantum Bridge, Qyvella, Y-QA, Y-Accounting as dev products). Remove "The Challenges We Solve" row that names Rigelaz. Adjust "Proven Results" so metrics are dev-capability only (no client-specific numbers if you want to avoid naming clients). Leadership/CTA can stay or move to Sarfat.
- **Pitch Deck:** Remove or reframe Faces Group as “client work / capability proof” without naming; keep Quantum, Qyvella, Y-Accounting, Y-QA as dev ventures. Financials/valuation can stay for dev IP only.
- **Full Features:** Remove or repurpose "Faces Group" tab; keep Quantum, Robotics, Y-Accounting, Y-QA as dev product features.
- **Funding Requirements:** Keep as dev-venture funding (Y-QA, Quantum, Qyvella, Y-Accounting); remove or rename any “operating” that implies holding-level only.
- **Company Structure:** Either remove or repurpose for “Yellow Mantis (dev house) only” structure — no holding/subsidiary tree of unrelated companies.
- **Organogram:** Currently “Yellow Mantis Holdings” with subsidiaries (Y-QA, Rigelaz, Qyvella, QProteus, Boaz). For dev-only: replace with Yellow Mantis as dev house and only dev ventures/teams; remove Rigelaz/Boaz if they are non-dev or holding.
- **Due Diligence:** Summary and detail pages reference Y-QA, QProteus, Qyvella, Boaz, Rigelaz. For dev-only: keep tech/IP ventures (Y-QA, QProteus, Qyvella, Y-Accounting/Boaz as product); Rigelaz page either remove or reframe as “consulting/capability” without naming clients. Adjust valuations to dev IP only.
- **Quantum for Investors:** Content is educational and bridge-focused; can stay as-is for dev narrative.
- **Header/Footer:** Update nav links if you remove or rename pages; change "Yellow Mantis" to dev positioning if desired.

---

## 7. Summary table

| Page | Route(s) | Standalone | Key behaviour / content |
|------|----------|------------|--------------------------|
| Introduction Letter | `/introduction-letter` | No | Hero, Vision, Challenges, Metrics, Ventures, Why Now, Founder, CTA |
| Pitch Deck | `/pitch-deck` | No | Hero, Portfolio cards, 5 venture deep dives, Tech, Competitive, Case study, Financials, CTA |
| Full Features | `/full-features` | No | Hero, Sticky tabs (5 ventures), Tab content with feature categories and code examples |
| Quantum Guide | `/quantum-guide` | No | Hero, Educational sections (quantum explained for investors) |
| Funding Requirements | `/funding` | Yes | Hero, Per-project expenses, Operating, Growth %, Share purchase, Milestones, Notes |
| Company Structure | `/structure/7x3k9`, `m4p2n`, `q8f5t` | Yes | Hero, Canvas (nodes + connections), Add/edit companies, Shareholders, Notes, localStorage per ID |
| Organogram | `/organogram/yellow-mantis` | Yes | Hero, Yellow Mantis + 5 subsidiaries grid, Detail panel (static data) |
| Due Diligence Summary | `/due-diligence` | Yes | Hero, 5 venture cards with links, Total valuation |
| Due Diligence Y-QA | `/due-diligence/yqa` | Yes | Hero, Sections (venture-specific) |
| Due Diligence QProteus | `/due-diligence/qproteus` | Yes | Hero, Sections |
| Due Diligence Qyvella | `/due-diligence/qyvella` | Yes | Hero, Sections |
| Due Diligence Boaz | `/due-diligence/boaz` | Yes | Hero, Sections |
| Due Diligence Rigelaz | `/due-diligence/rigelaz` | Yes | Hero, Sections |

---

*End of implementation and design reference. Use this document when moving or refactoring Yellow Mantis pages into the Sarfat workspace and when stripping collective/holding content to leave dev-only ventures and capabilities.*
