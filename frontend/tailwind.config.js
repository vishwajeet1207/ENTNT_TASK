/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      gridTemplateRows: {
        "[auto,auto,1fr]": "auto auto 1fr",
      },
      colors: {
        "cate-hover": "#0000FF",
        "rating-bg": "#008c00",
        "card-border": "#e5e7eb",
        "chekout-number-bg": "#f0f0f0",
        "ckekout-title": "#878787",
        buttonbg: "#4F46E5",
        signupbg: "#2874f0",
      },
    },
  },
  plugins: [
    require("tailwind-scrollbar-hide"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
};
