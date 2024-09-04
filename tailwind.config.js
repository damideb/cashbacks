/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        secondary: "#F5F5F5",
        blue: "#076090",
      },
    },
  },
  plugins: [],
};
