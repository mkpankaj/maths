import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PageWrapper } from '../components/layout/PageWrapper'
import { Card } from '../components/ui/Card'
import { useProgress } from '../hooks/useProgress'
import { useMentalMathsProgress } from '../hooks/useMentalMathsProgress'
import { TOPIC_LIST } from '../data/topics'
import { TopicId } from '../types'
import { formatTime } from '../hooks/useTimer'

function ScoreBar({ score }: { score: number }) {
  const pct = (score / 10) * 100
  const color =
    score >= 8 ? 'bg-green-500' : score >= 6 ? 'bg-yellow-400' : score >= 4 ? 'bg-orange-400' : 'bg-red-400'

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all duration-500`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-sm font-bold w-8 text-right text-slate-700">{score}/10</span>
    </div>
  )
}

function ScoreEmoji({ score }: { score: number }) {
  if (score === 10) return <span title="Perfect!">🏆</span>
  if (score >= 8) return <span title="Amazing!">🌟</span>
  if (score >= 6) return <span title="Great Job!">😊</span>
  if (score >= 4) return <span title="Good Effort!">👍</span>
  return <span title="Keep Practicing!">💪</span>
}

export function DashboardPage() {
  const { progress, loadAllProgress } = useProgress()
  const { progress: mmProgress, loadProgress: loadMmProgress } = useMentalMathsProgress()

  useEffect(() => {
    loadAllProgress()
    loadMmProgress()
  }, [])

  const totalAttempts = Object.values(progress).reduce((sum, p) => sum + (p?.attempts ?? 0), 0)
  const topicsPlayed = Object.values(progress).filter((p) => (p?.attempts ?? 0) > 0).length
  const allBest = Object.values(progress).map((p) => p?.bestScore ?? 0)
  const avgBest = allBest.length > 0 ? Math.round(allBest.reduce((a, b) => a + b, 0) / allBest.length) : 0

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">My Dashboard 📊</h1>
          <p className="text-slate-500">Track your progress across all topics</p>
        </div>

        {/* Summary row */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <Card className="text-center py-6">
            <div className="text-4xl font-bold text-blue-600">{totalAttempts}</div>
            <div className="text-sm text-slate-500 mt-1">Total Quizzes</div>
          </Card>
          <Card className="text-center py-6">
            <div className="text-4xl font-bold text-purple-600">{topicsPlayed}/6</div>
            <div className="text-sm text-slate-500 mt-1">Topics Tried</div>
          </Card>
          <Card className="text-center py-6">
            <div className="text-4xl font-bold text-green-600">{avgBest}/10</div>
            <div className="text-sm text-slate-500 mt-1">Avg Best Score</div>
          </Card>
        </div>

        {/* Per-topic cards */}
        <div className="space-y-4">
          {TOPIC_LIST.map((topic) => {
            const p = progress[topic.id as TopicId]
            const quizHistory = p?.quizHistory ?? []
            const hasPlayed = (p?.attempts ?? 0) > 0

            return (
              <Card key={topic.id} className="overflow-hidden">
                <div className="flex items-start gap-4">
                  {/* Topic header strip */}
                  <div className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center text-2xl`}>
                    {topic.icon}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-lg font-bold text-slate-800">{topic.label}</h2>
                      {hasPlayed ? (
                        <span className="text-sm text-slate-500">
                          Best: <span className="font-bold text-slate-700">{p?.bestScore}/10</span>
                          {' · '}
                          {p?.attempts} attempt{p?.attempts !== 1 ? 's' : ''}
                        </span>
                      ) : (
                        <span className="text-sm text-slate-400 italic">Not started yet</span>
                      )}
                    </div>

                    {hasPlayed ? (
                      <div className="space-y-2">
                        {quizHistory.map((attempt, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="flex items-center gap-1 w-24 text-sm text-slate-500">
                              <ScoreEmoji score={attempt.score} />
                              <span>Quiz {idx + 1}</span>
                            </div>
                            <div className="flex-1">
                              <ScoreBar score={attempt.score} />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-slate-400">Take a quiz to see your scores here!</p>
                    )}
                  </div>

                  <Link
                    to={`/topic/${topic.id}/quiz`}
                    className="flex-shrink-0 self-center px-4 py-2 rounded-lg bg-blue-50 text-blue-600 text-sm font-semibold hover:bg-blue-100 transition-colors"
                  >
                    {hasPlayed ? 'Retry' : 'Start'}
                  </Link>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Mental Maths history */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-800">🧠 Mental Maths</h2>
            <Link
              to="/mental-maths"
              className="px-4 py-2 rounded-lg bg-indigo-50 text-indigo-600 text-sm font-semibold hover:bg-indigo-100 transition-colors"
            >
              Start Quiz
            </Link>
          </div>

          {mmProgress.attempts.length === 0 ? (
            <Card>
              <p className="text-slate-400 text-sm">No Mental Maths quizzes yet. Give it a try!</p>
            </Card>
          ) : (
            <Card>
              <div className="divide-y divide-slate-100">
                {mmProgress.attempts.map((attempt, idx) => {
                  const date = new Date(attempt.date)
                  const dateStr = date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
                  const timeStr = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
                  const pct = Math.round((attempt.score / 10) * 100)
                  const color =
                    attempt.score >= 8 ? 'bg-green-500' : attempt.score >= 6 ? 'bg-yellow-400' : attempt.score >= 4 ? 'bg-orange-400' : 'bg-red-400'

                  return (
                    <div key={attempt.id} className="flex items-center gap-4 py-3">
                      <div className="w-6 text-center text-sm text-slate-400 font-medium">#{idx + 1}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                            <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
                          </div>
                          <span className="text-sm font-bold text-slate-700 w-10 text-right">{attempt.score}/10</span>
                        </div>
                        <div className="text-xs text-slate-400">{dateStr} · {timeStr}</div>
                      </div>
                      <div className="text-sm text-slate-500 flex-shrink-0">⏱ {formatTime(attempt.totalTimeMs)}</div>
                    </div>
                  )
                })}
              </div>
            </Card>
          )}
        </div>
      </div>
    </PageWrapper>
  )
}
