# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**MathsKid** is an educational React application designed to teach mathematics to children. It features topic-based learning with explanations and interactive quizzes (10 questions per quiz) across six math topics: Factors and Multiples, Fractions, Decimal System, Percentages, Numbers, and Shapes/Measurements.

## Technology Stack

- **UI Framework**: React 18, React Router DOM 6
- **Language & Build**: TypeScript 5, Vite 5
- **Styling**: Tailwind CSS, PostCSS, Autoprefixer
- **State Management**: Zustand (quiz session state)
- **Math Rendering**: KaTeX + react-katex (math equation rendering)
- **UI Effects**: canvas-confetti (celebration animations)
- **Persistence**: idb-keyval (local IndexedDB storage for progress/settings)

## Architecture & Code Organization

```
src/
├── components/
│   ├── ui/           # Reusable UI components (Button, Card, KatexRenderer)
│   ├── layout/       # App structure (AppShell, PageWrapper)
│   ├── quiz/         # Quiz-specific components (QuizQuestion, ProgressBar, AnswerButton, QuizEndScreen)
│   ├── shapes/       # Shape diagram visualization (ShapeDiagram)
│   └── topic/        # Topic cards and video links (TopicCard, VideoLinkCard)
├── pages/            # Page-level components (HomePage, TopicPage, QuizPage, ResultPage, ReadPage, DashboardPage)
├── store/            # Zustand quiz store (quizStore.ts) - manages active quiz session
├── hooks/            # Custom React hooks (useQuiz - wraps store + question sampling)
├── data/questions/   # JSON question banks (one file per topic, ~10 questions each currently)
├── types/            # TypeScript type definitions
├── App.tsx           # Main router and app layout
├── main.tsx          # React entry point
└── index.css         # Global styles + Tailwind directives
```

### Key Design Patterns

- **Zustand Store**: `useQuizStore` manages quiz session state (current question, answers, score). Accessed via `useQuiz` hook which adds helper functions like `startNewQuiz` and question sampling.
- **Question Sampling**: `useQuiz` hook randomly samples 10 questions from the question bank on quiz start (Fisher-Yates shuffle).
- **Type-Safe Routing**: `TopicId` type union ensures only valid topics are routed.
- **Data-Driven**: Question content, topic metadata, and video links are stored as JSON, not hardcoded.

## Common Commands

```bash
npm run dev          # Start Vite dev server (opens at http://localhost:5173)
npm run build        # TypeScript check + Vite production build → dist/
npm run preview      # Preview production build locally
npm run lint         # Type check without emitting (tsc --noEmit)
```

## Key Files & Their Responsibilities

| File | Purpose |
|------|---------|
| `src/types/index.ts` | Central type definitions (Topic, Question, QuizSession, TopicProgress) |
| `src/store/quizStore.ts` | Zustand store managing quiz session state |
| `src/hooks/useQuiz.ts` | Hook wrapping store + question sampling logic |
| `src/data/questions/*.json` | Question banks per topic |
| `src/components/quiz/QuizQuestion.tsx` | Single question display with answer options |
| `src/pages/QuizPage.tsx` | Quiz container (orchestrates flow between questions) |
| `src/pages/ResultPage.tsx` | Score display and question review |

## Development Guidelines

- **TypeScript**: Use strict mode enforced by `tsconfig.json` (no implicit any, unused variables caught at compile time).
- **Questions & Content**: Add new questions to JSON files in `src/data/questions/`. Each question must have: `id`, `type`, `text`, `hasLatex`, `options`, `correctIndex`, `explanation`, `difficulty`, and optionally `shapeKey` for diagrams.
- **Math Rendering**: Use KaTeX syntax (LaTeX) in question text and options. Mark with `hasLatex: true` so KatexRenderer wraps them correctly.
- **State Updates**: For quiz state, always dispatch through the Zustand store (`useQuizStore`); do not use useState for quiz data.
- **Styling**: Use Tailwind classes; avoid inline styles unless necessary. Check `tailwind.config.ts` for custom colors/spacing.
- **Persistence**: Use `idb-keyval` for storing user progress (scores, best attempts) across sessions.

## Deployment

The `vercel.json` config suggests this app is deployed to Vercel. Build runs `tsc && vite build`, output goes to `dist/`.

## Common Workflows

**Adding a new topic:**
1. Add topic ID to `TopicId` union in `src/types/index.ts`
2. Create `src/data/questions/{topic-id}.json` with question bank
3. Add topic metadata to TOPICS constant (wherever topics are defined; check HomePage or a topics config file)
4. Create topic-specific content/video links if applicable

**Adding questions to a topic:**
- Edit the corresponding JSON file in `src/data/questions/`
- Ensure each question matches the `Question` interface schema
- Use valid LaTeX for math notation; set `hasLatex: true` if present

**Debugging quiz flow:**
- Quiz state lives in Zustand store; check `useQuizStore` subscription
- Question sampling happens in `useQuiz` hook's `startNewQuiz`
- Progress/best scores stored via `idb-keyval` (check for calls to `set()`/`get()` in persistence code)
