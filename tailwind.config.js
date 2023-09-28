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
                    50: "#e4d9fd",
                    100: "#c6affc",
                    200: "#a281f0",
                    400: "#5721d4",
                    500: "#3e04c3",
                    700: "#2d0689",
                    800: "#200364",
                },
                accent: { 500: "#f7bc0c" },
                error: { 50: "#fcc4e4", 500: "#9b095c" },
                gray: { 500: "#39324a", 700: "#221c30" },
            },
        },
    },
    plugins: [],
};
