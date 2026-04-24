import { useCallback } from 'react'
import { useQuizStore } from '../store/quizStore'
import { Question, TopicId } from '../types'

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function sampleQuestions(bank: Question[], count: number = 10): Question[] {
  const shuffled = shuffleArray(bank)
  return shuffled.slice(0, Math.min(count, bank.length))
}

export function useQuiz() {
  const { startQuiz, submitAnswer, resetQuiz } = useQuizStore()

  const startNewQuiz = useCallback(
    (topicId: TopicId, questionBank: Question[]) => {
      const sampled = sampleQuestions(questionBank, 10)
      startQuiz(topicId, sampled)
    },
    [startQuiz],
  )

  return {
    startNewQuiz,
    submitAnswer,
    resetQuiz,
  }
}
