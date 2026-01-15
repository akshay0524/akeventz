/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#000000', // Pitch Black
        'primary-light': '#121212', // Off-black for cards
        'secondary': '#00F0FF', // Electric Cyan
        'secondary-dark': '#00bbcc',
        'background': '#000000',
        'surface': '#0a0a0a',
        'text-main': '#ffffff',
        'text-muted': '#a1a1aa',
      },
      fontFamily: {
        sans: ['Space Grotesk', 'sans-serif'], // Technical readable font
        hero: ['Syncopate', 'sans-serif'], // The wide hero font (renamed from display to avoid conflict)
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #1f1f1f 1px, transparent 1px), linear-gradient(to bottom, #1f1f1f 1px, transparent 1px)",
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
      animation: {
        'fade-in-down': 'fadeInDown 0.5s ease-out',
      },
      keyframes: {
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
