/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        travelo: {
          green: '#2f7d60',
          'green-soft': '#e3f3ec',
          'green-dark': '#205946',
          sand: '#f6eee3',
        },
      },
      boxShadow: {
        'soft-card': '0 14px 35px rgba(15, 23, 42, 0.08)',
      },
      borderRadius: {
        '2xl': '1.25rem',
      },
    },
  },
  plugins: [],
}

