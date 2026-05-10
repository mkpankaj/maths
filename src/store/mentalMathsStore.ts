import { create } from 'zustand'
import { Question, MentalMathsAnswer } from '../types'

type MentalMathsStatus = 'idle' | 'active' | 'complete'

interface MentalMathsSession {
  questions: Question[]
  currentIndex: number
  answers: MentalMathsAnswer[]
  status: MentalMathsStatus
  startedAt: number
  questionStartedAt: number
}

interface MentalMathsStore {
  session: MentalMathsSession
  startSession: (questions: Question[]) => void
  submitAnswer: (chosenIndex: number) => void
  autoAdvance: () => void
  resetSession: () => void
}

const initialSession: MentalMathsSession = {
  questions: [],
  currentIndex: 0,
  answers: [],
  status: 'idle',
  startedAt: 0,
  questionStartedAt: 0,
}

export const useMentalMathsStore = create<MentalMathsStore>((set) => ({
  session: initialSession,

  startSession: (questions) => {
    const now = Date.now()
    set({
      session: {
        questions,
        currentIndex: 0,
        answers: [],
        status: 'active',
        startedAt: now,
        questionStartedAt: now,
      },
    })
  },

  submitAnswer: (chosenIndex) =>
    set((state) => {
      const { session } = state
      const now = Date.now()
      const currentQuestion = session.questions[session.currentIndex]
      const timeTakenMs = now - session.questionStartedAt

      const answer: MentalMathsAnswer = {
        questionId: currentQuestion.id,
        chosenIndex,
        isCorrect: chosenIndex === currentQuestion.correctIndex,
        timeTakenMs,
      }

      const newAnswers = [...session.answers, answer]
      const newIndex = session.currentIndex + 1
      const newStatus: MentalMathsStatus = newIndex >= session.questions.length ? 'complete' : 'active'

      return {
        session: {
          ...session,
          answers: newAnswers,
          currentIndex: newIndex,
          status: newStatus,
          questionStartedAt: now,
        },
      }
    }),

  autoAdvance: () =>
    set((state) => {
      const { session } = state
      const now = Date.now()
      const currentQuestion = session.questions[session.currentIndex]
      const timeTakenMs = now - session.questionStartedAt

      const answer: MentalMathsAnswer = {
        questionId: currentQuestion.id,
        chosenIndex: null,
        isCorrect: false,
        timeTakenMs,
      }

      const newAnswers = [...session.answers, answer]
      const newIndex = session.currentIndex + 1
      const newStatus: MentalMathsStatus = newIndex >= session.questions.length ? 'complete' : 'active'

      return {
        session: {
          ...session,
          answers: newAnswers,
          currentIndex: newIndex,
          status: newStatus,
          questionStartedAt: now,
        },
      }
    }),

  resetSession: () => set({ session: initialSession }),
}))
