import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { TOPICS } from '../data/topics'
import { PageWrapper } from '../components/layout/PageWrapper'
import { useQuizStore } from '../store/quizStore'
import { useQuiz } from '../hooks/useQuiz'
import { ProgressBar } from '../components/quiz/ProgressBar'
import { QuizQuestion } from '../components/quiz/QuizQuestion'
import { getQuestionBank } from '../data/questions/index'

export function QuizPage() {
  const { topicId } = useParams<{ topicId: string }>()
  const navigate = useNavigate()
  const session = useQuizStore((s) => s.session)
  const submitAnswer = useQuizStore((s) => s.submitAnswer)
  const { startNewQuiz } = useQuiz()
  const [submitted, setSubmitted] = useState(false)

  const topic = topicId ? TOPICS[topicId] : null

  useEffect(() => {
    if (!session.topicId || session.status === 'idle') {
      if (topicId) {
        const questionBank = getQuestionBank(topicId)
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
        <ProgressBar
          current={session.currentIndex}
          total={10}
          topicColor={topic.color}
        />
        <QuizQuestion
          question={currentQuestion}
          onSubmit={handleSubmit}
          isSubmitted={submitted}
        />
      </div>
    </PageWrapper>
  )
}
