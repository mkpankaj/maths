import { useEffect } from 'react'
import { PageWrapper } from '../components/layout/PageWrapper'
import { TopicCard } from '../components/topic/TopicCard'
import { TOPIC_LIST } from '../data/topics'
import { useProgress } from '../hooks/useProgress'

export function HomePage() {
  const { progress, loadAllProgress } = useProgress()

  useEffect(() => {
    loadAllProgress()
  }, [])

  return (
    <PageWrapper>
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-slate-800 mb-4">Welcome to MathsKid! 🎓</h1>
        <p className="text-xl text-slate-600">
          Choose a topic to read about it or take a quiz
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TOPIC_LIST.map((topic) => (
          <TopicCard
            key={topic.id}
            topic={topic}
            bestScore={progress[topic.id]?.bestScore || 0}
          />
        ))}
      </div>
    </PageWrapper>
  )
}
