export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function shuffle<T>(arr: T[]): T[] {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b)
}

export function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b)
}

export function reduceFraction(num: number, den: number): [number, number] {
  const g = gcd(Math.abs(num), Math.abs(den))
  return [num / g, den / g]
}

export function latexFrac(num: number, den: number): string {
  return `\\frac{${num}}{${den}}`
}

export function inlineMath(expr: string): string {
  return `$${expr}$`
}

export function makeIdCounter(prefix: string): () => string {
  let count = 0
  return () => {
    count++
    return `gen-${prefix}-${String(count).padStart(3, '0')}`
  }
}

export function buildOptions(
  correct: string,
  wrongs: string[]
): { options: string[]; correctIndex: number } {
  const unique = Array.from(new Set([correct, ...wrongs.slice(0, 3)]))
  const pool = unique.slice(0, 4)

  // Pad to 4 options if dedup reduced count
  while (pool.length < 4) {
    const placeholder = `Option ${pool.length + 1}`
    pool.push(placeholder)
  }

  const shuffled = shuffle(pool)
  const correctIndex = shuffled.indexOf(correct)

  return {
    options: shuffled,
    correctIndex,
  }
}

export function pickUnique<T>(
  pool: T[],
  count: number,
  key: (t: T) => string
): T[] {
  const seen = new Set<string>()
  const result: T[] = []

  const shuffled = shuffle(pool)

  for (const item of shuffled) {
    if (result.length >= count) break
    const k = key(item)
    if (!seen.has(k)) {
      seen.add(k)
      result.push(item)
    }
  }

  return result
}

export function primesUpTo(n: number): number[] {
  if (n < 2) return []
  const sieve = Array(n + 1).fill(true)
  sieve[0] = false
  sieve[1] = false

  for (let i = 2; i * i <= n; i++) {
    if (sieve[i]) {
      for (let j = i * i; j <= n; j += i) {
        sieve[j] = false
      }
    }
  }

  return sieve.reduce((acc, isPrime, num) => {
    if (isPrime) acc.push(num)
    return acc
  }, [] as number[])
}

export function areCoprime(a: number, b: number): boolean {
  return gcd(a, b) === 1
}

export function findCoprimePair(max: number): [number, number] {
  let p = randInt(2, max)
  let q = randInt(2, max)
  while (!areCoprime(p, q) || p === q) {
    p = randInt(2, max)
    q = randInt(2, max)
  }
  return [p, q]
}
