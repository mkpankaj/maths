import { ReactNode } from 'react'

interface AnswerButtonProps {
  children: ReactNode
  onClick: () => void
  submitted: boolean
  isSelected: boolean
  isCorrect: boolean
  disabled: boolean
}

export function AnswerButton({
  children,
  onClick,
  submitted,
  isSelected,
  isCorrect,
  disabled,
}: AnswerButtonProps) {
  let bgColor = 'bg-white border-2 border-gray-300 hover:border-blue-400 hover:bg-blue-50'

  if (!submitted && isSelected) {
    bgColor = 'bg-amber-400 border-2 border-amber-500 text-slate-900 scale-[1.02]'
  } else if (submitted && isSelected) {
    bgColor = isCorrect
      ? 'bg-green-500 border-2 border-green-600 text-white'
      : 'bg-red-500 border-2 border-red-600 text-white'
  } else if (submitted && !isSelected && isCorrect) {
    bgColor = 'bg-green-100 border-2 border-green-400'
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-4 rounded-lg font-semibold text-xl transition-all duration-200 ${bgColor} disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  )
}
