import { useCallback, useEffect, useState } from 'react'
import { set, get, keys } from 'idb-keyval'
import { TopicId, TopicProgress, QuizAttempt } from '../types'

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
          const migrated = migrateProgress(data)
          progressData[topicId] = migrated
        }
      }
    }

    setProgress(progressData)
  }, [])

  const migrateProgress = (data: any): TopicProgress => {
    if (data.quizHistory) {
      return data
    }
    const quizHistory: QuizAttempt[] = (data.recentScores ?? []).map((score: number, idx: number) => ({
      score,
      timestamp: data.lastPlayedAt ? data.lastPlayedAt - (idx * 1000) : 0,
      questionCount: 10,
    }))
    return {
      ...data,
      quizHistory,
    }
  }

  const saveProgress = useCallback(
    async (topicId: TopicId, score: number) => {
      const key = `${PROGRESS_PREFIX}${topicId}`
      const existing = (await get(key)) as TopicProgress | undefined

      const newAttempt: QuizAttempt = {
        score,
        timestamp: Date.now(),
        questionCount: 10,
      }

      const quizHistory = [newAttempt, ...(existing?.quizHistory ?? [])]

      const updated: TopicProgress = {
        topicId,
        bestScore: Math.max(existing?.bestScore ?? 0, score),
        attempts: (existing?.attempts ?? 0) + 1,
        lastPlayedAt: Date.now(),
        quizHistory,
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
    return progress[topicId] || { topicId, bestScore: 0, attempts: 0, lastPlayedAt: 0, quizHistory: [] }
  }, [progress])

  return {
    progress,
    saveProgress,
    getTopicProgress,
    loadAllProgress,
  }
}
