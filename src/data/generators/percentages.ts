import { Question } from '../../types'
import { randInt, shuffle, gcd, makeIdCounter, buildOptions } from './utils'

const NICE_PERCENTS = [5, 10, 15, 20, 25, 30, 40, 50, 60, 75, 80]

export function generatePercentages(): Question[] {
  const nextId = makeIdCounter('pc')
  const questions: Question[] = []

  // Percent of number (15)
  for (let i = 0; i < 8; i++) {
    questions.push(makePercentOfNumber(nextId(), 1))
  }
  for (let i = 0; i < 5; i++) {
    questions.push(makePercentOfNumber(nextId(), 2))
  }
  for (let i = 0; i < 2; i++) {
    questions.push(makePercentOfNumber(nextId(), 3))
  }

  // What percent (10)
  for (let i = 0; i < 10; i++) {
    questions.push(makeWhatPercent(nextId(), randInt(1, 3) as 1 | 2 | 3))
  }

  // Fraction to percent (10)
  for (let i = 0; i < 10; i++) {
    questions.push(makeFractionToPercent(nextId()))
  }

  // Percent to decimal (10)
  for (let i = 0; i < 10; i++) {
    questions.push(makePercentToDecimal(nextId()))
  }

  // Word problems (5)
  for (let i = 0; i < 5; i++) {
    questions.push(makeWordProblem(nextId(), randInt(2, 3) as 2 | 3))
  }

  return shuffle(questions)
}

function makePercentOfNumber(id: string, difficulty: 1 | 2 | 3): Question {
  const p = NICE_PERCENTS[Math.floor(Math.random() * NICE_PERCENTS.length)]
  let n: number

  const g = gcd(p, 100)
  const step = 100 / g
  n = randInt(2, 10) * step

  if (difficulty === 2) n = Math.min(n * 2, 300)
  if (difficulty === 3) n = Math.min(n * 3, 500)

  const result = (p * n) / 100

  const correct = String(result)
  const d1 = String(n / p)
  const d2 = String(n * p)
  const d3 = String((p * n) / 10)

  const { options, correctIndex } = buildOptions(correct, [d1, d2, d3])

  return {
    id,
    type: 'mcq',
    text: `What is ${p}% of ${n}?`,
    hasLatex: false,
    options,
    correctIndex,
    explanation: `${p}% of ${n} = (${p}/100) × ${n} = ${result}`,
    difficulty,
  }
}

function makeWhatPercent(id: string, difficulty: 1 | 2 | 3): Question {
  const pct = [10, 20, 25, 40, 50, 75][Math.floor(Math.random() * 6)]
  let total: number

  if (difficulty === 1) {
    total = randInt(20, 50) * 2
  } else if (difficulty === 2) {
    total = randInt(30, 100) * 2
  } else {
    total = randInt(50, 150) * 2
  }

  const part = (pct * total) / 100

  const correct = String(pct)
  const d1 = String(100 - pct)
  const d2 = String(pct / 10)
  const d3 = String(total / part)

  const { options, correctIndex } = buildOptions(correct, [d1, d2, d3])

  return {
    id,
    type: 'mcq',
    text: `${part} is what percent of ${total}?`,
    hasLatex: false,
    options,
    correctIndex,
    explanation: `${part} / ${total} = ${pct / 100} = ${pct}%`,
    difficulty,
  }
}

function makeFractionToPercent(id: string): Question {
  const fractions: Record<string, number> = {
    '1/4': 25,
    '1/2': 50,
    '3/4': 75,
    '1/5': 20,
    '2/5': 40,
    '3/5': 60,
    '4/5': 80,
    '1/10': 10,
    '1/3': 33,
    '2/3': 67,
  }

  const entries = Object.entries(fractions)
  const [fraction, percent] = entries[Math.floor(Math.random() * entries.length)]

  const correct = String(percent)
  const otherPercents = Object.values(fractions)
    .filter((p) => p !== percent)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)

  const { options, correctIndex } = buildOptions(correct, otherPercents.map(String))

  return {
    id,
    type: 'mcq',
    text: `Convert ${fraction} to a percentage.`,
    hasLatex: false,
    options,
    correctIndex,
    explanation: `${fraction} = ${percent / 100} = ${percent}%`,
    difficulty: 1,
  }
}

function makePercentToDecimal(id: string): Question {
  const pct = NICE_PERCENTS[Math.floor(Math.random() * NICE_PERCENTS.length)]
  const decimal = pct / 100

  const correct = String(decimal)
  const d1 = String(pct / 10)
  const d2 = String(pct)
  const d3 = String(decimal * 10)

  const { options, correctIndex } = buildOptions(correct, [d1, d2, d3])

  return {
    id,
    type: 'mcq',
    text: `Convert ${pct}% to a decimal.`,
    hasLatex: false,
    options,
    correctIndex,
    explanation: `${pct}% = ${pct}/100 = ${decimal}`,
    difficulty: 1,
  }
}

function makeWordProblem(id: string, difficulty: 2 | 3): Question {
  const prices = [20, 30, 40, 50, 60, 75, 80, 100, 120, 150, 200]
  const percents = [10, 15, 20, 25, 30, 40, 50]

  const price = prices[Math.floor(Math.random() * prices.length)]
  const pct = percents[Math.floor(Math.random() * percents.length)]

  const isDiscount = Math.random() > 0.5
  const resultValue = isDiscount ? price - (pct * price) / 100 : price + (pct * price) / 100

  const question = isDiscount
    ? `A shirt costs $${price}. It is ${pct}% off. What is the sale price?`
    : `A book costs $${price}. The price increases by ${pct}%. What is the new price?`

  const correct = String(resultValue)
  const d1 = String(isDiscount ? price - pct : price + pct)
  const d2 = String(price * pct)
  const d3 = String(isDiscount ? price + (pct * price) / 100 : price - (pct * price) / 100)

  const { options, correctIndex } = buildOptions(correct, [d1, d2, d3])

  return {
    id,
    type: 'mcq',
    text: question,
    hasLatex: false,
    options,
    correctIndex,
    explanation: `${isDiscount ? 'Discount' : 'Increase'} = ${pct}% of $${price} = $${(pct * price) / 100}. New price = $${resultValue}`,
    difficulty,
  }
}
