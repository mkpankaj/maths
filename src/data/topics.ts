import { Topic } from '../types'

export const TOPICS: Record<string, Topic> = {
  'factors-multiples': {
    id: 'factors-multiples',
    label: 'Factors & Multiples',
    icon: '✖️',
    color: 'from-purple-400 to-purple-600',
    videos: [
      {
        subtopic: 'Factors and Prime Factorization',
        url: 'https://www.youtube.com',
        durationLabel: '8 min',
      },
      {
        subtopic: 'Multiples and Common Multiples',
        url: 'https://www.youtube.com',
        durationLabel: '6 min',
      },
      {
        subtopic: 'HCF - Highest Common Factor',
        url: 'https://www.youtube.com',
        durationLabel: '10 min',
      },
      {
        subtopic: 'LCM - Least Common Multiple',
        url: 'https://www.youtube.com',
        durationLabel: '9 min',
      },
    ],
  },

  fractions: {
    id: 'fractions',
    label: 'Fractions & Operations',
    icon: '🍰',
    color: 'from-orange-400 to-orange-600',
    videos: [
      {
        subtopic: 'Fraction Basics and Simplification',
        url: 'https://www.youtube.com',
        durationLabel: '7 min',
      },
      {
        subtopic: 'Adding and Subtracting Fractions',
        url: 'https://www.youtube.com',
        durationLabel: '11 min',
      },
      {
        subtopic: 'Multiplying and Dividing Fractions',
        url: 'https://www.youtube.com',
        durationLabel: '12 min',
      },
      {
        subtopic: 'Equivalent Fractions',
        url: 'https://www.youtube.com',
        durationLabel: '6 min',
      },
    ],
  },

  'decimal-system': {
    id: 'decimal-system',
    label: 'Decimal System',
    icon: '🔢',
    color: 'from-teal-400 to-teal-600',
    videos: [
      {
        subtopic: 'Understanding Decimals and Place Value',
        url: 'https://www.youtube.com',
        durationLabel: '8 min',
      },
      {
        subtopic: 'Decimal Place Value',
        url: 'https://www.youtube.com',
        durationLabel: '7 min',
      },
      {
        subtopic: 'Rounding Decimals',
        url: 'https://www.youtube.com',
        durationLabel: '9 min',
      },
      {
        subtopic: 'Converting Decimals to Fractions',
        url: 'https://www.youtube.com',
        durationLabel: '10 min',
      },
    ],
  },

  percentages: {
    id: 'percentages',
    label: 'Percentages',
    icon: '📊',
    color: 'from-yellow-400 to-yellow-600',
    videos: [
      {
        subtopic: 'What is a Percentage',
        url: 'https://www.youtube.com',
        durationLabel: '7 min',
      },
      {
        subtopic: 'Converting Percentages to Decimals and Fractions',
        url: 'https://www.youtube.com',
        durationLabel: '8 min',
      },
      {
        subtopic: 'Finding Percentage of a Number',
        url: 'https://www.youtube.com',
        durationLabel: '10 min',
      },
      {
        subtopic: 'Percentage Increase and Decrease',
        url: 'https://www.youtube.com',
        durationLabel: '9 min',
      },
    ],
  },

  numbers: {
    id: 'numbers',
    label: 'Numbers',
    icon: '1️⃣',
    color: 'from-red-400 to-red-600',
    videos: [
      {
        subtopic: 'Natural Numbers and Whole Numbers',
        url: 'https://www.youtube.com',
        durationLabel: '6 min',
      },
      {
        subtopic: 'Prime and Composite Numbers',
        url: 'https://www.youtube.com',
        durationLabel: '8 min',
      },
      {
        subtopic: 'Integers and Negative Numbers',
        url: 'https://www.youtube.com',
        durationLabel: '9 min',
      },
      {
        subtopic: 'Rational and Irrational Numbers',
        url: 'https://www.youtube.com',
        durationLabel: '11 min',
      },
    ],
  },

  'shapes-measurements': {
    id: 'shapes-measurements',
    label: 'Shapes & Measurements',
    icon: '📐',
    color: 'from-sky-400 to-sky-600',
    videos: [
      {
        subtopic: '2D Shapes - Circles Rectangles Triangles',
        url: 'https://www.youtube.com',
        durationLabel: '8 min',
      },
      {
        subtopic: 'Area and Perimeter of Shapes',
        url: 'https://www.youtube.com',
        durationLabel: '12 min',
      },
      {
        subtopic: '3D Shapes and Volume',
        url: 'https://www.youtube.com',
        durationLabel: '13 min',
      },
      {
        subtopic: 'Angles and Triangles',
        url: 'https://www.youtube.com',
        durationLabel: '10 min',
      },
    ],
  },
}

export const TOPIC_LIST = Object.values(TOPICS)
