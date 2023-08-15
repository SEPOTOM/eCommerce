/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html, ts}", "./src/index.html"],
    darkMode: false,
    theme: {
      extend: {
        fontSize: {
            13: '.8125rem',
        },
        backgroundImage: {
            'main-banner-img': "url('https://cdn03.carsforsale.com/content/images/homepage/hero-2000-may-2021.jpg')",
            'main-banner-img2': "url('https://67cdn.co.uk/131/6/167180041463a5a65e7c881_adobestock-437903717.jpeg?width=414&height=414&crop=auto')",
            'main-banner-img3': "url('https://media.product.which.co.uk/prod/images/900_450/gm-b49a2cfe-b8ab-4424-988e-c711af8461c7-how-to-sell-a-car.jpg')",
            'footer-img': "url('https://cdn03.carsforsale.com/content/images/homepage/alert.jpg')",
        }
      },
    },
    variants: {},
    plugins: [],
}
