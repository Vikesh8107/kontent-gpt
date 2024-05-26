/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "source-sans": ['"Source Sans 3"', "sans-serif"],
      },
      fontWeight: {
        'regular': 400,
        'medium': 500,
        'light': 300,
        'black': 900,
        'bold': 700,
        'semibold': 600,
      },
    },
  },
  plugins: [],
};
