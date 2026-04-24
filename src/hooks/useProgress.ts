import { useCallback, useEffect, useState } from 'react'
import { set, get, keys } from 'idb-keyval'
import { TopicId, TopicProgress } from '../types'

const PROGRESS_PREFIX = 'progress_'

export function useProgress() {
  const [progress, setProgress] = useState<Partial<Record<TopicId, TopicProgress>>>({})

  useEffect(() => {
    loadAllProgress()
  }, [])

  const loadAllProgress = useCallback(async () => {
    const allKeys = await keys()
    const progressData: Partial<Record<TopicId, TopicProgress>> = {}

    for (const key of allKeys) {
      if (typeof key === 'string' && key.startsWith(PROGRESS_PREFIX)) {
        const data = await get(key)
        if (data) {
          const topicId = key.replace(PROGRESS_PREFIX, '') as TopicId
          progressData[topicId] = data
        }
      }
    }

    setProgress(progressData)
  }, [])

  const saveProgress = useCallback(
    async (topicId: TopicId, score: number) => {
      const key = `${PROGRESS_PREFIX}${topicId}`
      const existing = (await get(key)) as TopicProgress | undefined

      const recentScores = [score, ...(existing?.recentScores ?? [])].slice(0, 5)

      const updated: TopicProgress = {
        topicId,
        bestScore: Math.max(existing?.bestScore ?? 0, score),
        attempts: (existing?.attempts ?? 0) + 1,
        lastPlayedAt: Date.now(),
        recentScores,
      }

      await set(key, updated)
      setProgress((prev) => ({
        ...prev,
        [topicId]: updated,
      }))
    },
    [],
  )

  const getTopicProgress = useCallback((topicId: TopicId) => {
    return progress[topicId] || { topicId, bestScore: 0, attempts: 0, lastPlayedAt: 0 }
  }, [progress])

  return {
    progress,
    saveProgress,
    getTopicProgress,
    loadAllProgress,
  }
}
