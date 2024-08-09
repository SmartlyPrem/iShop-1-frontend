/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'mobile': '576px',
      // => @media (min-width: 640px) { ... }

      'tablet': '755px',
      // => @media (min-width: 640px) { ... }
      
      'laptop': '992px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1200px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      colors: {
        'my-h-color': '#F6F7F8',
      },
    },
  },
  plugins: [],
}