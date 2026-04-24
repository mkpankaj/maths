import factorsMultiplesData from './factors-multiples.json'
import fractionsData from './fractions.json'
import decimalSystemData from './decimal-system.json'
import percentagesData from './percentages.json'
import numbersData from './numbers.json'
import shapesMeasurementsData from './shapes-measurements.json'
import { Question } from '../../types'

export const questionBanks: Record<string, Question[]> = {
  'factors-multiples': factorsMultiplesData as Question[],
  fractions: fractionsData as Question[],
  'decimal-system': decimalSystemData as Question[],
  percentages: percentagesData as Question[],
  numbers: numbersData as Question[],
  'shapes-measurements': shapesMeasurementsData as Question[],
}

export function getQuestionBank(topicId: string): Question[] | null {
  return questionBanks[topicId] || null
}
