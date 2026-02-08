# Yellow Mantis — Development Capability & Company Profile

**Full tech stack analysis · Portfolio valuation · Economics · Potential**

*No client, product, or third-party names; capability and IP only.*

---

## 1. Executive Summary

Yellow Mantis is a technology development company that designs, builds, and operates full-stack software across web, mobile, cloud, and frontier R&D. This document is a **full tech stack analysis** of all projects in the workspace, a **comprehensive company profile** showcasing development capability, a **conservative valuation** of owned IP, and an **economics factor** explaining how the valuation is derived. It also outlines the **potential** of the development company given what has already been achieved.

### Key metrics (owned IP only)

*All monetary figures in this document are in **South African Rand (ZAR)**. This is an internal capability-based estimate, not a formal or independent valuation.*

| Metric | Value |
|--------|--------|
| **Distinct technology projects** | 10 (9 owned IP; 1 capability reference) |
| **Estimated total lines of code (portfolio)** | ~354,000+ (owned ~94,000+; capability reference ~260,000) |
| **Production systems delivered** | Multiple (incl. very high participant volume) |
| **Conservative IP valuation range (ZAR)** | **R19,000,000 – R28,700,000** |
| **Midpoint valuation (ZAR)** | **~R23,850,000** |

---

## 2. Full Tech Stack Analysis by Project

Each project below is described by **capability and tech only**—no company names or domain-specific branding. Stacks are derived from workspace codebases (Gemfile, package.json, requirements.txt, and project structure).

---

### Project A — AI-powered quality assurance platform

**Role:** Commercial-grade QA with AI-driven test generation, application digital twin, and quantum-inspired optimization.

**Tech stack:**

| Layer | Technologies |
|-------|----------------|
| Backend | Ruby on Rails 7.1, PostgreSQL, Redis, Sidekiq |
| AI/LLM | Anthropic Claude (Sonnet 4, Opus 4), OpenAI GPT-4, ruby-openai, tiktoken_ruby |
| Quantum | REST integration to D-Wave, IBM Quantum, AWS Braket |
| Storage | AWS S3 (R2-compatible), CloudFlare R2 |
| Auth & API | Devise, Pundit, JWT, platform-api (Heroku) |
| Frontend | Import maps, Turbo, Stimulus, Jbuilder |
| Testing | RSpec, Capybara, Selenium |

**Advanced features:**

- **Dual-model AI pipeline** — One model for analysis, another for validation (industry-first in QA).
- **Application digital twin** — Component mapping and risk scoring to drive test prioritization and coverage.
- **Quantum-inspired test optimization** — Test suite selection as optimization (e.g. QUBO) on quantum or classical back ends; demonstrated order-of-magnitude speedup in real runs.
- **Codebase-aware test generation** — Integration with CI/CD and predictive defect analysis.
- **40+ database tables, 33+ models, 17+ Sidekiq jobs** — Full application lifecycle and background processing.

**Scale:** ~15,000–20,000+ LOC (backend); pre-production, feature-complete.

---

### Project B — Classical-to-quantum computing bridge

**Role:** Framework that connects classical software to real quantum hardware with automatic problem classification, encoding, and fallback.

**Tech stack:**

| Layer | Technologies |
|-------|----------------|
| Core | Python 3.10+, FastAPI, Uvicorn, Pydantic |
| Quantum cloud | Amazon Braket SDK, Braket default simulator |
| Quantum libs | Qiskit, Qiskit-Aer, PennyLane, PennyLane-Qiskit, PennyLane-Lightning |
| D-Wave | dwave-ocean-sdk, dwave-system, dimod, minorminer |
| Optimization | NumPy, SciPy, NetworkX, CVXPy |
| ML | scikit-learn, PyTorch |
| API/Async | httpx, websockets, gRPC, GraphQL-core, aiohttp, Celery, Redis |
| Observability | Prometheus, structlog, OpenTelemetry |
| Dev/Test | pytest, pytest-asyncio, hypothesis, black, ruff, mypy |

**Advanced features:**

- **Multi-provider abstraction** — AWS Braket, D-Wave, IBM Quantum, IonQ, Rigetti; local simulators.
- **Automatic problem classification** — Detects quantum-suitable problems (e.g. QUBO, Ising).
- **QUBO encoding** — MaxCut, TSP, scheduling, portfolio-style optimization.
- **Production fallback** — Graceful degradation to classical solvers when quantum is unsuitable or unavailable.
- **Budget-aware execution** — Cost tracking and limits.
- **Live demos on real hardware** — Proven speedup (e.g. 90x in test optimization) on AWS Braket.

**Scale:** ~5,000–10,000 LOC; operational alpha with working demos.

---

### Project C — AI robotics command platform

**Role:** Affordable robotics stack with persistent AI personality, natural-language and voice control, and hardware abstraction for simulation and real devices.

**Tech stack:**

| Layer | Technologies |
|-------|----------------|
| Backend | Django 5.x, Django REST Framework, django-environ, django-extensions, Whitenoise |
| Real-time | Django Channels, channels-redis, Daphne |
| AI | Anthropic, OpenAI, tiktoken |
| Voice | SpeechRecognition, gTTS, pyttsx3, PyAudio, pydub |
| Vision | OpenCV, Pillow, NumPy |
| Hardware (designed) | Raspberry Pi, PCA9685 servo drivers, GPIO (optional) |
| Data | Redis, django-redis |
| Async | Celery, django-celery-beat |
| API | django-cors-headers, websockets |

**Advanced features:**

- **Persistent AI personality** — Memory, self-reflection, emotional state (industry-first in this stack).
- **Natural-language and voice control** — Robot actions via LLM tool calling; multiple personality modes (e.g. mentor, companion, rubber-duck).
- **Hardware abstraction** — Same stack runs in simulation or on real hardware (Raspberry Pi, servos, sensors).
- **Sub-$500 unit cost design** — BOMs, 3D-printable parts, assembly docs; low unit cost vs typical industrial robotics.
- **AWS-ready** — Terraform, Docker, ECS Fargate, IoT Core documented.

**Scale:** ~8,600+ LOC (Python); software complete, hardware build pending.

---

### Project D — Multi-agent autonomous accounting platform

**Role:** AI-powered accounting with document intelligence, cash-flow optimization, and CFO-level strategic recommendations.

**Tech stack:**

| Layer | Technologies |
|-------|----------------|
| Backend | FastAPI 0.104+, Python 3.11+, Uvicorn, Pydantic, asyncpg |
| Database | PostgreSQL (async), SQLAlchemy 2.0+, Alembic |
| Auth | python-jose, passlib/bcrypt, cryptography |
| AI | OpenAI, LangChain, LangChain-OpenAI |
| Documents | PyMuPDF, pytesseract, Pillow, python-docx, openpyxl |
| Data | pandas, numpy, scipy, yfinance |
| Tasks | Celery, Redis |
| HTTP | httpx, requests, aiohttp |
| Logging | loguru |
| Frontend | React 18, TypeScript 5+, Material-UI (from workspace structure) |

**Advanced features:**

- **Multi-agent system** — Document intelligence, cash-flow optimizer, strategic advisor with clear roles.
- **Document intelligence** — Multi-modal ingestion (PDF, images, OCR) and structured extraction.
- **High-accuracy cash-flow forecasting** — 95%+ targets; CFO-level recommendations.
- **Multi-provider LLM** — Audit-friendly, async design.
- **50% ownership** in joint venture structure.

**Scale:** ~8,500–9,500 LOC (backend + frontend); beta-ready.

---

### Project E — Enterprise participant and registration platform (capability reference)

**Role:** Large-scale participant lifecycle: registration, results, live tracking, participant-facing web and mobile, and deep third-party integrations. Included only to demonstrate **development capability at scale**; IP is not owned by Yellow Mantis.

**Tech stack (representative):**

| Layer | Technologies |
|-------|----------------|
| Backend | Ruby on Rails 7.1, PostgreSQL, Redis, Sidekiq |
| Integrations | OAuth 2.0, REST APIs, webhooks (CRM, timing, media) |
| Storage | AWS S3, image_processing |
| Auth | Devise, JWT |
| Admin | ActiveAdmin, SASS |
| Frontend | Multiple standalone React apps (pre-built), Import maps, Turbo, Stimulus |
| Mobile | React Native, TypeScript (from workspace) |

**Demonstrated capability (no names):**

- Very high participant volumes annually; 99.9%+ uptime; sub-second webhook processing.
- 413,000+ historic records; large-scale migration and legacy data.
- Deep integrations: CRM (OAuth, sync), timing providers, media storage; architecture and integration code owned end-to-end.
- Multiple web front ends and production mobile app (GPS, offline, device APIs).

**Scale:** ~260,000+ LOC across backend, frontends, and mobile. **Valuation: R0 (client IP).**

---

### Project F — CRM/ERP for equipment, inventory, and field operations

**Role:** Full lead-to-customer lifecycle, product catalog, multi-location inventory, orders, invoicing, procurement, service tickets, and route optimization.

**Tech stack:**

| Layer | Technologies |
|-------|----------------|
| Backend | Ruby on Rails 7.1.5 (API), PostgreSQL 16, PostGIS, Redis, Puma |
| Auth | Devise, devise-jwt, Pundit, bcrypt |
| API | rack-cors, jsonapi-serializer, pagy, oj |
| Jobs | Sidekiq 7.x |
| Storage | aws-sdk-s3, image_processing |
| PDF | Prawn, prawn-table |
| Frontend | React 19, TypeScript, Vite, Tailwind CSS |
| State | Zustand, TanStack React Query |

**Advanced features:**

- **100+ RESTful API endpoints** — Production-deployed (e.g. Heroku).
- **Spatial** — PostGIS for location and route optimization (e.g. Google Maps integration).
- **STI product model** — Machine, Part, Consumable, Service in single hierarchy.
- **Order workflow** — Approval thresholds, invoicing with PDF generation, procurement, SLA-backed service tickets.

**Scale:** ~18,000+ LOC; production on Heroku.

---

### Project G — Biometric attendance and verification system

**Role:** Face-based verification, location (geofence) verification, self check-in, kiosk and mobile flows, offline support with sync.

**Tech stack:**

| Layer | Technologies |
|-------|----------------|
| Backend | AdonisJS v6 (Node.js), TypeScript, Lucid ORM, PostgreSQL |
| Auth | @adonisjs/auth |
| Cloud | @aws-sdk/client-rekognition, @aws-sdk/client-s3, S3 presigner |
| Validation | Vine.js |
| Mobile | React Native, Expo (from workspace) |
| Web admin | React, Vite, Tailwind (from workspace) |

**Advanced features:**

- **Facial recognition** — AWS Rekognition; local/simulation path for development.
- **GPS geofencing** — Circle and polygon verification for check-in.
- **Self check-in** — QR + face + location verification.
- **Kiosk mode** — Full-screen camera interface.
- **Offline support** — On-device face matching with auto-sync.
- **Liveness / anti-spoofing** — Considered in API design.
- **Migrations** — Organizations, events, attendees, face enrollments/verifications, geofences, location logs, report exports, scheduled reports.

**Scale:** ~20,000+ LOC (backend, mobile, web admin); alpha, 85–90% complete.

---

### Project H — Interactive venue and layout design tool

**Role:** Designer-oriented canvas for seats, rows, sections, stages, aisles, labels; templates; selector-style flow for choice and pricing; export/import.

**Tech stack:**

| Layer | Technologies |
|-------|----------------|
| Frontend | React 18.3, TypeScript 5.6, Vite 6, Zustand 5, Tailwind 3.4 |
| Build | @vitejs/plugin-react, PostCSS, Autoprefixer |
| State | UUID for entities |

**Advanced features:**

- **Canvas** — Zoom, pan, grid snapping, multi-select; SVG-based.
- **Element types** — Seats, rows, sections, stages, tables, aisles, labels.
- **Templates** — e.g. large venue (800+ seats), stadium, smaller layouts.
- **Selector flow** — Choosing and pricing; production-ready foundation.
- **Export/import** — JSON, SVG, CSV.
- **Performance** — LOD, viewport culling, spatial indexing considered.

**Scale:** ~5,800 LOC; MVP complete.

---

### Project I — NCA-compliant microlending platform

**Role:** Full-stack microlending with National Credit Act–aligned interest caps, initiation fees, affordability assessment, reckless-lending prevention, and PASA-style mandate design.

**Tech stack:**

| Layer | Technologies |
|-------|----------------|
| Backend | Ruby on Rails 7.1.6 (API), SQLite/PostgreSQL, Puma, bcrypt, JWT, rack-cors |
| Frontend | React 19, React Router 7, Vite 7 |

**Advanced features:**

- **NCA interest cap** — 5% per month; initiation fee formula (R165 + 10% over R1,000, cap R1,050).
- **Affordability service** — DTI (40% max), net income, existing commitments; reckless-lending prevention; full affordability snapshot per loan.
- **Loan lifecycle** — Draft → Pending Approval → Approved → Active → Repaying → Settled; automatic installments; re-apply only after full settlement.
- **DebiCheck-ready** — Mandate model and PASA-style workflow placeholder.
- **Experian placeholder** — Credit scoring interface ready for production integration.
- **Dual UI** — Customer application (landing, registration, affordability calculator, application, dashboard) and back-office admin (KPIs, user/loan management, past-due tracking).

**Scale:** ~4,000–5,000 LOC; alpha, core compliance implemented.

---

### Project J — Corporate and capability website

**Role:** Single-page landing site for technology capability, contact, and positioning.

**Tech stack:**

| Layer | Technologies |
|-------|----------------|
| Frontend | React 18, Webpack 5, CSS variables (Outfit typography) |
| Server | Express.js (static + SPA fallback) |

**Scale:** ~5,000 LOC; production.

---

## 3. Aggregated Tech Stack (Portfolio-Wide)

| Domain | Technologies demonstrated |
|--------|----------------------------|
| **Backend** | Ruby on Rails 7.x, Django 5.x, FastAPI, AdonisJS v6, Express.js |
| **Databases** | PostgreSQL (incl. PostGIS), SQLite, Redis |
| **Frontend** | React 18/19, TypeScript, Vite, Webpack, Tailwind CSS, Zustand, TanStack Query |
| **Mobile** | React Native, Expo |
| **AI/LLM** | Anthropic Claude (Sonnet 4, Opus 4), OpenAI GPT-4, LangChain, multi-provider abstraction |
| **Quantum** | AWS Braket, Qiskit, PennyLane, D-Wave Ocean, dimod |
| **Biometrics** | AWS Rekognition, local/simulated paths |
| **Cloud** | AWS (S3, Rekognition, Braket, ECS, IoT), Heroku, Docker, Terraform |
| **Integrations** | OAuth 2.0, webhooks, REST APIs, CRM, timing, maps, storage |
| **Compliance** | NCA-style lending logic, affordability, DebiCheck-ready design |

---

## 4. Distinctive IP and Why It Is Industry-Leading

The following are **distinctive IP elements** where Yellow Mantis has built capabilities that are **rare or industry-leading** in combination. Claims are grounded in delivered systems and working demos, not marketing.

| Distinctive IP | Why it is industry-leading or rare |
|----------------|------------------------------------|
| **Dual-model AI QA pipeline** | Commercial QA platforms typically use a single model for generation or analysis. Using one model for analysis and a second (e.g. higher-tier) for validation, with codebase-aware test generation and CI/CD integration, is **rare in commercial QA** and reduces hallucination and drift. |
| **Application digital twin for QA** | Component mapping with risk scoring to drive test prioritization and coverage is **uncommon in commercial test tooling**; combined with the dual-model pipeline it supports explainable, risk-aware QA. |
| **Quantum-inspired test optimization** | Formulating test suite selection as a QUBO-style optimization and running it on quantum or classical back ends, with **demonstrated order-of-magnitude speedup** in real runs, is **not standard** in the QA industry and shows quantum–classical hybrid value. |
| **Classical-to-quantum bridge** | A **working** framework with multi-provider abstraction (AWS Braket, D-Wave, IBM, etc.), automatic problem classification, QUBO encoding, and graceful fallback to classical solvers, with **live demos on real quantum hardware**, is scarce; most “quantum” offerings are research or slideware. |
| **Persistent AI personality for robotics** | Combining **memory, self-reflection, and emotional state** in one robotics stack, with natural-language and voice control via LLM tool calling, is **industry-first in this stack**; hardware abstraction (simulation + real) and sub-$500 unit-cost design differentiate from typical industrial robotics. |
| **NCA-compliant lending in core logic** | Implementing interest caps, initiation fee formula, affordability (DTI, net income, commitments), and reckless-lending prevention **in the core engine** with full audit trail and re-apply rules, plus DebiCheck-ready mandate design, is **regulatory-first** rather than compliance bolted on—rare in early-stage lending platforms. |
| **Multi-agent autonomous accounting** | Multiple specialized AI agents (document intelligence, cash-flow optimizer, strategist) with clear roles, multi-provider LLM, and audit-friendly design is **architecturally distinctive** vs single-model accounting tools. |

These elements support a **capability premium** in the valuation; they are not generic “AI” or “quantum” claims but specific, delivered combinations.

---

## 5. Advanced Features Showcase (Capability Only)

- **Dual-model AI QA** — Separate analysis and validation models; application digital twin; quantum-inspired test optimization; codebase-aware test generation.
- **Classical–quantum bridge** — Multi-provider quantum and classical fallback; automatic problem classification; QUBO encoding; live demos on real hardware; proven speedup in real use cases.
- **AI consciousness and robotics** — Persistent personality (memory, self-reflection, emotional state); natural-language and voice control; hardware abstraction (simulation + real); low unit-cost design.
- **Multi-agent financial system** — Document intelligence, cash-flow optimizer, strategist; multi-provider LLM; audit-friendly design.
- **NCA-compliant lending engine** — Interest caps, initiation fees, affordability (DTI, net income, commitments), reckless-lending prevention; full lifecycle; DebiCheck-ready mandate architecture.
- **Biometric attendance** — Face verification (cloud + local), geofencing, kiosk and mobile, offline sync.
- **Enterprise participant platforms** — Very high volume; 99.9%+ uptime; sub-second webhooks; deep CRM, timing, and media integrations.
- **Venue layout tooling** — Canvas-based design, templates, selector/pricing flow, export/import, performance optimizations.
- **CRM/ERP** — Full lifecycle, PostGIS, route optimization, 100+ API endpoints, production deployment.

---

## 6. Conservative Valuation of Owned IP (ZAR)

Valuation applies only to **owned** IP (excluding the large participant platform, which is client-owned). **All figures are in ZAR.** Ranges are conservative and already reflect risk discounts (pre-revenue, alpha/beta status, single-team). This is an **internal capability-based estimate**, not a formal or independent valuation.

| Project (generic) | Status | LOC (est.) | Valuation range (ZAR) |
|-------------------|--------|------------|------------------------|
| AI QA platform | Pre-production | 15k–20k | R3,500,000 – R5,000,000 |
| Quantum bridge | Alpha / POC | 5k–10k | R2,500,000 – R4,000,000 |
| AI robotics platform | Pre-production | 8.6k | R1,500,000 – R2,500,000 |
| Multi-agent accounting (50%) | Beta | 8.5k | R750,000 – R1,250,000 |
| CRM/ERP (equipment/field) | Production | 18k | R1,500,000 – R2,000,000 |
| Biometric attendance | Alpha | 20k | R1,200,000 – R1,800,000 |
| NCA-compliant lending | Alpha | ~4.5k | R1,200,000 – R1,800,000 |
| Venue layout builder | MVP | 5.8k | R800,000 – R1,200,000 |
| Corporate website | Production | ~5k | R150,000 – R250,000 |
| **Owned subtotal (base)** | | **~94k+** | **R13,100,000 – R19,800,000** |

**Premium calculation (additive, applied to base range):**

| Component | Low (ZAR) | High (ZAR) |
|-----------|-----------|------------|
| Owned IP base (above) | R13,100,000 | R19,800,000 |
| + Development capability premium (25% of base) | R3,275,000 | R4,950,000 |
| + Research & innovation premium (20% of base) | R2,620,000 | R3,960,000 |
| **Total conservative valuation (ZAR)** | **R18,995,000** | **R28,710,000** |

**Stated range (rounded):** **R19,000,000 – R28,700,000 (ZAR)**  
**Midpoint:** **~R23,850,000 (ZAR)**

*Premiums reflect full-stack ownership, breadth of domains, production track record, and distinctive IP (quantum, AI consciousness, dual-model QA, multi-agent systems). Lower base figures already reflect risk discounts; no revenue multiples or external comparables are used.*

---

## 7. Economics Factor — Why the Valuation Is Estimated as It Is (ZAR)

The range is derived from **replacement cost**, **IP novelty**, **risk discounts**, and **additive capability premiums**. **All amounts are in ZAR.** No revenue multiples or public comparables are used; the result is intentionally conservative to avoid over-valuation.

### 7.1 Base: development cost replacement

- **Labour** — Equivalent cost to rebuild the same systems with senior full-stack and specialist (AI/quantum) developers at South African / offshore blended rates.
- **Scope** — ~354,000+ LOC total portfolio (owned ~94,000+); multiple stacks (Rails, Django, FastAPI, AdonisJS, React, React Native, quantum SDKs).
- **Outcome** — Base value is “cost to replicate” for **owned** IP only (R13.1M–R19.8M ZAR), not “market price.” Project-level ranges already embed risk (pre-revenue, alpha/beta).

### 7.2 Upward: IP novelty and capability (premiums)

- **Distinctive IP** (see Section 4) — Quantum–classical bridge with live demos; AI consciousness/robotics; dual-model QA + digital twin; NCA in core logic; multi-agent accounting. These support **additive** premiums (25% + 20% of base) rather than revenue-based multiples.
- **Arithmetic** — 25% of base (capability) + 20% of base (R&I) applied to low and high base: e.g. R13.1M + 3.275M + 2.62M = R18.995M; R19.8M + 4.95M + 3.96M = R28.71M. Rounded to R19M–R28.7M ZAR.

### 7.3 Downward: risk discounts (already in project ranges)

- **Pre-production** — Most projects alpha/beta; no systematic revenue from owned IP. Project valuations are already set at the **low end** of plausible replacement cost.
- **Single-team concentration** — Reflected in conservative base; no extra premium for “team” beyond capability.
- **Quantum market maturity** — Quantum bridge valued as alpha/POC; fallback and demos limit downside.
- **Hardware not built (robotics)** — Valuation is for software + design only; no hardware inventory.

**Formula:** **Base (owned IP, risk-discounted) + 25% capability + 20% R&I = R19M–R28.7M ZAR.**

### 7.4 Why not higher (no over-valuation)

- No revenue or profit from owned IP; no DCF or revenue multiples.
- No independent or third-party valuation.
- Premiums are additive (45% total), not compound; no “blue sky” multiple.
- Estimate is for **capability and IP profile** only, not realised market value.

### 7.5 Why the range is credible (not under-stated)

- Multiple production or near-production systems; demonstrated scale (e.g. very high participant volume, 99.9%+ uptime).
- Working quantum demos and NCA compliance in code; distinctive IP is delivered, not claimed.
- Replacement would require rare combination of full-stack, quantum, AI, and compliance depth.

**Summary:** The valuation is an **internal estimate in ZAR**, anchored in **replacement cost** for owned IP, with **additive** premiums for capability and R&I, and risk already baked into project-level ranges. It is not a formal valuation and can be stress-tested (e.g. lower premiums or higher discounts) if required.

---

## 8. Potential of the Development Company

Given what has already been achieved, the **potential** of the development company can be framed along four axes.

### 8.1 Productisation and commercialisation

- **AI QA platform** — Ready for rollout; dual-model + digital twin + quantum optimization is sellable to enterprises and DevOps teams.
- **Quantum bridge** — Usable as API or framework for optimization-heavy verticals (logistics, finance, research).
- **NCA-compliant lending** — Core engine and mandate design are licensable or white-label ready for regulated lenders.
- **Multi-agent accounting** — Document intelligence and cash-flow modules are productisable for SMB/accounting tools.
- **Biometric attendance** — Near-complete stack for sites and events; kiosk + mobile + offline is a clear use case.
- **Venue layout tool** — Strong base for a SaaS in venue design and selector/pricing flows.

**Potential:** Multiple products can be taken to market or licensed with limited additional build.

### 7.2 Repeatability of “impossible” R&D

- The same team has delivered both **frontier** (quantum, AI consciousness, dual-model QA) and **production** (high-volume participant platform, CRM, fintech).
- That suggests **repeatability** for new “impossible” briefs: quantum, AI-native products, regulated fintech, and enterprise integrations.
- **Potential:** The company can pitch and deliver R&D that most dev shops cannot, then operate the resulting systems.

### 8.3 Compliance and regulated verticals

- NCA-style lending and DebiCheck-ready design show that **compliance is architecture**, not an add-on.
- **Potential:** Extension into other regulated domains (e.g. health, insurance, payments) with the same approach: rules in core logic, audit trails, clear integration points.

### 8.4 Scale and integration depth

- One platform has already demonstrated very high participant volume, 99.9%+ uptime, and deep CRM/timing/media integrations.
- **Potential:** Same capability can be applied to new large-scale participant or operational platforms; the “integration and scale” playbook exists.

---

## 9. Conclusion

- **Tech stack:** Full analysis across 10 projects (9 owned, 1 capability reference) shows breadth (Rails, Django, FastAPI, AdonisJS, React, React Native, quantum, biometrics) and depth (production systems, AI, compliance, quantum).
- **Distinctive IP:** Section 4 sets out why dual-model QA, quantum bridge, AI consciousness/robotics, NCA in core logic, and multi-agent accounting are industry-leading or rare—grounded in delivered systems.
- **Valuation (ZAR):** Conservative range **R19,000,000 – R28,700,000** for owned IP only; midpoint ~R23,850,000. All figures in South African Rand. Explicit arithmetic: base R13.1M–R19.8M + 25% capability + 20% R&I = R19M–R28.7M.
- **Economics:** Estimate is **internal and capability-based**; replacement cost plus additive premiums; risk already in project ranges. No over-valuation (no revenue multiples, no compound premiums). Stress-testable.
- **Potential:** Productisation, repeatability of frontier R&D, compliance-first builds, and scale/integration depth support a view of the company as a high-capability development and IP asset.

---

*Document purpose: capability and IP profile for Yellow Mantis. All monetary figures in ZAR. No client, product, or event names. This is not a formal or independent valuation. For contact: yellow-mantis.com.*

*Last updated: February 2026. Reflects workspace projects and conservative valuation methodology.*
