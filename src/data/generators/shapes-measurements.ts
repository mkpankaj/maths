import { Question } from '../../types'
import { randInt, shuffle, makeIdCounter, buildOptions } from './utils'
import { questionBanks } from '../questions/index'

export function generateShapesMeasurements(): Question[] {
  const nextId = makeIdCounter('sm')
  const algorithmic: Question[] = []

  // Rectangle area/perimeter (12)
  for (let i = 0; i < 6; i++) {
    algorithmic.push(makeRectangleArea(nextId()))
  }
  for (let i = 0; i < 6; i++) {
    algorithmic.push(makeRectanglePerimeter(nextId()))
  }

  // Square area/perimeter (8)
  for (let i = 0; i < 4; i++) {
    algorithmic.push(makeSquareArea(nextId()))
  }
  for (let i = 0; i < 4; i++) {
    algorithmic.push(makeSquarePerimeter(nextId()))
  }

  // Triangle area (10)
  for (let i = 0; i < 10; i++) {
    algorithmic.push(makeTriangleArea(nextId()))
  }

  // Circle area/circumference (10)
  for (let i = 0; i < 5; i++) {
    algorithmic.push(makeCircleArea(nextId()))
  }
  for (let i = 0; i < 5; i++) {
    algorithmic.push(makeCircleCircumference(nextId()))
  }

  // Box volume (5)
  for (let i = 0; i < 5; i++) {
    algorithmic.push(makeVolumeBox(nextId()))
  }

  // Merge with JSON diagram questions (fallback)
  const jsonBank = questionBanks['shapes-measurements'] || []
  const diagramQuestions = jsonBank.filter((q) => q.shapeKey !== undefined)

  const merged = [...algorithmic, ...diagramQuestions]
  return shuffle(merged).slice(0, 50)
}

function makeRectangleArea(id: string): Question {
  const l = randInt(2, 15)
  const w = randInt(2, 12)
  const area = l * w

  const correct = String(area)
  const d1 = String(2 * (l + w))
  const d2 = String(l + w)
  const d3 = String(l * w + 2)

  const { options, correctIndex } = buildOptions(correct, [d1, d2, d3])

  return {
    id,
    type: 'mcq',
    text: `A rectangle has length ${l} and width ${w}. What is its area?`,
    hasLatex: false,
    options,
    correctIndex,
    explanation: `Area = length × width = ${l} × ${w} = ${area} square units`,
    difficulty: 1,
  }
}

function makeRectanglePerimeter(id: string): Question {
  const l = randInt(2, 15)
  const w = randInt(2, 12)
  const perimeter = 2 * (l + w)

  const correct = String(perimeter)
  const d1 = String(l * w)
  const d2 = String(l + w)
  const d3 = String(2 * l + w)

  const { options, correctIndex } = buildOptions(correct, [d1, d2, d3])

  return {
    id,
    type: 'mcq',
    text: `A rectangle has length ${l} and width ${w}. What is its perimeter?`,
    hasLatex: false,
    options,
    correctIndex,
    explanation: `Perimeter = 2(length + width) = 2(${l} + ${w}) = ${perimeter} units`,
    difficulty: 1,
  }
}

function makeSquareArea(id: string): Question {
  const s = randInt(2, 15)
  const area = s * s

  const correct = String(area)
  const d1 = String(4 * s)
  const d2 = String(s * 2)
  const d3 = String(s + 4)

  const { options, correctIndex } = buildOptions(correct, [d1, d2, d3])

  return {
    id,
    type: 'mcq',
    text: `A square has side length ${s}. What is its area?`,
    hasLatex: false,
    options,
    correctIndex,
    explanation: `Area = side × side = ${s} × ${s} = ${area} square units`,
    difficulty: 1,
  }
}

function makeSquarePerimeter(id: string): Question {
  const s = randInt(2, 15)
  const perimeter = 4 * s

  const correct = String(perimeter)
  const d1 = String(s * s)
  const d2 = String(s * 2)
  const d3 = String(s * 3)

  const { options, correctIndex } = buildOptions(correct, [d1, d2, d3])

  return {
    id,
    type: 'mcq',
    text: `A square has side length ${s}. What is its perimeter?`,
    hasLatex: false,
    options,
    correctIndex,
    explanation: `Perimeter = 4 × side = 4 × ${s} = ${perimeter} units`,
    difficulty: 1,
  }
}

function makeTriangleArea(id: string): Question {
  let base = randInt(2, 20)
  let height = randInt(2, 15)

  while ((base * height) % 2 !== 0) {
    height = randInt(2, 15)
  }

  const area = (base * height) / 2

  const correct = String(area)
  const d1 = String(base * height)
  const d2 = String((base + height) / 2)
  const d3 = String((base * height) / 3)

  const { options, correctIndex } = buildOptions(correct, [d1, d2, d3])

  return {
    id,
    type: 'mcq',
    text: `A triangle has base ${base} and height ${height}. What is its area?`,
    hasLatex: false,
    options,
    correctIndex,
    explanation: `Area = (base × height) / 2 = (${base} × ${height}) / 2 = ${area} square units`,
    difficulty: 1,
  }
}

function makeCircleArea(id: string): Question {
  const r = randInt(1, 8)
  const area = Math.round(3.14 * r * r * 100) / 100

  const correct = String(area)
  const d1 = String(Math.round(3.14 * r * 100) / 100)
  const d2 = String(Math.round(3.14 * r * 2 * 100) / 100)
  const d3 = String(r * r)

  const { options, correctIndex } = buildOptions(correct, [d1, d2, d3])

  return {
    id,
    type: 'mcq',
    text: `A circle has radius ${r}. Using π ≈ 3.14, what is its area?`,
    hasLatex: false,
    options,
    correctIndex,
    explanation: `Area = π × r² ≈ 3.14 × ${r}² = ${area} square units`,
    difficulty: 1,
  }
}

function makeCircleCircumference(id: string): Question {
  const r = randInt(1, 8)
  const circumference = Math.round(2 * 3.14 * r * 100) / 100

  const correct = String(circumference)
  const d1 = String(Math.round(3.14 * r * r * 100) / 100)
  const d2 = String(Math.round(3.14 * r * 100) / 100)
  const d3 = String(2 * r)

  const { options, correctIndex } = buildOptions(correct, [d1, d2, d3])

  return {
    id,
    type: 'mcq',
    text: `A circle has radius ${r}. Using π ≈ 3.14, what is its circumference?`,
    hasLatex: false,
    options,
    correctIndex,
    explanation: `Circumference = 2 × π × r ≈ 2 × 3.14 × ${r} = ${circumference} units`,
    difficulty: 1,
  }
}

function makeVolumeBox(id: string): Question {
  const l = randInt(2, 12)
  const w = randInt(2, 10)
  const h = randInt(2, 10)
  const volume = l * w * h

  const correct = String(volume)
  const d1 = String(l + w + h)
  const d2 = String(2 * (l + w + h))
  const d3 = String(l * w)

  const { options, correctIndex } = buildOptions(correct, [d1, d2, d3])

  return {
    id,
    type: 'mcq',
    text: `A rectangular box has length ${l}, width ${w}, and height ${h}. What is its volume?`,
    hasLatex: false,
    options,
    correctIndex,
    explanation: `Volume = length × width × height = ${l} × ${w} × ${h} = ${volume} cubic units`,
    difficulty: 1,
  }
}
