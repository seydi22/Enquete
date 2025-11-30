/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#ebe0ff',
          DEFAULT: '#7d3cff',
          dark: '#632fd1',
        },
        secondary: {
          light: '#94a3b8', // slate-400
          DEFAULT: '#64748b', // slate-500
          dark: '#475569', // slate-600
        },
        accent: {
          light: '#60a5fa', // blue-400
          DEFAULT: '#3b82f6', // blue-500
          dark: '#2563eb', // blue-600
        },
        neutral: {
          lightest: '#f8fafc', // slate-50
          light: '#f1f5f9', // slate-100
          DEFAULT: '#e2e8f0', // slate-200
          dark: '#cbd5e1', // slate-300
        },
        'text-primary': '#1f2937', // gray-800
        'text-secondary': '#6b7280', // gray-500,
        success: '#22c55e', // green-500
        error: '#ef4444', // red-500
        warning: '#f97316', // orange-500
      },
      borderRadius: {
        'xl-14': '14px',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
