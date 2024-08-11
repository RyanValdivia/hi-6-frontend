/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: "#4e46e5",
                    foreground: "#468ee5",
                },
                secondary: {
                    DEFAULT: "#dde546",
                    foreground: "#9d46e5",
                },
                extra: {
                    DEFAULT: "#e546dd",
                    foreground: "#e54e46",
                },
                danger: "#ff0000",
                success: "#00ff00",
                warning: "#ffff00",
                muted: "#7d7d7d",
                basic: {
                    DEFAULT: "#000000",
                    inverted: "#ffffff",
                },
            },
        },
    },
    plugins: [],
};
