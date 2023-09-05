/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html, ts}", "./src/index.html"],
    safelist: ['cursor-not-allowed', 'h-[450px]', 'sm:h-[650px]'],
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