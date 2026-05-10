import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PageWrapper } from '../components/layout/PageWrapper'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { ProgressBar } from '../components/quiz/ProgressBar'
import { KatexRenderer } from '../components/ui/KatexRenderer'
import { useMentalMathsStore } from '../store/mentalMathsStore'
import { generateMentalMathsQuestions } from '../data/generators/mental-maths'
import { useCountdown } from '../hooks/useTimer'

const QUESTION_TIME = 90

export function MentalMathsPage() {
  const navigate = useNavigate()
  const { session, startSession, submitAnswer, autoAdvance, resetSession } = useMentalMathsStore()
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)

  useEffect(() => {
    resetSession()
    startSession(generateMentalMathsQuestions())
  }, [])

  const handleExpire = () => {
    setSelectedIndex(-1)
    autoAdvance()
  }

  const remaining = useCountdown(QUESTION_TIME, session.currentIndex, handleExpire)

  useEffect(() => {
    if (session.status === 'complete') {
      navigate('/mental-maths/result')
    }
  }, [session.status])

  useEffect(() => {
    setSelectedIndex(-1)
  }, [session.currentIndex])

  const handleSubmit = () => {
    if (selectedIndex === -1) return
    submitAnswer(selectedIndex)
  }

  if (session.status === 'idle' || session.questions.length === 0) {
    return (
      <PageWrapper>
        <div className="text-center text-slate-600 text-xl py-20">Loading…</div>
      </PageWrapper>
    )
  }

  if (session.status === 'complete') {
    return (
      <PageWrapper>
        <div className="text-center text-slate-600 text-xl py-20">Finishing…</div>
      </PageWrapper>
    )
  }

  const currentQuestion = session.questions[session.currentIndex]
  const isUrgent = remaining <= 10

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto">
        {/* Header row */}
        <div className="flex items-center justify-between mb-6 gap-6">
          <div className="flex-1">
            <ProgressBar
              current={session.currentIndex}
              total={10}
              topicColor="from-purple-500 to-indigo-600"
            />
          </div>

          {/* Countdown timer */}
          <div
            className={`flex-shrink-0 px-5 py-3 rounded-xl border-2 text-center transition-colors duration-300 ${
              isUrgent
                ? 'bg-red-100 border-red-500'
                : 'bg-indigo-50 border-indigo-400'
            }`}
          >
            <div className={`text-xs font-semibold mb-0.5 ${isUrgent ? 'text-red-600' : 'text-indigo-500'}`}>
              ⏱ Time left
            </div>
            <div className={`text-3xl font-bold tabular-nums ${isUrgent ? 'text-red-600' : 'text-indigo-700'}`}>
              {remaining}s
            </div>
          </div>
        </div>

        {/* Question card */}
        <Card>
          <div className="mb-2 text-sm font-semibold text-indigo-500 uppercase tracking-wide">
            Question {session.currentIndex + 1} of 10
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            <KatexRenderer text={currentQuestion.text} hasLatex={currentQuestion.hasLatex} />
          </h2>

          <div className="space-y-3 mb-6">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = selectedIndex === idx
              const base =
                'w-full p-4 rounded-lg font-semibold text-xl text-left transition-all duration-150 border-2'
              const style = isSelected
                ? 'bg-indigo-500 border-indigo-600 text-white scale-[1.01]'
                : 'bg-white border-gray-300 hover:border-indigo-400 hover:bg-indigo-50 text-slate-800'

              return (
                <button
                  key={idx}
                  onClick={() => setSelectedIndex(idx)}
                  className={`${base} ${style}`}
                >
                  <KatexRenderer text={option} hasLatex={currentQuestion.hasLatex} />
                </button>
              )
            })}
          </div>

          <Button
            onClick={handleSubmit}
            disabled={selectedIndex === -1}
            className="w-full"
          >
            Submit Answer
          </Button>
        </Card>
      </div>
    </PageWrapper>
  )
}
