import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { QuizAnswer, Question } from '../../types'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { KatexRenderer } from '../ui/KatexRenderer'

interface QuizEndScreenProps {
  score: number
  totalQuestions: number
  answers: QuizAnswer[]
  questions: Question[]
  totalTime?: string
  onPlayAgain: () => void
  onBackHome: () => void
}

export function QuizEndScreen({
  score,
  totalQuestions,
  answers,
  questions,
  totalTime,
  onPlayAgain,
  onBackHome,
}: QuizEndScreenProps) {
  useEffect(() => {
    if (score >= 8) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }, [score])

  const getRewardEmoji = () => {
    if (score === 10) return { emoji: '🏆', message: 'Perfect Score!', color: 'text-yellow-500' }
    if (score >= 8) return { emoji: '🌟', message: 'Amazing!', color: 'text-yellow-400' }
    if (score >= 6) return { emoji: '😊', message: 'Great Job!', color: 'text-green-500' }
    if (score >= 4) return { emoji: '👍', message: 'Good Effort!', color: 'text-blue-500' }
    return { emoji: '💪', message: 'Keep Practicing!', color: 'text-orange-500' }
  }

  const reward = getRewardEmoji()

  return (
    <div className="space-y-6">
      <Card className="text-center">
        <div className={`text-7xl mb-4 ${reward.color}`}>{reward.emoji}</div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Quiz Complete!</h2>
        <p className="text-xl text-slate-600 mb-6">{reward.message}</p>
        <div className="text-5xl font-bold text-blue-600 mb-4">
          {score} / {totalQuestions}
        </div>
        <p className="text-lg text-slate-600 mb-6">
          {Math.round((score / totalQuestions) * 100)}%
        </p>
        {totalTime && (
          <div className="border-t pt-4">
            <p className="text-sm font-semibold text-slate-600 mb-1">⏱️ Total Time</p>
            <p className="text-2xl font-bold text-purple-600">{totalTime}</p>
          </div>
        )}
      </Card>

      <div className="flex gap-4">
        <Button onClick={onPlayAgain} className="flex-1">
          Play Again
        </Button>
        <Button onClick={onBackHome} variant="secondary" className="flex-1">
          Back to Topics
        </Button>
      </div>

      <Card>
        <h3 className="text-2xl font-bold text-slate-800 mb-4">Review Answers</h3>
        <div className="space-y-4">
          {answers.map((answer, idx) => {
            const question = questions[idx]
            const correctAnswer = question.options[question.correctIndex]
            const yourAnswer = question.options[answer.chosenIndex]

            return (
              <div key={idx} className="border-l-4 border-blue-400 pl-4 py-2">
                <p className="font-semibold text-slate-800 mb-2">
                  Question {idx + 1}: {answer.isCorrect ? '✅' : '❌'}
                </p>
                <p className="text-sm text-slate-600 mb-2">
                  <KatexRenderer text={question.text} hasLatex={question.hasLatex} />
                </p>
                <div className="text-sm space-y-1">
                  <p className={answer.isCorrect ? 'text-green-600' : 'text-slate-600'}>
                    Your answer: <KatexRenderer text={yourAnswer} hasLatex={question.hasLatex} />
                  </p>
                  {!answer.isCorrect && (
                    <p className="text-green-600">
                      Correct: <KatexRenderer text={correctAnswer} hasLatex={question.hasLatex} />
                    </p>
                  )}
                  <p className="text-blue-600 mt-2">{question.explanation}</p>
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
