/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                lloyd: {
                    crimson: '#D72924',
                    spindle: '#B6D2EA',
                    blue: '#001B54',
                }
            }
        },
    },
    plugins: [],
}
