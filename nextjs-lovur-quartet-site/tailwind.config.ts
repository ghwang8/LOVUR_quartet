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
      keyframes: {
        pan: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33%)' },
        },
      },
      animation: {
        'slow-pan': 'pan 20s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
