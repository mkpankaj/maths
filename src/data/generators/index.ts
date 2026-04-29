import { generateFractions } from './fractions'
import { generateFactorsMultiples } from './factors-multiples'
import { generateDecimalSystem } from './decimal-system'
import { generatePercentages } from './percentages'
import { generateNumbers } from './numbers'
import { generateShapesMeasurements } from './shapes-measurements'
import { Question, TopicId } from '../../types'

const generators: Record<TopicId, () => Question[]> = {
  'fractions': generateFractions,
  'factors-multiples': generateFactorsMultiples,
  'decimal-system': generateDecimalSystem,
  'percentages': generatePercentages,
  'numbers': generateNumbers,
  'shapes-measurements': generateShapesMeasurements,
}

export function generateQuestions(topicId: string): Question[] | null {
  const gen = generators[topicId as TopicId]
  return gen ? gen() : null
}
