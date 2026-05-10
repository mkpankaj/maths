import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import confetti from 'canvas-confetti'
import { PageWrapper } from '../components/layout/PageWrapper'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { KatexRenderer } from '../components/ui/KatexRenderer'
import { useMentalMathsStore } from '../store/mentalMathsStore'
import { useMentalMathsProgress } from '../hooks/useMentalMathsProgress'
import { formatTime } from '../hooks/useTimer'
import { MentalMathsAttempt } from '../types'

function formatMs(ms: number): string {
  return formatTime(ms)
}

export function MentalMathsResultPage() {
  const navigate = useNavigate()
  const { session, resetSession } = useMentalMathsStore()
  const { saveAttempt } = useMentalMathsProgress()
  const saved = useRef(false)

  useEffect(() => {
    if (session.status !== 'complete' || saved.current) return
    saved.current = true

    const score = session.answers.filter((a) => a.isCorrect).length
    const totalTimeMs = Date.now() - session.startedAt

    const attempt: MentalMathsAttempt = {
      id: `mm-${Date.now()}`,
      date: Date.now(),
      score,
      totalTimeMs,
      answers: session.answers,
      questions: session.questions,
    }

    saveAttempt(attempt)

    if (score >= 8) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } })
    }
  }, [session.status])

  if (session.status !== 'complete') {
    return (
      <PageWrapper>
        <div className="text-center text-slate-600 py-20">Loading results…</div>
      </PageWrapper>
    )
  }

  const score = session.answers.filter((a) => a.isCorrect).length
  const totalTimeMs = Date.now() - session.startedAt

  const getReward = () => {
    if (score === 10) return { emoji: '🏆', message: 'Perfect Score!', color: 'text-yellow-500' }
    if (score >= 8) return { emoji: '🌟', message: 'Amazing!', color: 'text-yellow-400' }
    if (score >= 6) return { emoji: '😊', message: 'Great Job!', color: 'text-green-500' }
    if (score >= 4) return { emoji: '👍', message: 'Good Effort!', color: 'text-blue-500' }
    return { emoji: '💪', message: 'Keep Practicing!', color: 'text-orange-500' }
  }
  const reward = getReward()

  const handlePlayAgain = () => {
    resetSession()
    navigate('/mental-maths')
  }

  const handleHome = () => {
    resetSession()
    navigate('/')
  }

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Score summary */}
        <Card className="text-center">
          <div className={`text-7xl mb-4 ${reward.color}`}>{reward.emoji}</div>
          <h2 className="text-3xl font-bold text-slate-800 mb-1">Mental Maths Complete!</h2>
          <p className="text-xl text-slate-500 mb-6">{reward.message}</p>
          <div className="text-5xl font-bold text-indigo-600 mb-2">{score} / 10</div>
          <p className="text-lg text-slate-500 mb-6">{Math.round((score / 10) * 100)}%</p>
          <div className="border-t pt-4">
            <p className="text-sm font-semibold text-slate-500 mb-1">⏱ Total Time</p>
            <p className="text-2xl font-bold text-purple-600">{formatMs(totalTimeMs)}</p>
          </div>
        </Card>

        {/* Action buttons */}
        <div className="flex gap-4">
          <Button onClick={handlePlayAgain} className="flex-1">Play Again</Button>
          <Button onClick={handleHome} variant="secondary" className="flex-1">Home</Button>
        </div>

        {/* Question-by-question review */}
        <Card>
          <h3 className="text-2xl font-bold text-slate-800 mb-5">Review Answers</h3>
          <div className="space-y-5">
            {session.answers.map((answer, idx) => {
              const question = session.questions[idx]
              const notAttempted = answer.chosenIndex === null
              const correctOption = question.options[question.correctIndex]
              const chosenOption = answer.chosenIndex !== null ? question.options[answer.chosenIndex] : null

              return (
                <div
                  key={idx}
                  className={`border-l-4 pl-4 py-2 ${
                    notAttempted
                      ? 'border-gray-400'
                      : answer.isCorrect
                      ? 'border-green-500'
                      : 'border-red-400'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-slate-800">
                      Q{idx + 1}:{' '}
                      {notAttempted ? '⏭ Not Attempted' : answer.isCorrect ? '✅ Correct' : '❌ Wrong'}
                    </p>
                    <span className="text-xs text-slate-400 ml-4 flex-shrink-0">
                      ⏱ {formatMs(answer.timeTakenMs)}
                    </span>
                  </div>

                  <p className="text-sm text-slate-700 mb-2">
                    <KatexRenderer text={question.text} hasLatex={question.hasLatex} />
                  </p>

                  <div className="text-sm space-y-0.5">
                    {notAttempted ? (
                      <p className="text-gray-500">No answer selected (time ran out).</p>
                    ) : (
                      <p className={answer.isCorrect ? 'text-green-700' : 'text-red-600'}>
                        Your answer:{' '}
                        <KatexRenderer text={chosenOption!} hasLatex={question.hasLatex} />
                      </p>
                    )}

                    {(!answer.isCorrect) && (
                      <p className="text-green-700">
                        Correct answer:{' '}
                        <KatexRenderer text={correctOption} hasLatex={question.hasLatex} />
                      </p>
                    )}

                    <p className="text-indigo-600 mt-1">{question.explanation}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </PageWrapper>
  )
}
