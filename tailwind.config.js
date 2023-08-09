/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,ts}", "./dist/**/*.{html,js}"],
    darkMode: false,
    theme: {
      extend: {
        maxWidth: {
          '500': '500px',
        }
      },
    },
    variants: {},
    plugins: [],
}
