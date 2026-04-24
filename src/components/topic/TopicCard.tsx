import { Link } from 'react-router-dom'
import { Card } from '../ui/Card'
import { Topic } from '../../types'

interface TopicCardProps {
  topic: Topic
  bestScore?: number
}

export function TopicCard({ topic, bestScore = 0 }: TopicCardProps) {
  return (
    <Link to={`/topic/${topic.id}`}>
      <Card className={`bg-gradient-to-br ${topic.color} text-white h-full hover:scale-105 cursor-pointer`}>
        <div className="flex flex-col items-center justify-center h-48">
          <div className="text-6xl mb-4">{topic.icon}</div>
          <h3 className="text-2xl font-bold text-center mb-4">{topic.label}</h3>
          {bestScore > 0 && (
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
              <span className="text-sm font-semibold">Best: {bestScore}/10</span>
            </div>
          )}
        </div>
      </Card>
    </Link>
  )
}
