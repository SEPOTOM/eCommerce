/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html, ts}", "./src/index.html"],
    darkMode: false,
    theme: {
      extend: {
        fontSize: {
            13: '.8125rem',
        }
      },
    },
    variants: {},
    plugins: [],
}