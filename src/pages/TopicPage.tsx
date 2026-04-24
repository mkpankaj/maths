import { useParams, useNavigate } from 'react-router-dom'
import { TOPICS } from '../data/topics'
import { PageWrapper } from '../components/layout/PageWrapper'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'

export function TopicPage() {
  const { topicId } = useParams<{ topicId: string }>()
  const navigate = useNavigate()

  const topic = topicId ? TOPICS[topicId] : null

  if (!topic) {
    return (
      <PageWrapper>
        <div className="text-center text-slate-600">Topic not found</div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <Card className={`bg-gradient-to-br ${topic.color} text-white mb-8`}>
        <div className="text-center py-8">
          <div className="text-6xl mb-4">{topic.icon}</div>
          <h1 className="text-4xl font-bold">{topic.label}</h1>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Button
          onClick={() => navigate(`/topic/${topicId}/read`)}
          className="h-32 flex items-center justify-center text-center"
        >
          <div>
            <div className="text-3xl mb-2">📚</div>
            <div className="text-xl font-bold">Read the Subject</div>
            <div className="text-sm opacity-90">Learn with videos</div>
          </div>
        </Button>

        <Button
          onClick={() => navigate(`/topic/${topicId}/quiz`)}
          variant="secondary"
          className="h-32 flex items-center justify-center text-center"
        >
          <div>
            <div className="text-3xl mb-2">✏️</div>
            <div className="text-xl font-bold">Take Quiz</div>
            <div className="text-sm opacity-90">10 questions</div>
          </div>
        </Button>
      </div>

      <div className="mt-8 text-center">
        <Button onClick={() => navigate('/')} variant="secondary">
          Back to Topics
        </Button>
      </div>
    </PageWrapper>
  )
}
