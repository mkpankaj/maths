export type TopicId =
  | 'factors-multiples'
  | 'fractions'
  | 'decimal-system'
  | 'percentages'
  | 'numbers'
  | 'shapes-measurements'

export type QuestionType = 'mcq' | 'true-false'

export interface Question {
  id: string
  type: QuestionType
  text: string
  hasLatex: boolean
  options: string[]
  correctIndex: number
  explanation: string
  shapeKey?: string
  difficulty: 1 | 2 | 3
}

export interface VideoLink {
  subtopic: string
  url: string
  durationLabel?: string
}

export interface Topic {
  readonly id: TopicId
  readonly label: string
  readonly icon: string
  readonly color: string
  readonly videos: readonly VideoLink[]
}

export interface QuizAnswer {
  questionId: string
  chosenIndex: number
  isCorrect: boolean
}

export type QuizStatus = 'idle' | 'active' | 'complete'

export interface QuizSession {
  topicId: TopicId | null
  questions: Question[]
  currentIndex: number
  answers: QuizAnswer[]
  status: QuizStatus
  startedAt: number
}

export interface QuizAttempt {
  score: number
  timestamp: number
  questionCount: number
}

export interface TopicProgress {
  topicId: TopicId
  bestScore: number
  attempts: number
  lastPlayedAt: number
  quizHistory: QuizAttempt[]  // all quiz attempts, newest first
}
