import { Question } from '../../types'
import { randInt, shuffle, makeIdCounter, buildOptions } from './utils'

const FRACTION_TO_DECIMAL: Record<string, number> = {
  '1/2': 0.5,
  '1/4': 0.25,
  '3/4': 0.75,
  '1/5': 0.2,
  '2/5': 0.4,
  '3/5': 0.6,
  '4/5': 0.8,
  '1/8': 0.125,
  '3/8': 0.375,
  '5/8': 0.625,
  '1/10': 0.1,
  '3/10': 0.3,
  '7/10': 0.7,
  '9/10': 0.9,
}

export function generateDecimalSystem(): Question[] {
  const nextId = makeIdCounter('ds')
  const questions: Question[] = []

  // Add/Subtract (15)
  for (let i = 0; i < 8; i++) {
    questions.push(makeDecimalAddSub(nextId(), '+', 1))
  }
  for (let i = 0; i < 5; i++) {
    questions.push(makeDecimalAddSub(nextId(), '+', 2))
  }
  for (let i = 0; i < 2; i++) {
    questions.push(makeDecimalAddSub(nextId(), '-', 2))
  }

  // Fraction to Decimal (10)
  for (let i = 0; i < 10; i++) {
    questions.push(makeFractionToDecimal(nextId()))
  }

  // Place value (10)
  for (let i = 0; i < 10; i++) {
    questions.push(makePlaceValue(nextId(), Math.random() > 0.6 ? 3 : 2))
  }

  // Rounding (10)
  for (let i = 0; i < 5; i++) {
    questions.push(makeDecimalRound(nextId(), 0))
  }
  for (let i = 0; i < 5; i++) {
    questions.push(makeDecimalRound(nextId(), 1))
  }

  // Decimal compare (5)
  for (let i = 0; i < 5; i++) {
    questions.push(makeDecimalCompare(nextId()))
  }

  return shuffle(questions)
}

function makeDecimalAddSub(id: string, op: '+' | '-', difficulty: 1 | 2): Question {
  let a: number, b: number

  if (difficulty === 1) {
    const tenths1 = randInt(1, 9)
    const tenths2 = randInt(1, 9)
    a = tenths1 / 10
    b = tenths2 / 10
  } else {
    const hundredths1 = randInt(10, 99)
    const hundredths2 = randInt(10, 99)
    a = hundredths1 / 100
    b = hundredths2 / 100
  }

  let result: number
  if (op === '+') {
    const aInt = Math.round(a * 100)
    const bInt = Math.round(b * 100)
    result = (aInt + bInt) / 100
  } else {
    const aInt = Math.round(a * 100)
    const bInt = Math.round(b * 100)
    result = (aInt - bInt) / 100
  }

  const correct = String(result)
  const d1 = String(Math.round((op === '+' ? a * b : a / b) * 100) / 100)
  const d2 = String(op === '+' ? a - b : a + b)
  const d3 = String(Math.round((Math.abs(a - b)) * 100) / 100)

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

function makeFractionToDecimal(id: string): Question {
  const entries = Object.entries(FRACTION_TO_DECIMAL)
  const [fraction, decimal] = entries[Math.floor(Math.random() * entries.length)]

  const correct = String(decimal)

  const otherDecimals = entries
    .filter((e) => e[0] !== fraction)
    .map((e) => e[1])
    .sort(() => Math.random() - 0.5)
    .slice(0, 2)

  const wrongValue = Math.random() > 0.5
    ? parseFloat((decimal + Math.random() * 0.1).toFixed(3))
    : parseFloat((decimal * 0.5).toFixed(3))

  const { options, correctIndex } = buildOptions(correct, [
    String(otherDecimals[0]),
    String(otherDecimals[1] || wrongValue),
    String(wrongValue),
  ])

  return {
    id,
    type: 'mcq',
    text: `Convert ${fraction} to a decimal.`,
    hasLatex: false,
    options,
    correctIndex,
    explanation: `${fraction} = ${decimal}`,
    difficulty: 1,
  }
}

function makePlaceValue(id: string, numDecimals: 2 | 3): Question {
  let numberStr: string
  let placeName: string

  if (numDecimals === 2) {
    const whole = randInt(0, 9)
    const tenths = randInt(1, 9)
    const hundredths = randInt(0, 9)
    numberStr = `${whole}.${tenths}${hundredths}`
    const names = ['Ones', 'Tenths', 'Hundredths']
    const placeIndex = Math.floor(Math.random() * 3)
    placeName = names[placeIndex]
  } else {
    const whole = randInt(1, 9)
    const tenths = randInt(1, 9)
    const hundredths = randInt(1, 9)
    const thousandths = randInt(1, 9)
    numberStr = `${whole}.${tenths}${hundredths}${thousandths}`
    const names = ['Ones', 'Tenths', 'Hundredths', 'Thousandths']
    const placeIndex = Math.floor(Math.random() * 4)
    placeName = names[placeIndex]
  }

  const correct = placeName
  const places = numDecimals === 2 ? ['Ones', 'Tenths', 'Hundredths', 'Thousandths'] : ['Ones', 'Tenths', 'Hundredths', 'Thousandths']
  const wrongs = places.filter((p) => p !== placeName).slice(0, 3)

  const { options, correctIndex } = buildOptions(correct, wrongs)

  return {
    id,
    type: 'mcq',
    text: `In the number ${numberStr}, what is the place value of the digit in position [${placeName}]?`,
    hasLatex: false,
    options,
    correctIndex,
    explanation: `The place values are: ones, tenths, hundredths, thousandths.`,
    difficulty: 1,
  }
}

function makeDecimalCompare(id: string): Question {
  const a = parseFloat((Math.random() * 10).toFixed(2))
  const b = parseFloat((Math.random() * 10).toFixed(2))

  const correct = a > b ? `${a}` : `${b}`
  const d1 = a < b ? `${a}` : `${b}`
  const d2 = 'They are equal'
  const d3 = String((a + b) / 2)

  const { options, correctIndex } = buildOptions(correct, [d1, d2, d3])

  return {
    id,
    type: 'mcq',
    text: `Which decimal is larger: ${a} or ${b}?`,
    hasLatex: false,
    options,
    correctIndex,
    explanation: `Comparing decimal place by place, ${correct} is larger.`,
    difficulty: 1,
  }
}

function makeDecimalRound(id: string, places: 0 | 1): Question {
  const num = parseFloat((Math.random() * 100).toFixed(2))

  const correct =
    places === 0
      ? String(Math.round(num))
      : String(Math.round(num * 10) / 10)

  const d1 = places === 0 ? String(Math.floor(num)) : String(Math.floor(num * 10) / 10)
  const d2 = places === 0 ? String(Math.ceil(num)) : String(Math.ceil(num * 10) / 10)
  const d3 = places === 0 ? String(Math.floor(num)) : String(Math.round(num * 100) / 100)

  const { options, correctIndex } = buildOptions(correct, [d1, d2, d3])

  const placeStr = places === 0 ? 'nearest whole number' : '1 decimal place'

  return {
    id,
    type: 'mcq',
    text: `Round ${num} to the ${placeStr}.`,
    hasLatex: false,
    options,
    correctIndex,
    explanation: `${num} rounded to ${placeStr} is ${correct}.`,
    difficulty: 1,
  }
}
