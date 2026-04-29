import { Question } from '../../types'
import { randInt, shuffle, gcd, lcm, makeIdCounter, buildOptions } from './utils'

const FACTOR_NUMBERS = [6, 8, 9, 10, 12, 15, 16, 18, 20, 24, 30, 36]
const SMALL_PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
const COMPOSITES = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28]

export function generateFactorsMultiples(): Question[] {
  const nextId = makeIdCounter('fm')
  const questions: Question[] = []

  // Factors list (10)
  for (let i = 0; i < 10; i++) {
    questions.push(makeFactorsQuestion(nextId()))
  }

  // GCF (10)
  for (let i = 0; i < 10; i++) {
    questions.push(makeGCFQuestion(nextId(), randInt(1, 3) as 1 | 2 | 3))
  }

  // LCM (10)
  for (let i = 0; i < 10; i++) {
    questions.push(makeLCMQuestion(nextId(), randInt(1, 3) as 1 | 2 | 3))
  }

  // Prime check (10)
  for (let i = 0; i < 10; i++) {
    questions.push(makePrimeCheck(nextId()))
  }

  // Multiple check (10)
  for (let i = 0; i < 10; i++) {
    questions.push(makeMultipleCheck(nextId()))
  }

  return shuffle(questions)
}

function makeFactorsQuestion(id: string): Question {
  const n = FACTOR_NUMBERS[Math.floor(Math.random() * FACTOR_NUMBERS.length)]
  const factors: number[] = []

  for (let i = 1; i <= n; i++) {
    if (n % i === 0) factors.push(i)
  }

  const correct = factors.join(', ')
  const difficulty: 1 | 2 | 3 = n <= 12 ? 1 : n <= 24 ? 2 : 3

  // Distractor 1: missing 1 and n
  const d1 = factors.slice(1, -1).join(', ')

  // Distractor 2: include a non-factor close to a real factor
  const realFactor = factors[Math.floor(factors.length / 2)]
  const nonFactor = realFactor + 1
  const factorsWithNonFactor = [...factors.slice(0, factors.length - 1), nonFactor].sort((a, b) => a - b).join(', ')
  const d2 = factorsWithNonFactor

  // Distractor 3: swap one factor with nearby value
  const swapIdx = Math.floor(Math.random() * factors.length)
  const swapped = [...factors]
  swapped[swapIdx] = swapped[swapIdx] + 1
  const d3 = swapped.join(', ')

  const { options, correctIndex } = buildOptions(correct, [d1, d2, d3])

  return {
    id,
    type: 'mcq',
    text: `List all factors of ${n}.`,
    hasLatex: false,
    options,
    correctIndex,
    explanation: `Factors are numbers that divide ${n} evenly. They are: ${correct}`,
    difficulty,
  }
}

function makeGCFQuestion(id: string, difficulty: 1 | 2 | 3): Question {
  let g, p, q
  if (difficulty === 1) {
    g = randInt(2, 6)
    p = randInt(2, 5)
    q = randInt(p + 1, 6)
  } else if (difficulty === 2) {
    g = randInt(3, 8)
    p = randInt(2, 6)
    q = randInt(p + 1, 7)
  } else {
    g = randInt(4, 10)
    p = randInt(2, 7)
    q = randInt(p + 1, 8)
  }

  while (gcd(p, q) !== 1) {
    q = randInt(p + 1, 8)
  }

  const a = p * g
  const b = q * g

  const correct = String(g)
  const d1 = String(g > 2 ? g / 2 : g)
  const d2 = String(g * 2)
  const d3 = String(a)

  const { options, correctIndex } = buildOptions(correct, [d1, d2, d3])

  const factorsA = []
  for (let i = 1; i <= a; i++) {
    if (a % i === 0) factorsA.push(i)
  }

  const factorsB = []
  for (let i = 1; i <= b; i++) {
    if (b % i === 0) factorsB.push(i)
  }

  return {
    id,
    type: 'mcq',
    text: `Find the GCF of ${a} and ${b}.`,
    hasLatex: false,
    options,
    correctIndex,
    explanation: `Factors of ${a}: ${factorsA.join(', ')}. Factors of ${b}: ${factorsB.join(', ')}. GCF = ${g}`,
    difficulty,
  }
}

function makeLCMQuestion(id: string, difficulty: 1 | 2 | 3): Question {
  let a, b
  if (difficulty === 1) {
    a = randInt(2, 6)
    b = randInt(2, 6)
  } else if (difficulty === 2) {
    a = randInt(4, 10)
    b = randInt(4, 10)
  } else {
    a = randInt(6, 12)
    b = randInt(6, 12)
  }

  const result = lcm(a, b)
  const correct = String(result)
  const d1 = String(a * b)
  const d2 = String(a + b)
  const d3 = String(gcd(a, b))

  const { options, correctIndex } = buildOptions(correct, [d1, d2, d3])

  return {
    id,
    type: 'mcq',
    text: `Find the LCM of ${a} and ${b}.`,
    hasLatex: false,
    options,
    correctIndex,
    explanation: `LCM is the smallest number divisible by both ${a} and ${b}. LCM(${a}, ${b}) = ${result}`,
    difficulty,
  }
}

function makePrimeCheck(id: string): Question {
  const isPrime = Math.random() > 0.5
  const n = isPrime
    ? SMALL_PRIMES[Math.floor(Math.random() * SMALL_PRIMES.length)]
    : COMPOSITES[Math.floor(Math.random() * COMPOSITES.length)]

  return {
    id,
    type: 'true-false',
    text: `Is ${n} a prime number?`,
    hasLatex: false,
    options: ['True', 'False'],
    correctIndex: isPrime ? 0 : 1,
    explanation: isPrime ? `${n} is only divisible by 1 and itself.` : `${n} is divisible by numbers other than 1 and itself.`,
    difficulty: 1,
  }
}

function makeMultipleCheck(id: string): Question {
  const divisor = randInt(2, 10)
  const multiplier = randInt(2, 12)
  const number = divisor * multiplier
  const isMultiple = Math.random() > 0.3

  const n = isMultiple ? number : number + randInt(1, divisor - 1)

  return {
    id,
    type: 'true-false',
    text: `Is ${n} a multiple of ${divisor}?`,
    hasLatex: false,
    options: ['True', 'False'],
    correctIndex: n % divisor === 0 ? 0 : 1,
    explanation: `${n % divisor === 0 ? `${n} ÷ ${divisor} = ${n / divisor}` : `${n} is not evenly divisible by ${divisor}`}`,
    difficulty: 1,
  }
}
