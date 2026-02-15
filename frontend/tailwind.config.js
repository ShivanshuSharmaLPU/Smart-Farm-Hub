/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#16a34a", // green-600
                secondary: "#f59e0b", // amber-500
                dark: "#1e293b",
            }
        },
    },
    plugins: [],
}
