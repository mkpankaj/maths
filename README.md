# MathsKid

An educational React application designed to help children aged 9–10 learn mathematics through topic-based lessons and interactive quizzes.

## Features

- **Topic-Based Learning** — Read explanations and view examples for each math topic before testing yourself
- **Interactive Quizzes** — 10-question quizzes per topic with multiple-choice and true/false questions
- **Math Rendering** — LaTeX equations rendered beautifully using KaTeX
- **Progress Dashboard** — Track your best scores, total attempts, and quiz history per topic
- **Shape Diagrams** — Visual aids for geometry and measurement questions
- **Celebratory Animations** — Confetti on quiz completion
- **Persistent Progress** — Scores saved locally via IndexedDB, survives browser refresh
- **Responsive Design** — Works on desktop and mobile devices

## Topics

| Topic | Description |
|-------|-------------|
| Numbers | Number properties, ordering, and operations |
| Factors & Multiples | Factors, multiples, HCF, LCM |
| Fractions | Equivalent fractions, addition, comparison |
| Decimal System | Place value, conversion, arithmetic |
| Percentages | Percentage calculation and conversion |
| Shapes & Measurements | 2D/3D shapes, area, perimeter, volume |

## Tech Stack

| Layer | Technology |
|-------|-----------|
| UI Framework | React 18, React Router DOM 6 |
| Language | TypeScript 5 |
| Build Tool | Vite 5 |
| Styling | Tailwind CSS 3, PostCSS |
| State Management | Zustand |
| Math Rendering | KaTeX + react-katex |
| Persistence | idb-keyval (IndexedDB) |
| Animations | canvas-confetti |
| Deployment | Vercel |

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Installation

```bash
git clone https://github.com/mkpankaj/maths.git
cd maths
npm install
```

### Development

```bash
npm run dev
```

Opens the app at `http://localhost:5173`.

### Build

```bash
npm run build
```

Runs TypeScript type checking and outputs the production bundle to `dist/`.

### Preview Production Build

```bash
npm run preview
```

### Type Check

```bash
npm run lint
```

## Project Structure

```
src/
├── components/
│   ├── ui/           # Reusable UI primitives (Button, Card, KatexRenderer)
│   ├── layout/       # App shell and page wrappers (AppShell, PageWrapper)
│   ├── quiz/         # Quiz components (QuizQuestion, ProgressBar, AnswerButton, QuizEndScreen)
│   ├── shapes/       # Shape diagram visualizations (ShapeDiagram)
│   └── topic/        # Topic cards and video links (TopicCard, VideoLinkCard)
├── pages/            # Page-level components
│   ├── HomePage.tsx       # Topic selection grid
│   ├── TopicPage.tsx      # Topic detail (read + quiz entry)
│   ├── ReadPage.tsx       # Topic lesson content
│   ├── QuizPage.tsx       # Active quiz flow
│   ├── ResultPage.tsx     # Score display and question review
│   └── DashboardPage.tsx  # Progress tracking dashboard
├── store/
│   └── quizStore.ts  # Zustand store for active quiz session state
├── hooks/
│   ├── useQuiz.ts    # Wraps quiz store + Fisher-Yates question sampling
│   └── useProgress.ts
├── data/
│   ├── topics.ts     # Topic metadata (labels, icons, colors, video links)
│   └── questions/    # JSON question banks (one file per topic)
├── types/
│   └── index.ts      # Central TypeScript type definitions
├── App.tsx           # Router configuration
└── main.tsx          # React entry point
```

## Adding Content

### Add questions to an existing topic

Edit the relevant file in `src/data/questions/` (e.g. `fractions.json`). Each question must match this schema:

```json
{
  "id": "unique-id",
  "type": "mcq",
  "text": "What is \\frac{1}{2} + \\frac{1}{4}?",
  "hasLatex": true,
  "options": ["\\frac{1}{4}", "\\frac{3}{4}", "\\frac{1}{2}", "1"],
  "correctIndex": 1,
  "explanation": "Finding a common denominator gives \\frac{2}{4} + \\frac{1}{4} = \\frac{3}{4}.",
  "difficulty": 1
}
```

- Set `hasLatex: true` when the text or options contain LaTeX notation
- `difficulty` is `1` (easy), `2` (medium), or `3` (hard)
- Add `"shapeKey": "<key>"` for questions that need a shape diagram

### Add a new topic

1. Add the topic ID to the `TopicId` union in `src/types/index.ts`
2. Create `src/data/questions/<topic-id>.json` with the question bank
3. Add the topic metadata (label, icon, color, video links) to `TOPIC_LIST` in `src/data/topics.ts`

## Deployment

The app is deployed to Vercel. The `vercel.json` config rewrites all routes to `index.html` for client-side routing. A production build is triggered automatically on push to `main`.

## License

This project is private.
