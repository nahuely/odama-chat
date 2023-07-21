/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        odama: "#F97316",
        odamaLight: "#FDBA74",
        odamaTransparent: "rgba(255, 237, 213, 0.50)",
      },
    },
  },
  plugins: [],
};
