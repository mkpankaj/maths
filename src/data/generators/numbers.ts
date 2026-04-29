import { Question } from '../../types'
import { randInt, shuffle, makeIdCounter, buildOptions } from './utils'

const SMALL_PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]
const COMPOSITES = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28, 30, 32, 33, 34, 35, 36, 38, 39, 40]

export function generateNumbers(): Question[] {
  const nextId = makeIdCounter('nm')
  const questions: Question[] = []

  // Even/Odd (10)
  for (let i = 0; i < 10; i++) {
    const difficulty = Math.random() > 0.7 ? (2 as const) : (1 as const)
    questions.push(makeEvenOddCheck(nextId(), difficulty))
  }

  // Prime or Composite (10)
  for (let i = 0; i < 10; i++) {
    questions.push(makePrimeOrComposite(nextId()))
  }

  // Order integers (10)
  for (let i = 0; i < 10; i++) {
    questions.push(makeOrderIntegers(nextId()))
  }

  // Integer arithmetic (10)
  for (let i = 0; i < 4; i++) {
    questions.push(makeIntegerArithmetic(nextId(), 1))
  }
  for (let i = 0; i < 4; i++) {
    questions.push(makeIntegerArithmetic(nextId(), 2))
  }
  for (let i = 0; i < 2; i++) {
    questions.push(makeIntegerArithmetic(nextId(), 3))
  }

  // Absolute value (10)
  for (let i = 0; i < 10; i++) {
    questions.push(makeAbsoluteValue(nextId()))
  }

  return shuffle(questions)
}

function makeEvenOddCheck(id: string, difficulty: 1 | 2): Question {
  let n: number
  if (difficulty === 1) {
    n = randInt(1, 99)
  } else {
    n = randInt(-50, -1)
  }

  const isEven = n % 2 === 0

  return {
    id,
    type: 'true-false',
    text: `Is ${n} an even number?`,
    hasLatex: false,
    options: ['True', 'False'],
    correctIndex: isEven ? 0 : 1,
    explanation: isEven ? `${n} is divisible by 2.` : `${n} is not divisible by 2.`,
    difficulty: 1,
  }
}

function makePrimeOrComposite(id: string): Question {
  const isPrime = Math.random() > 0.5
  const n = isPrime
    ? SMALL_PRIMES[Math.floor(Math.random() * SMALL_PRIMES.length)]
    : COMPOSITES[Math.floor(Math.random() * COMPOSITES.length)]

  const correct = isPrime ? 'Prime' : 'Composite'
  const options = shuffle(['Prime', 'Composite', 'Neither', 'Both'])
  const correctIndex = options.indexOf(correct)

  return {
    id,
    type: 'mcq',
    text: `Is ${n} prime or composite?`,
    hasLatex: false,
    options,
    correctIndex,
    explanation: isPrime ? `${n} is only divisible by 1 and itself.` : `${n} has factors other than 1 and itself.`,
    difficulty: 1,
  }
}

function makeOrderIntegers(id: string): Question {
  const nums = new Set<number>()
  while (nums.size < 4) {
    nums.add(randInt(-15, 15))
  }

  const arr = Array.from(nums)
  const sorted = [...arr].sort((a, b) => a - b)

  const options = shuffle([
    sorted.join(', '),
    [...arr].reverse().join(', '),
    [...arr].sort(() => Math.random() - 0.5).join(', '),
    [...arr].sort(() => Math.random() - 0.5).join(', '),
  ])

  const correctIndex = options.indexOf(sorted.join(', '))

  return {
    id,
    type: 'mcq',
    text: `Order these integers from smallest to largest: ${arr.join(', ')}`,
    hasLatex: false,
    options,
    correctIndex,
    explanation: `On the number line, the numbers in order are: ${sorted.join(', ')}`,
    difficulty: 1,
  }
}

function makeIntegerArithmetic(id: string, difficulty: 1 | 2 | 3): Question {
  let a: number, b: number, op: '+' | '-'

  if (difficulty === 1) {
    a = randInt(-12, 12)
    b = randInt(1, 12)
    op = Math.random() > 0.5 ? '+' : '-'
  } else if (difficulty === 2) {
    a = randInt(-12, 12)
    b = randInt(-12, 12)
    op = Math.random() > 0.5 ? '+' : '-'
  } else {
    a = randInt(-12, 12)
    b = randInt(1, 12)
    const useNegative = Math.random() > 0.5
    const expr = useNegative ? `${a} - (-${b})` : `${a} + (-${b})`
    const result = useNegative ? a + b : a - b
    const correct = String(result)
    const d1 = String(Math.abs(a + b))
    const d2 = String(-(a + b))
    const d3 = String(useNegative ? a - b : a + b)

    const { options, correctIndex } = buildOptions(correct, [d1, d2, d3])

    return {
      id,
      type: 'mcq',
      text: `What is ${expr}?`,
      hasLatex: false,
      options,
      correctIndex,
      explanation: `${expr} = ${result}`,
      difficulty,
    }
  }

  const result = op === '+' ? a + b : a - b
  const correct = String(result)
  const d1 = String(Math.abs(result))
  const d2 = String(-result)
  const d3 = String(op === '+' ? a - b : a + b)

  const { options, correctIndex } = buildOptions(correct, [d1, d2, d3])

  return {
    id,
    type: 'mcq',
    text: `What is ${a} ${op} ${b}?`,
    hasLatex: false,
    options,
    correctIndex,
    explanation: `${a} ${op} ${b} = ${result}`,
    difficulty,
  }
}

function makeAbsoluteValue(id: string): Question {
  const a = randInt(-20, 20)
  const b = randInt(-20, 20)
  let expr: string, result: number

  if (Math.random() > 0.5) {
    expr = `|${a}|`
    result = Math.abs(a)
  } else {
    expr = `|${a} - (${b})|`
    result = Math.abs(a - b)
  }

  const correct = String(result)
  const d1 = String(a - b)
  const d2 = String(-(result))
  const d3 = String(Math.abs(a) + Math.abs(b))

  const { options, correctIndex } = buildOptions(correct, [d1, d2, d3])

  return {
    id,
    type: 'mcq',
    text: `What is ${expr}?`,
    hasLatex: false,
    options,
    correctIndex,
    explanation: `The absolute value of ${a - b === a ? a : `(${a - b})`} is ${result}.`,
    difficulty: 1,
  }
}
