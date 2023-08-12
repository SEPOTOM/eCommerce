/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,ts}"],
    darkMode: false,
    theme: {
      extend: {
        maxWidth: {
          '500': '500px',
        },
        minWidth: {
          '320': '320px',
        }
      },
    },
    variants: {},
    plugins: [],
}
