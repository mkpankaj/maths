import { Question } from '../../types'
import { randInt, shuffle, buildOptions, latexFrac, inlineMath, primesUpTo, gcd } from './utils'

const PRIMES_TO_100 = primesUpTo(100)
const COMPOSITES_TO_100 = Array.from({ length: 99 }, (_, i) => i + 2).filter(
  (n) => !PRIMES_TO_100.includes(n)
)

type SubtopicGenerator = () => Question

function makeId(): () => string {
  let n = 0
  return () => `mm-${Date.now()}-${++n}`
}

const nextId = makeId()

// ── 1. Addition of up to three numbers (a,b,c < 20) ─────────────────────────
function makeAddition(): Question {
  const useThree = Math.random() > 0.4
  const a = randInt(1, 19)
  const b = randInt(1, 19)
  const c = useThree ? randInt(1, 19) : 0
  const result = a + b + c
  const text = useThree ? `What is ${a} + ${b} + ${c}?` : `What is ${a} + ${b}?`
  const wrongs = [result + 1, result - 1, result + randInt(2, 5)].map(String)
  const { options, correctIndex } = buildOptions(String(result), wrongs)
  return {
    id: nextId(),
    type: 'mcq',
    text,
    hasLatex: false,
    options,
    correctIndex,
    explanation: useThree
      ? `${a} + ${b} + ${c} = ${result}`
      : `${a} + ${b} = ${result}`,
    difficulty: 1,
  }
}

// ── 2. Subtraction (a,b < 50) ────────────────────────────────────────────────
function makeSubtraction(): Question {
  const a = randInt(1, 49)
  const b = randInt(1, a)  // ensure non-negative result
  const result = a - b
  const wrongs = [result + 1, result - 1, a + b].map(String)
  const { options, correctIndex } = buildOptions(String(result), wrongs)
  return {
    id: nextId(),
    type: 'mcq',
    text: `What is ${a} − ${b}?`,
    hasLatex: false,
    options,
    correctIndex,
    explanation: `${a} − ${b} = ${result}`,
    difficulty: 1,
  }
}

// ── 3. Multiplication (a,b < 20) ─────────────────────────────────────────────
function makeMultiplication(): Question {
  const a = randInt(2, 19)
  const b = randInt(2, 19)
  const result = a * b
  const wrongs = [result + a, result - b, result + b].map(String)
  const { options, correctIndex } = buildOptions(String(result), wrongs)
  return {
    id: nextId(),
    type: 'mcq',
    text: `What is ${a} × ${b}?`,
    hasLatex: false,
    options,
    correctIndex,
    explanation: `${a} × ${b} = ${result}`,
    difficulty: 1,
  }
}

// ── 4. Division (a < 300, b < 20, exact) ─────────────────────────────────────
function makeDivision(): Question {
  const b = randInt(2, 19)
  const quotient = randInt(2, Math.floor(299 / b))
  const a = b * quotient
  const wrongs = [quotient + 1, quotient - 1, quotient + 2].map(String)
  const { options, correctIndex } = buildOptions(String(quotient), wrongs)
  return {
    id: nextId(),
    type: 'mcq',
    text: `What is ${a} ÷ ${b}?`,
    hasLatex: false,
    options,
    correctIndex,
    explanation: `${a} ÷ ${b} = ${quotient}`,
    difficulty: 1,
  }
}

// ── 5. Divisibility test (number up to 300) ───────────────────────────────────
const DIVISORS = [2, 3, 4, 5, 6, 8, 9, 10, 11]

function makeDivisibility(): Question {
  const divisor = DIVISORS[randInt(0, DIVISORS.length - 1)]
  const isDivisible = Math.random() > 0.5
  let n: number
  if (isDivisible) {
    const mult = randInt(2, Math.floor(300 / divisor))
    n = mult * divisor
  } else {
    do { n = randInt(10, 300) } while (n % divisor === 0)
  }
  const correct = isDivisible ? 'Yes' : 'No'
  const options = ['Yes', 'No', 'Sometimes', 'Cannot be determined']
  const shuffled = shuffle(options)
  const correctIndex = shuffled.indexOf(correct)
  return {
    id: nextId(),
    type: 'mcq',
    text: `Is ${n} divisible by ${divisor}?`,
    hasLatex: false,
    options: shuffled,
    correctIndex,
    explanation: isDivisible
      ? `${n} ÷ ${divisor} = ${n / divisor}, so yes, it is divisible by ${divisor}.`
      : `${n} ÷ ${divisor} = ${Math.floor(n / divisor)} remainder ${n % divisor}, so it is not divisible by ${divisor}.`,
    difficulty: 1,
  }
}

// ── 6. Even, Odd, Prime (up to 100) ──────────────────────────────────────────
function makeEvenOddPrime(): Question {
  const type = randInt(0, 2)

  if (type === 0) {
    // Is it even?
    const n = randInt(2, 100)
    const isEven = n % 2 === 0
    const correct = isEven ? 'Even' : 'Odd'
    const { options, correctIndex } = buildOptions(correct, ['Odd', 'Even', 'Prime', 'Composite'])
    return {
      id: nextId(),
      type: 'mcq',
      text: `Is ${n} even or odd?`,
      hasLatex: false,
      options,
      correctIndex,
      explanation: isEven ? `${n} is divisible by 2, so it is even.` : `${n} is not divisible by 2, so it is odd.`,
      difficulty: 1,
    }
  } else if (type === 1) {
    // Is it prime?
    const isPrime = Math.random() > 0.5
    const n = isPrime
      ? PRIMES_TO_100[randInt(0, PRIMES_TO_100.length - 1)]
      : COMPOSITES_TO_100[randInt(0, COMPOSITES_TO_100.length - 1)]
    const correct = isPrime ? 'Prime' : 'Composite'
    const { options, correctIndex } = buildOptions(correct, ['Prime', 'Composite', 'Neither', 'Both'])
    return {
      id: nextId(),
      type: 'mcq',
      text: `Is ${n} prime or composite?`,
      hasLatex: false,
      options,
      correctIndex,
      explanation: isPrime
        ? `${n} has exactly two factors: 1 and itself.`
        : `${n} has factors other than 1 and itself.`,
      difficulty: 1,
    }
  } else {
    // Which of these is prime?
    const prime = PRIMES_TO_100[randInt(0, PRIMES_TO_100.length - 1)]
    const wrongs = shuffle(COMPOSITES_TO_100)
      .filter((n) => n !== prime)
      .slice(0, 3)
      .map(String)
    const { options, correctIndex } = buildOptions(String(prime), wrongs)
    return {
      id: nextId(),
      type: 'mcq',
      text: `Which of these numbers is prime?`,
      hasLatex: false,
      options,
      correctIndex,
      explanation: `${prime} has exactly two factors: 1 and ${prime}.`,
      difficulty: 1,
    }
  }
}

// ── 7. Addition/Subtraction of like fractions (num,den < 20) ─────────────────
function makeLikeFractions(): Question {
  const den = randInt(3, 19)
  const maxNum = den - 1
  const a = randInt(1, maxNum)
  const b = randInt(1, maxNum)
  const isAdd = Math.random() > 0.5

  const rawNum = isAdd ? a + b : Math.abs(a - b)
  const g = gcd(rawNum, den)
  const rNum = rawNum / g
  const rDen = den / g

  const correctStr = rDen === 1 ? String(rNum) : inlineMath(latexFrac(rNum, rDen))

  // Build wrong answers
  const w1Num = rawNum + 1
  const w1 = gcd(w1Num, den) === den ? String(w1Num / den) : inlineMath(latexFrac(w1Num, den))
  const w2 = inlineMath(latexFrac(a + b, den * 2))  // common mistake: add denominators
  const w3Num = isAdd ? a - b : a + b
  const w3 = w3Num <= 0 ? inlineMath(latexFrac(1, den)) : inlineMath(latexFrac(Math.abs(w3Num), den))

  const { options, correctIndex } = buildOptions(correctStr, [w1, w2, w3])

  const op = isAdd ? '+' : '−'
  const text = `$${latexFrac(a, den)} ${op} ${latexFrac(b, den)}$ = ?`

  return {
    id: nextId(),
    type: 'mcq',
    text,
    hasLatex: true,
    options,
    correctIndex,
    explanation: isAdd
      ? `Add the numerators and keep the denominator: (${a}+${b})/${den} = ${rawNum}/${den}${g > 1 ? ` = ${rNum}/${rDen}` : ''}`
      : `Subtract the numerators and keep the denominator: |${a}−${b}|/${den} = ${rawNum}/${den}${g > 1 ? ` = ${rNum}/${rDen}` : ''}`,
    difficulty: 1,
  }
}

// ── 8. Comparison of fractions (num,den < 15) ────────────────────────────────
function makeFractionComparison(): Question {
  let a: number, b: number, c: number, d: number
  do {
    a = randInt(1, 14)
    b = randInt(2, 14)
    c = randInt(1, 14)
    d = randInt(2, 14)
  } while (b === d || a === c || a * d === b * c)  // avoid equal fractions or same denominator

  const f1Str = inlineMath(latexFrac(a, b))
  const f2Str = inlineMath(latexFrac(c, d))

  const isF1Greater = a * d > b * c
  const correct = isF1Greater ? f1Str : f2Str
  const { options, correctIndex } = buildOptions(correct, [f1Str, f2Str, 'They are equal', 'Cannot be determined'])

  return {
    id: nextId(),
    type: 'mcq',
    text: `Which fraction is greater: ${f1Str} or ${f2Str}?`,
    hasLatex: true,
    options,
    correctIndex,
    explanation: `Cross-multiply: ${a}×${d}=${a * d} vs ${b}×${c}=${b * c}. So ${isF1Greater ? f1Str : f2Str} is greater.`,
    difficulty: 2,
  }
}

// ── 9. Perimeter (sides < 20) ─────────────────────────────────────────────────
function makePerimeter(): Question {
  const shape = randInt(0, 2)

  if (shape === 0) {
    const s = randInt(2, 19)
    const result = 4 * s
    const wrongs = [result + 4, result - 4, 4 * s + s].map(String)
    const { options, correctIndex } = buildOptions(String(result), wrongs)
    return {
      id: nextId(),
      type: 'mcq',
      text: `What is the perimeter of a square with side ${s}?`,
      hasLatex: false,
      options,
      correctIndex,
      explanation: `Perimeter of square = 4 × side = 4 × ${s} = ${result}`,
      difficulty: 1,
    }
  } else if (shape === 1) {
    const l = randInt(2, 19)
    const w = randInt(2, 19)
    const result = 2 * (l + w)
    const wrongs = [l * w, 2 * l + w, l + 2 * w].map(String)
    const { options, correctIndex } = buildOptions(String(result), wrongs)
    return {
      id: nextId(),
      type: 'mcq',
      text: `What is the perimeter of a rectangle with length ${l} and width ${w}?`,
      hasLatex: false,
      options,
      correctIndex,
      explanation: `Perimeter = 2 × (length + width) = 2 × (${l} + ${w}) = ${result}`,
      difficulty: 1,
    }
  } else {
    const a = randInt(2, 19)
    const b = randInt(2, 19)
    const c = randInt(2, 19)
    const result = a + b + c
    const wrongs = [result + 1, result - 1, result + randInt(2, 4)].map(String)
    const { options, correctIndex } = buildOptions(String(result), wrongs)
    return {
      id: nextId(),
      type: 'mcq',
      text: `What is the perimeter of a triangle with sides ${a}, ${b}, and ${c}?`,
      hasLatex: false,
      options,
      correctIndex,
      explanation: `Perimeter = sum of all sides = ${a} + ${b} + ${c} = ${result}`,
      difficulty: 1,
    }
  }
}

// ── Main export ───────────────────────────────────────────────────────────────
const GENERATORS: SubtopicGenerator[] = [
  makeAddition,
  makeSubtraction,
  makeMultiplication,
  makeDivision,
  makeDivisibility,
  makeEvenOddPrime,
  makeLikeFractions,
  makeFractionComparison,
  makePerimeter,
]

export function generateMentalMathsQuestions(): Question[] {
  const pool = shuffle([...GENERATORS])
  const questions: Question[] = []
  for (let i = 0; i < 10; i++) {
    const gen = pool[i % pool.length]
    questions.push(gen())
  }
  return questions
}
