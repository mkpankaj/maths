import { Question } from '../../types'
import {
  randInt,
  shuffle,
  gcd,
  lcm,
  reduceFraction,
  latexFrac,
  inlineMath,
  makeIdCounter,
  buildOptions,
} from './utils'

export function generateFractions(): Question[] {
  const nextId = makeIdCounter('fr')
  const questions: Question[] = []

  // Addition (15)
  for (let i = 0; i < 15; i++) {
    questions.push(makeAddFractions(nextId(), randInt(1, 3) as 1 | 2 | 3))
  }

  // Subtraction (10)
  for (let i = 0; i < 10; i++) {
    questions.push(makeSubtractFractions(nextId(), randInt(1, 3) as 1 | 2 | 3))
  }

  // Comparison (10)
  for (let i = 0; i < 10; i++) {
    questions.push(makeCompareFractions(nextId(), randInt(1, 3) as 1 | 2 | 3))
  }

  // Simplification (10)
  for (let i = 0; i < 10; i++) {
    questions.push(makeSimplifyFraction(nextId(), randInt(1, 3) as 1 | 2 | 3))
  }

  // Mixed to Improper (5)
  for (let i = 0; i < 5; i++) {
    questions.push(makeMixedToImproper(nextId(), randInt(2, 3) as 2 | 3))
  }

  return shuffle(questions)
}

function makeAddFractions(id: string, difficulty: 1 | 2 | 3): Question {
  let a, b, c, d
  if (difficulty === 1) {
    a = randInt(1, 10)
    b = randInt(a + 1, 16)
    c = randInt(1, 10)
    d = randInt(c + 1, 16)
  } else if (difficulty === 2) {
    a = randInt(1, 15)
    b = randInt(a + 1, 20)
    c = randInt(1, 15)
    d = randInt(c + 1, 20)
  } else {
    a = randInt(1, 20)
    b = randInt(a + 1, 24)
    c = randInt(1, 20)
    d = randInt(c + 1, 24)
  }

  const lcd = lcm(b, d)
  const resultNum = a * (lcd / b) + c * (lcd / d)
  const [rn, rd] = reduceFraction(resultNum, lcd)

  const correct = `${inlineMath(latexFrac(rn, rd))}`

  // Distractors
  const d1 = `${inlineMath(latexFrac(a + c, b + d))}`
  const d2 = `${inlineMath(latexFrac(a + c, lcd))}`
  const d3 = `${inlineMath(latexFrac(a * d + c * b, b))}`

  const { options, correctIndex } = buildOptions(correct, [d1, d2, d3])

  return {
    id,
    type: 'mcq',
    text: `What is ${inlineMath(latexFrac(a, b))} + ${inlineMath(latexFrac(c, d))}?`,
    hasLatex: true,
    options,
    correctIndex,
    explanation: `Find LCD of ${b} and ${d} = ${lcd}. Then (${a}×${lcd / b})/(${lcd}) + (${c}×${lcd / d})/(${lcd}) = ${resultNum}/${lcd} = ${rn}/${rd}`,
    difficulty,
  }
}

function makeSubtractFractions(id: string, difficulty: 1 | 2 | 3): Question {
  let a, b, c, d
  if (difficulty === 1) {
    a = randInt(5, 14)
    b = randInt(a + 1, 16)
    c = randInt(1, a - 1)
    d = randInt(c + 1, 16)
  } else if (difficulty === 2) {
    a = randInt(8, 18)
    b = randInt(a + 1, 20)
    c = randInt(1, a - 1)
    d = randInt(c + 1, 20)
  } else {
    a = randInt(10, 23)
    b = randInt(a + 1, 24)
    c = randInt(1, a - 1)
    d = randInt(c + 1, 24)
  }

  const lcd = lcm(b, d)
  const resultNum = a * (lcd / b) - c * (lcd / d)
  const [rn, rd] = reduceFraction(resultNum, lcd)

  const correct = `${inlineMath(latexFrac(rn, rd))}`

  const d1 = `${inlineMath(latexFrac(a - c, b - d === 0 ? b : b - d))}`
  const d2 = `${inlineMath(latexFrac(a - c, lcd))}`
  const d3 = `${inlineMath(latexFrac(a + c, lcd))}`

  const { options, correctIndex } = buildOptions(correct, [d1, d2, d3])

  return {
    id,
    type: 'mcq',
    text: `What is ${inlineMath(latexFrac(a, b))} − ${inlineMath(latexFrac(c, d))}?`,
    hasLatex: true,
    options,
    correctIndex,
    explanation: `Find LCD of ${b} and ${d} = ${lcd}. Then (${a}×${lcd / b})/(${lcd}) - (${c}×${lcd / d})/(${lcd}) = ${resultNum}/${lcd} = ${rn}/${rd}`,
    difficulty,
  }
}

function makeCompareFractions(id: string, difficulty: 1 | 2 | 3): Question {
  let a, b, c, d
  if (difficulty === 1) {
    a = randInt(1, 8)
    b = randInt(a + 1, 12)
    c = randInt(1, 8)
    d = randInt(c + 1, 12)
  } else if (difficulty === 2) {
    a = randInt(1, 12)
    b = randInt(a + 1, 18)
    c = randInt(1, 12)
    d = randInt(c + 1, 18)
  } else {
    a = randInt(1, 20)
    b = randInt(a + 1, 24)
    c = randInt(1, 20)
    d = randInt(c + 1, 24)
  }

  const isLarger = a * d > c * b

  const frac1 = `${inlineMath(latexFrac(a, b))}`
  const frac2 = `${inlineMath(latexFrac(c, d))}`
  const equal = 'They are equal'
  const distractor = `${inlineMath(latexFrac(a + c, b + d))}`

  const options = shuffle([frac1, frac2, equal, distractor])
  const correctIndex = options.indexOf(isLarger ? frac1 : frac2)

  return {
    id,
    type: 'mcq',
    text: `Which fraction is larger: ${frac1} or ${frac2}?`,
    hasLatex: true,
    options,
    correctIndex,
    explanation: `Compare ${a} × ${d} = ${a * d} with ${c} × ${b} = ${c * b}. ${isLarger ? frac1 : frac2} is larger.`,
    difficulty,
  }
}

function makeSimplifyFraction(id: string, difficulty: 1 | 2 | 3): Question {
  let g
  if (difficulty === 1) {
    g = randInt(2, 3)
  } else if (difficulty === 2) {
    g = randInt(2, 4)
  } else {
    g = randInt(2, 6)
  }

  let p = randInt(2, 8)
  let q = randInt(p + 1, 12)

  while (gcd(p, q) !== 1) {
    p = randInt(2, 8)
    q = randInt(p + 1, 12)
  }

  const a = p * g
  const b = q * g

  const correct = `${inlineMath(latexFrac(p, q))}`
  const d1 = `${inlineMath(latexFrac(a - 1, b - 1))}`
  const d2 = `${inlineMath(latexFrac(a / 2, b / 2))}`
  const d3 = `${inlineMath(latexFrac(p + 1, q))}`

  const { options, correctIndex } = buildOptions(correct, [d1, d2, d3])

  return {
    id,
    type: 'mcq',
    text: `Simplify ${inlineMath(latexFrac(a, b))}.`,
    hasLatex: true,
    options,
    correctIndex,
    explanation: `GCD of ${a} and ${b} is ${g}. Divide both by ${g}: ${p}/${q}.`,
    difficulty,
  }
}

function makeMixedToImproper(id: string, difficulty: 2 | 3): Question {
  const w = randInt(1, 5)
  const b = randInt(2, 12)
  const n = randInt(1, b - 1)

  const resultNum = w * b + n

  const correct = `${inlineMath(latexFrac(resultNum, b))}`
  const d1 = `${inlineMath(latexFrac(w + n, b))}`
  const d2 = `${inlineMath(latexFrac(w * n, b))}`
  const d3 = `${inlineMath(latexFrac(w * b, n))}`

  const { options, correctIndex } = buildOptions(correct, [d1, d2, d3])

  return {
    id,
    type: 'mcq',
    text: `Convert ${w} ${inlineMath(latexFrac(n, b))} to an improper fraction.`,
    hasLatex: true,
    options,
    correctIndex,
    explanation: `${w} and ${n}/${b} = (${w}×${b}+${n})/${b} = ${resultNum}/${b}.`,
    difficulty,
  }
}
