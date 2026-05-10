import { useState, useEffect, useRef } from 'react'

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

export function useCountdown(seconds: number, questionIndex: number, onExpire: () => void) {
  const [remaining, setRemaining] = useState(seconds)
  const onExpireRef = useRef(onExpire)
  onExpireRef.current = onExpire

  useEffect(() => {
    setRemaining(seconds)
    const startedAt = Date.now()

    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAt) / 1000)
      const left = seconds - elapsed

      if (left <= 0) {
        clearInterval(interval)
        setRemaining(0)
        onExpireRef.current()
      } else {
        setRemaining(left)
      }
    }, 250)

    return () => clearInterval(interval)
  }, [questionIndex, seconds])

  return remaining
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
