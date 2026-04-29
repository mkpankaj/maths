import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { TOPICS } from '../data/topics'
import { PageWrapper } from '../components/layout/PageWrapper'
import { useQuizStore } from '../store/quizStore'
import { useQuiz } from '../hooks/useQuiz'
import { useTimer, formatTime } from '../hooks/useTimer'
import { ProgressBar } from '../components/quiz/ProgressBar'
import { QuizQuestion } from '../components/quiz/QuizQuestion'
import { generateQuestions } from '../data/generators/index'

export function QuizPage() {
  const { topicId } = useParams<{ topicId: string }>()
  const navigate = useNavigate()
  const session = useQuizStore((s) => s.session)
  const submitAnswer = useQuizStore((s) => s.submitAnswer)
  const { startNewQuiz } = useQuiz()
  const [submitted, setSubmitted] = useState(false)
  const elapsed = useTimer(session.startedAt)

  const topic = topicId ? TOPICS[topicId] : null

  useEffect(() => {
    if (!session.topicId || session.status === 'idle') {
      if (topicId) {
        const questionBank = generateQuestions(topicId)
        if (questionBank) {
          startNewQuiz(topicId as any, questionBank)
        } else {
          navigate(`/topic/${topicId}`)
        }
      } else {
        navigate('/')
      }
    }
  }, [topicId, session.status])

  useEffect(() => {
    if (session.status === 'complete') {
      const timer = setTimeout(() => {
        navigate(`/topic/${topicId}/result`)
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [session.status])

  const handleSubmit = (chosenIndex: number) => {
    setSubmitted(true)
    setTimeout(() => {
      submitAnswer(chosenIndex)
      setSubmitted(false)
    }, 1500)
  }

  if (!topic || session.questions.length === 0 || session.status === 'complete') {
    return (
      <PageWrapper>
        <div className="text-center text-slate-600 text-xl py-20">Loading results…</div>
      </PageWrapper>
    )
  }

  const currentQuestion = session.questions[session.currentIndex]

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <ProgressBar
              current={session.currentIndex}
              total={10}
              topicColor={topic.color}
            />
          </div>
          <div className="ml-6 px-4 py-2 bg-blue-100 rounded-lg border-2 border-blue-500">
            <div className="text-sm font-semibold text-blue-600">⏱️ Time</div>
            <div className="text-2xl font-bold text-blue-700">{formatTime(elapsed)}</div>
          </div>
        </div>
        <QuizQuestion
          question={currentQuestion}
          onSubmit={handleSubmit}
          isSubmitted={submitted}
        />
      </div>
    </PageWrapper>
  )
}
