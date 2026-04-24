import { create } from 'zustand'
import { Question, QuizAnswer, QuizSession, QuizStatus, TopicId } from '../types'

interface QuizStore {
  session: QuizSession
  startQuiz: (topicId: TopicId, questions: Question[]) => void
  submitAnswer: (chosenIndex: number) => void
  resetQuiz: () => void
}

const initialSession: QuizSession = {
  topicId: null,
  questions: [],
  currentIndex: 0,
  answers: [],
  status: 'idle',
  startedAt: 0,
}

export const useQuizStore = create<QuizStore>((set) => ({
  session: initialSession,

  startQuiz: (topicId, questions) =>
    set({
      session: {
        topicId,
        questions,
        currentIndex: 0,
        answers: [],
        status: 'active',
        startedAt: Date.now(),
      },
    }),

  submitAnswer: (chosenIndex) =>
    set((state) => {
      const { session } = state
      const currentQuestion = session.questions[session.currentIndex]
      const isCorrect = chosenIndex === currentQuestion.correctIndex

      const newAnswer: QuizAnswer = {
        questionId: currentQuestion.id,
        chosenIndex,
        isCorrect,
      }

      const newAnswers = [...session.answers, newAnswer]
      const newIndex = session.currentIndex + 1
      const newStatus: QuizStatus = newIndex >= 10 ? 'complete' : 'active'

      return {
        session: {
          ...session,
          answers: newAnswers,
          currentIndex: newIndex,
          status: newStatus,
        },
      }
    }),

  resetQuiz: () =>
    set({
      session: initialSession,
    }),
}))
