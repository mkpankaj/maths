import { Card } from '../ui/Card'
import { VideoLink } from '../../types'

interface VideoLinkCardProps {
  video: VideoLink
}

export function VideoLinkCard({ video }: VideoLinkCardProps) {
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(video.subtopic)}`

  return (
    <Card className="hover:shadow-xl">
      <a
        href={youtubeSearchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center w-16 h-16 bg-red-500 rounded-lg text-white">
              <span className="text-2xl">▶️</span>
            </div>
          </div>
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-slate-800 hover:text-blue-600">
              {video.subtopic}
            </h3>
            {video.durationLabel && (
              <p className="text-sm text-slate-500 mt-1">⏱️ {video.durationLabel}</p>
            )}
            <p className="text-xs text-blue-600 mt-2">Search YouTube →</p>
          </div>
        </div>
      </a>
    </Card>
  )
}
