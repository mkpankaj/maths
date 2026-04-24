interface ProgressBarProps {
  current: number
  total: number
  topicColor: string
}

export function ProgressBar({ current, total, topicColor }: ProgressBarProps) {
  const percentage = (current / total) * 100

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-semibold text-slate-700">
          Question {current + 1} of {total}
        </span>
        <span className="text-sm text-slate-500">{Math.round(percentage)}%</span>
      </div>
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${topicColor} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
