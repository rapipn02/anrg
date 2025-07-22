/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/**/*.ejs",
    "./public/**/*.html",
    "./public/**/*.js"
  ],
  safelist: [
    'text-primary',
    'text-cyber',
    'text-mint',
    'bg-primary',
    'bg-cyber',
    'bg-mint',
    'border-primary',
    'border-cyber',
    'border-mint',
    {
      pattern: /(bg|text|border)-(primary|cyber|mint)/,
      variants: ['hover', 'focus', 'active', 'group-hover'],
    },
    {
      pattern: /(bg|text|border)-(white|black)/,
      variants: ['hover', 'focus', 'active', 'group-hover'],
    },
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#5F2EEA',
          50: '#F4F1FE',
          100: '#E4DEFE',
          200: '#C5B8FC',
          300: '#A593FB',
          400: '#866DF9',
          500: '#5F2EEA',
          600: '#4C25BB',
          700: '#391C8C',
          800: '#26135D',
          900: '#130A2E',
        },
        cyber: {
          DEFAULT: '#23BDEE',
          50: '#F0FBFE',
          100: '#E1F7FD',
          200: '#C3EEFB',
          300: '#A6E6F9',
          400: '#88DDF7',
          500: '#23BDEE',
          600: '#1C97BE',
          700: '#15718F',
          800: '#0E4B5F',
          900: '#072630',
        },
        mint: {
          DEFAULT: '#9EF8EE',
          50: '#F7FEFD',
          100: '#EFFDFB',
          200: '#DFFBF7',
          300: '#CFF9F3',
          400: '#BFF7EF',
          500: '#9EF8EE',
          600: '#7EC6BE',
          700: '#5F958F',
          800: '#3F635F',
          900: '#203230',
        },
        black: '#232323',
        white: '#FAFAFA',
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'tech': ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
