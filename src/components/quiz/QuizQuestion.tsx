import { useState, useEffect } from 'react'
import { Question } from '../../types'
import { KatexRenderer } from '../ui/KatexRenderer'
import { ShapeDiagram } from '../shapes/ShapeDiagram'
import { AnswerButton } from './AnswerButton'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

interface QuizQuestionProps {
  question: Question
  onSubmit: (chosenIndex: number) => void
  isSubmitted: boolean
}

export function QuizQuestion({ question, onSubmit, isSubmitted }: QuizQuestionProps) {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1)

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setSelectedIndex(-1)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [isSubmitted])

  const handleSubmit = () => {
    if (selectedIndex === -1) return
    onSubmit(selectedIndex)
  }

  return (
    <Card>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          <KatexRenderer text={question.text} hasLatex={question.hasLatex} />
        </h2>

        {question.shapeKey && <ShapeDiagram shapeKey={question.shapeKey} />}
      </div>

      <div className="space-y-3 mb-6">
        {question.options.map((option, idx) => (
          <AnswerButton
            key={idx}
            onClick={() => !isSubmitted && setSelectedIndex(idx)}
            submitted={isSubmitted}
            isSelected={selectedIndex === idx}
            isCorrect={idx === question.correctIndex}
            disabled={isSubmitted}
          >
            <KatexRenderer text={option} hasLatex={question.hasLatex} />
          </AnswerButton>
        ))}
      </div>

      {!isSubmitted && (
        <Button
          onClick={handleSubmit}
          disabled={selectedIndex === -1}
          className="w-full"
        >
          Submit Answer
        </Button>
      )}
    </Card>
  )
}
