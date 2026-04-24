import { useParams, useNavigate } from 'react-router-dom'
import { TOPICS } from '../data/topics'
import { PageWrapper } from '../components/layout/PageWrapper'
import { Card } from '../components/ui/Card'
import { VideoLinkCard } from '../components/topic/VideoLinkCard'
import { Button } from '../components/ui/Button'

export function ReadPage() {
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
        <div className="text-center py-6">
          <div className="text-5xl mb-2">{topic.icon}</div>
          <h1 className="text-3xl font-bold">{topic.label}</h1>
          <p className="mt-2 opacity-90">Watch these videos to learn</p>
        </div>
      </Card>

      <div className="space-y-4 mb-8">
        {topic.videos.map((video, idx) => (
          <VideoLinkCard key={idx} video={video} />
        ))}
      </div>

      <div className="flex gap-4">
        <Button onClick={() => navigate(`/topic/${topicId}`)} variant="secondary">
          Back
        </Button>
        <Button onClick={() => navigate(`/topic/${topicId}/quiz`)}>
          Ready for Quiz?
        </Button>
      </div>
    </PageWrapper>
  )
}
