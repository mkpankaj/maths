import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        topic: {
          factors: '#a78bfa',
          fractions: '#fb923c',
          decimal: '#14b8a6',
          percent: '#fbbf24',
          numbers: '#f87171',
          shapes: '#38bdf8',
        },
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
