/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        xxx: "0 35px 70px -15px rgba(0, 0, 0, 0.9)",
      },
      colors: {
        primary: "#222",
        secondary: "#f7f5ef",
      },
      fontFamily: {
        chillax: ["Chillax", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};
