import { useCallback, useEffect, useState } from 'react'
import { set, get } from 'idb-keyval'
import { MentalMathsAttempt, MentalMathsProgress } from '../types'

const KEY = 'mental-maths-progress'

export function useMentalMathsProgress() {
  const [progress, setProgress] = useState<MentalMathsProgress>({ attempts: [] })

  useEffect(() => {
    loadProgress()
  }, [])

  const loadProgress = useCallback(async () => {
    const data = await get(KEY) as MentalMathsProgress | undefined
    if (data) setProgress(data)
  }, [])

  const saveAttempt = useCallback(async (attempt: MentalMathsAttempt) => {
    const data = (await get(KEY)) as MentalMathsProgress | undefined
    const updated: MentalMathsProgress = {
      attempts: [attempt, ...(data?.attempts ?? [])],
    }
    await set(KEY, updated)
    setProgress(updated)
  }, [])

  return { progress, loadProgress, saveAttempt }
}
