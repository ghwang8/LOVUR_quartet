import { type Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
      },
      colors: {
        test: '#ff0000',
      },
      animation: {
        'mobile-pan': 'pan 30s ease-in-out infinite alternate',
      },
      keyframes: {
        pan: {
          '0%': { transform: 'translateX(-10%) scale(2.1)' },
          '100%': { transform: 'translateX(10%) scale(2.1)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
