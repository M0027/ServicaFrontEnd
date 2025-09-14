/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       colors: {
        vinho: "#800020",
        gold: "#FFD700",
      },
    },
  },
  plugins: [],
}