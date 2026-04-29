import { useState, useEffect } from 'react'

export function useTimer(startTime: number) {
  const [elapsed, setElapsed] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      setElapsed(now - startTime)
    }, 100)

    return () => clearInterval(interval)
  }, [startTime])

  return elapsed
}

export function formatTime(milliseconds: number): string {
  const totalSeconds = Math.floor(milliseconds / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  if (minutes === 0) {
    return `${seconds}s`
  }
  return `${minutes}m ${seconds}s`
}
