import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'correct' | 'wrong'
  disabled?: boolean
  className?: string
}

export function Button({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
}: ButtonProps) {
  const baseStyles =
    'px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-200 disabled:opacity-50'

  const variants = {
    primary:
      'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:shadow-lg hover:scale-105',
    secondary:
      'bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-50',
    correct: 'bg-green-500 text-white ring-4 ring-green-300',
    wrong: 'bg-red-500 text-white ring-4 ring-red-300',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  )
}
