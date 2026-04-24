import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { TOPICS } from '../data/topics'
import { PageWrapper } from '../components/layout/PageWrapper'
import { useQuizStore } from '../store/quizStore'
import { useProgress } from '../hooks/useProgress'
import { QuizEndScreen } from '../components/quiz/QuizEndScreen'

export function ResultPage() {
  const { topicId } = useParams<{ topicId: string }>()
  const navigate = useNavigate()
  const session = useQuizStore((s) => s.session)
  const resetQuiz = useQuizStore((s) => s.resetQuiz)
  const { saveProgress } = useProgress()

  const topic = topicId ? TOPICS[topicId] : null

  useEffect(() => {
    if (session.status !== 'complete') {
      navigate(`/topic/${topicId}`)
      return
    }

    const score = session.answers.filter((a) => a.isCorrect).length
    saveProgress(topicId as any, score)
  }, [session.status])

  if (!topic || session.status !== 'complete') {
    return (
      <PageWrapper>
        <div className="text-center text-slate-600">Loading...</div>
      </PageWrapper>
    )
  }

  const score = session.answers.filter((a) => a.isCorrect).length

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto">
        <QuizEndScreen
          score={score}
          totalQuestions={10}
          answers={session.answers}
          questions={session.questions}
          onPlayAgain={() => {
            resetQuiz()
            navigate(`/topic/${topicId}/quiz`)
          }}
          onBackHome={() => {
            resetQuiz()
            navigate('/')
          }}
        />
      </div>
    </PageWrapper>
  )
}
