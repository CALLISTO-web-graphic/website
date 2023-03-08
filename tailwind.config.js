/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        nasalization: ["Nasalization", "sans-serif"],
        "reem-kufi": ["Reem Kufi", "sans-serif"],
      },
    },
  },
  plugins: [],
};
