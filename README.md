# AfriCrop AI 🌍🌱

**Decentralized AI Agent for African Subsistence Farmers**

A capstone project applying software engineering, AI, and Web3 to deliver real impact for smallholder farmers across Africa disease detection in local languages, yield forecasting, and peer-to-peer crop bartering on Solana.

> **Live Demo:** [Coming Sprint 1 End — May 12, 2026]
> **Status:** 🚧 Sprint 1 in progress

---

## 🎯 Problem Statement

Over 33 million smallholder farms across Sub-Saharan Africa lose 20–40% of yield annually to crop disease, weather shocks, and broken supply chains. Existing AgriTech ignores them: no Swahili/Yoruba support, requires constant internet, demands bank accounts. AfriCrop AI flips the model — phone-first, offline-capable, wallet-based, and fluent in local languages.

---

## 🚀 Project Vision
AfriCrop AI empowers subsistence farmers with:
- **Disease Detection:** Cassava, maize, yam, sorghum via phone‑cam + fine‑tuned vision models.
- **Yield Prediction:** Sentinel‑2 satellite data + local knowledge.
- **P2P Marketplace:** Crypto‑bartering with USDC on Solana testnet.
- **Offline‑First:** TensorFlow.js + IndexedDB, sync to IPFS when online.
- **Swarm Agents:** Disease, yield, market, risk agents coordinate via prompt chaining + local vector store.
- **Voice & Alerts:** Whisper multilingual voice UI, SMS drought/smuggler alerts via Twilio.

---

## 🏗️ Architecture
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│  Next.js 15 PWA │─────▶│  Edge API Routes │─────▶│ HuggingFace API │
│  (Farmer Phone) │      │  (Vercel/Render) │      │ (Crop Disease)  │
└────────┬────────┘      └────────┬─────────┘      └─────────────────┘
│                        │
│ offline mode           │
▼                        ▼
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│ TensorFlow.js   │      │     Supabase     │      │  IPFS (Web3)    │
│ Edge Inference  │      │  Auth + Postgres │      │  Image Storage  │
└─────────────────┘      └──────────────────┘      └─────────────────┘
│
▼
┌──────────────────┐
│ Solana Web3.js   │
│ USDC P2P Barter  │
└──────────────────┘


### Design Patterns Applied
- **Strategy Pattern** — pluggable inference engines (HF API vs. TFJS edge)
- **Repository Pattern** — Supabase data access abstracted from UI
- **Observer Pattern** — React Query cache invalidation on mutation
- **Factory Pattern** — agent instantiation (DiseaseAgent, YieldAgent, BarterAgent)

---

## 🧰 Tech Stack

| Layer | Tool | Why |
|---|---|---|
| Frontend | Next.js 15 + Tailwind + Shadcn/UI | SSR, App Router, accessible |
| State | TanStack React Query | Cache + offline sync |
| AI / LLM | HuggingFace Transformers + Grok API | Crop disease + agent reasoning |
| Edge AI | TensorFlow.js | Offline inference on farmer phones |
| Backend | Next.js Route Handlers (Node 20) | Serverless, free-tier friendly |
| DB | Supabase (Postgres + Auth) | Free tier, RLS for farmer privacy |
| Storage | IPFS via web3.storage | Censorship-resistant crop images |
| Payments | Solana Web3.js + USDC (devnet) | Sub-cent fees for tiny barters |
| Testing | Vitest + Playwright + Langsmith | Unit + E2E + agent evals |
| CI/CD | GitHub Actions → Render | Auto-deploy on main |
| Comms | Twilio (SMS alerts) | Reach feature phones |

---

## 🏃 Agile Process

- **Methodology:** Scrum, 2-week sprints
- **Roles:** Product Owner & Code Owner — Prince | Scrum Master & AI Lead — ENI
- **Board:** [GitHub Projects](https://github.com/Prince0206/afri-crop-ai/projects)
- **Standup:** Daily async via Discord
- **Sprints:**
  - **Sprint 1** (Apr 29 – May 12): MVP — image upload + disease detection
  - **Sprint 2** (May 13 – May 26): Yield agent + offline mode + IPFS
  - **Sprint 3** (May 27 – Jun 9): Solana P2P barter + voice UI + SMS alerts + polish

---

## 📂 Deliverables (Rubric‑Aligned)
- [Repo](./) → all code, documented
- [Deployed App](https://afri-crop-ai.onrender.com) → Render free tier
- [Agile Board](https://github.com/users/Prince0206/projects/3) → GitHub Projects
- [Design & Testing Doc](./docs/design-testing.md) → architecture, testing, CI/CD
- [Demo Recordings](./demos) → sprint + final presentations

---

## 🚀 Local Development

``bash
git clone https://github.com/Prince0206/afri-crop-ai.git
cd afri-crop-ai
npm install
cp .env.example .env.local   # add your HF + Supabase keys
npm run dev

Open http://localhost:3000.

## 🧪 Testing
``bash
npm run test:unit     # Vitest
npm run test:e2e      # Playwright
npm run lint          # ESLint

Coverage target: >80% on core agent logic.

🔐 Environment Variables
See .env.example. Required for full functionality:

HUGGINGFACE_API_KEY
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
WEB3_STORAGE_TOKEN
SOLANA_RPC_URL (devnet)

📊 Capstone Rubric Mapping
Criterion	                       |  Evidence
Software Engineering Principles	   |  SOLID applied, design patterns documented above
Agile / Scrum	                   |  GitHub Projects board, sprint demos, retros logged in /docs/sprints
CI/CD	                           |  .github/workflows/ci-cd.yml — lint, test, e2e, auto-deploy
Testing	                           |  Vitest unit + Playwright E2E + Langsmith agent evals
Innovation & Impact	               |  First offline-first, multilingual, Web3-native AgriAI for Africa
Documentation	                   |  This README + ADRs in /docs/adr

📜 License
MIT — built for the continent, owned by no one.

Built with stubborn love for African farmers.
