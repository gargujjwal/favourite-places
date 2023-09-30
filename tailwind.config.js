/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [],
    theme: {
        screens: {
            sm: "380px",
            md: "420px",
            lg: "680px",
            tablet: "1024px",
        },
        extend: {
            colors: {
                primary: {
                    50: "#cfeffd",
                    100: "#a0defb",
                    200: "#77cff8",
                    400: "#44bdf5",
                    500: "#1aacf0",
                    700: "#0570c9",
                    800: "#003b88",
                },
                accent: { 500: "#e6b30b" },
                error: { 50: "#fcc4e4", 500: "#9b095c" },
                gray: { 500: "#39324a", 700: "#221c30" },
            },
        },
    },
    plugins: [],
};
