/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        navy: {
          50:  '#EEF1F8',
          100: '#D5DCF0',
          200: '#ABB8E1',
          600: '#1B3A6B',
          700: '#142D54',
          800: '#0E2040',
          900: '#0A1830',
        },
        tc: {
          orange: '#E8650A',
          'orange-light': '#FFF0E6',
          'orange-border': '#F5B07A',
        },
      },
    },
  },
  plugins: [],
}

