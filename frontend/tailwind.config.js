module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./domain/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        line: {
          300: "#00CC00",
          400: "#00B900",
          500: "#00A800",
          600: "#00B900",
          700: "#009900",
          800: "#008B00",
          900: "#007E00",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
  darkMode: "class",
};
