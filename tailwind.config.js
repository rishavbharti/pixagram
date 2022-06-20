/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bodyBg: '#f9fafb', // gray-50
        cardBg: '#ffffff', // white
        borderColor: '#e5e7eb', // gray-200
        shimmer: '#e2e8f0', // slate-200

        mainText: '#000000', // black
        subtitle: '#525252', // neutral-600
        subtitle2: '#f8fafc', // slate-50
        labelText: '#737373', // neutral-500

        // For dark mode
        'dm-bodyBg': '#111827', // gray-900
        'dm-navbarBg': '#171717', // neutral-900
        'dm-cardBg': '#000000', // black
        'dm-borderColor': '#374151', // gray-700
        'dm-shimmer': '#334155', // slate-700

        'dm-mainText': '#ffffff', // white
        'dm-subtitle': '#d4d4d4', // neutral-300
        'dm-subtitle2': '#0f172a', // slate-900
        'dm-labelText': '#a3a3a3', // neutral-400
      },
    },
  },
  plugins: [],
};
