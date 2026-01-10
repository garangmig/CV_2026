/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {

                "primary": "#0072f5", // Electric Blue
                "secondary": "#FFFFFF",
                "muted": "#888888",

                "background": "#050505",
                "grid-line": "#1a1a1a",

                "success": "#9EF01A",
                "error": "#ef4444",
                "warning": "#f59e0b",
                "info": "#0ea5e9",

                dark: {
                    "primary": "#0072f5", // Electric Blue
                    "secondary": "#FFFFFF",
                    "muted": "#888888",

                    "background": "#050505",
                    "grid-line": "#1a1a1a"
                }


            },
            fontFamily: {
                "display": ["Inter", "sans-serif"],
                "mono": ["JetBrains Mono", "monospace"],
            },
            backgroundImage: {
                'tech-grid': "linear-gradient(to right, var(--color-grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--color-grid-line) 1px, transparent 1px)",
            }
        },
    },
    plugins: [],
}
