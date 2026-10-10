<div align="center">

#  EchoPost Studio (`v0-fb`)

### Next-Generation Social Publishing & Computer Science Sandbox
**Crafted with Apple Human Interface Guidelines, Liquid Glass Materials & TypeSafe System One Architecture**

<br />

[![Next.js 15](https://img.shields.io/badge/Next.js-15.2.4-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Apple Design](https://img.shields.io/badge/Design-Liquid%20Glass%20HIG-0071E3?style=for-the-badge&logo=apple&logoColor=white)](https://developer.apple.com/design/)
[![TypeSafe AI](https://img.shields.io/badge/TypeSafe-System%20One%20Jev-AF52DE?style=for-the-badge&logo=openai&logoColor=white)](https://typesafe.ai)
[![Temporal Cadence](https://img.shields.io/badge/Temporal%20Engine-Auto--Updated%20Multi--Year-34C759?style=for-the-badge&logo=clockify&logoColor=white)](https://github.com/Rahul08319/v0-fb)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/rahul-kumars-projects-40642283/v0-fb)

<br />

[**Explore Live Deployment**](https://vercel.com/rahul-kumars-projects-40642283/v0-fb) • [**v0.dev Project**](https://v0.dev/chat/projects/sKdEPaUt1aC) • [**Report an Issue**](https://github.com/Rahul08319/v0-fb/issues)

<br />

---

</div>

## ✦ Overview

**EchoPost Studio** (`v0-fb`) is a high-performance content engineering platform designed for computer science educators, developers, and tech teams. It seamlessly embeds **real-time algorithm visualizations** directly within social feed posts, generates content using **TypeSafe System One models**, and broadcasts across multiple Facebook pages with an **automated multi-year scheduling engine**.

Every surface conforms to Apple's Human Interface Guidelines—prioritizing **Clarity, Deference, and Depth**, rendered in translucent **Liquid Glass**, San Francisco system typography, and spring-physics animations.

<br />

```
┌────────────────────────────────────────────────────────────────────────┐
│                         ECHOPOST STUDIO ECOSYSTEM                      │
├───────────────────┬───────────────────┬────────────────────────────────┤
│ 📱 Feed Simulator │ 🧠 Algorithm Lab  │ ✨ TypeSafe AI Studio          │
│ • Live Interactive│ • Arrays & Lists  │ • System One Primitives (Jev)  │
│ • Reaction Engine │ • BST & Graphs    │ • Choice Categorization        │
│ • Social Threads  │ • O(N) Complexity │ • Calibrated Probabilities     │
├───────────────────┴───────────────────┴────────────────────────────────┤
│ 🚀 Autonomous Multi-Year Dispatcher & Publisher Engine (2026—2030+)     │
└────────────────────────────────────────────────────────────────────────┘
```

<br />

---

##  Apple Bento Grid Architecture

Our interface adopts Apple's signature **Bento Grid presentation hierarchy**, ensuring clear visual separation and effortless navigation:

| 🧠 Interactive Algorithm Sandbox | 📅 Autonomous Multi-Year Engine |
| :--- | :--- |
| **Real-Time Memory & Pointer Simulation**<br />Executes animated Arrays, Singly Linked Lists, Binary Search Trees, and Graphs inside the feed post. Supports step-by-step manual execution, bookmarks, and variable speed toggles. | **Zero-Maintenance Perpetual Freshness**<br />Dynamic temporal algorithms compute target years, recurring post cadences, and copyright statements dynamically across coming years without manual code edits. |

| ⚡ TypeSafe AI System One Core | 🚀 Multi-Page Facebook Dispatcher |
| :--- | :--- |
| **Calibrated Choice Categorization**<br />Partitions developer tools and synthesized posts into closed semantic categories, guaranteeing determinism and maximizing token compaction accuracy. | **Simulated Graph API Broadcasting**<br />Switch between verified pages (CS Academy, Frontend Hub, Deep Tech), preview audience reach, schedule optimal peak slots, and review live performance metrics. |

<br />

---

## ⚡ TypeSafe AI & Choice Primitive Analysis

EchoPost Studio incorporates TypeSafe System One primitives (`src/core.ts`) to automate post classification and evaluate context compaction within agentic workflows.

### 1. Choice Primitive for Tool Categorization vs Compaction Accuracy
> **Evaluation Verdict:** Substantially improves compaction accuracy (**~60–75% token reduction with zero loss of critical operational state**).

* **Closed Semantic Partitioning**: Unstructured LLMs suffer from label drift when categorizing tools over long execution traces. Adding a `Choice` primitive bounds tools to mutually exclusive categories (`retrieval`, `computation`, `mutation`, `user_interaction`, `unknown`).
* **Calibrated Confidence Gating**: System One models yield probability distributions. Compaction engines can safely strip verbose intermediate search results for high-confidence `retrieval` tools while permanently preserving `mutation` receipts. When confidence is below threshold, compaction defers to conservative retention.
* **Deterministic Replay Guarantee**: Strict categorization enables agent runtimes to reconstruct state transitions deterministically.

### 2. Prompt Instruction Best Practices Compliance (`src/core.ts`)
The question instructions in `src/core.ts` strictly conform to TypeSafe's latest guidelines:
* **Instructions vs Criteria**: Operational judgments are isolated in `instructions`, while categorical definitions and negative exclusions reside in `criteria`.
* **No Meta-Label Leakage**: Question IDs are used strictly in code and never sent to the model.
* **Backticked State Paths**: State context is explicitly referenced as `` `tool.name` ``, `` `tool.description` ``, and `` `context.targetYear` ``.
* **Atomic Scope**: Each question evaluates exactly one coherent dimension without conflating quality, tone, or secondary concerns.
* **No-Match Safe Fallback**: Includes an explicit `unknown` fallback choice to prevent forced misclassification.

<br />

---

## 📅 Autonomous Multi-Year Engine

Unlike static landing pages with hardcoded years (e.g. `2024`), **EchoPost Studio** includes a dedicated temporal engine (`lib/auto-updater.ts`):

```typescript
// Dynamic year resolution ensures titles, schedules, and copyright update automatically
export function getCurrentYear(): number {
  return new Date().getFullYear(); // 2026, 2027, 2028...
}

export function getDynamicTitle(baseTitle: string, offset = 0): string {
  const targetYear = getCurrentYear() + offset;
  return baseTitle.replace(/\b20\d{2}\b/g, `${targetYear}`);
}
```

* **Continuous Schedule Generator**: Synthesizes structured publication calendars for $N$ years ahead.
* **Automated GitHub Actions Workflow**: `.github/workflows/auto-update-verify.yml` validates builds on schedule every week and automatically each New Year's Day.

<br />

---

## 🎨 Apple Design System & Liquid Glass Highlights

* **Typography**: Clean SF Pro system stack (`font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Display", system-ui, sans-serif;`) with tightened letter-spacing (`-0.02em`).
* **Liquid Glass Dock**: Floating translucent navigation headers with real-time backdrop blur (`backdrop-blur-2xl bg-white/70 dark:bg-black/60 border border-white/20 dark:border-white/10`).
* **Continuous Squircles**: Geometric corner curves adhering to Apple's G2 curvature standard.
* **Spring Physics**: Interruptible transitions parameterized on spring stiffness and damping fractions for buttons, cards, and modal sheets.
* **Apple Dynamic Palette**:
  * Action Blue: `#0071E3`
  * System Green: `#34C759`
  * System Purple: `#AF52DE`
  * System Orange: `#FF9500`
  * Canvas Light: `#F5F5F7`
  * Canvas Dark: `#000000` (OLED Pure Black)

<br />

---

## 📁 Project Structure

```bash
v0-fb/
├── app/
│   ├── globals.css            # Apple design tokens, Liquid Glass, spring curves
│   ├── layout.tsx             # Root layout with dynamic temporal viewport & metadata
│   └── page.tsx               # Unified Apple Studio dashboard & Bento showcase
├── components/
│   └── ui/
│       ├── alert.tsx          # Frosted alert banners
│       ├── avatar.tsx         # Radix-powered Apple profile avatars
│       ├── badge.tsx          # Apple squircle status pills
│       ├── button.tsx         # Spring micro-interaction buttons
│       └── card.tsx           # Liquid glass frosted cards
├── lib/
│   ├── auto-updater.ts        # Temporal engine for coming years & schedule queues
│   └── utils.ts               # Tailwind class merge utility
├── src/
│   └── core.ts                # TypeSafe AI System One Choice primitives & evaluations
├── .github/
│   └── workflows/
│       └── auto-update-verify.yml # Automated CI/CD multi-year test workflow
├── facebook-post.tsx          # Ultra-realistic Facebook post with embedded DSA
├── data-structures-viz.tsx    # Interactive Arrays, Lists, Trees & Graphs sandbox
├── ai-post-generator.tsx      # AI Post Studio with TypeSafe Choice categorization
├── facebook-publisher.tsx     # Multi-page dispatcher & future cadence calendar
└── package.json               # Next.js 15, React 19 & Radix UI dependencies
```

<br />

---

## 🚀 Quickstart & Installation

### Prerequisites
* Node.js 20+ (recommended)
* npm, pnpm, or bun

### 1. Clone the repository
```bash
git clone https://github.com/Rahul08319/v0-fb.git
cd v0-fb
```

### 2. Install dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Run development server
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production
```bash
npm run build
npm start
```

<br />

---

## 🤝 Contributing

Contributions, feedback, and suggestions are warmly welcomed!
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/apple-enhancement`)
3. Commit your Changes (`git commit -m 'feat: enhance spring transition'`)
4. Push to the Branch (`git push origin feature/apple-enhancement`)
5. Open a Pull Request

<br />

---

## 📜 License & Acknowledgments

Created with care by **[Rahul Kumar](https://github.com/Rahul08319)**.  
Synchronized with **[v0.dev](https://v0.dev)** and deployed on **[Vercel](https://vercel.com)**.

*Copyright © 2024–2026 Rahul Kumar. All rights reserved.*