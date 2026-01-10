export const siteConfig = {
    theme: {
        colors: {
            primary: "#0072f5", // Electric Blue
            background: "#050505", // Deep black
            backgroundLight: "#f5f7f8",
            grid: "#1a1a1a",
            text: "#ffffff",
            textMuted: "#888888",
        },
        fonts: {
            display: '"Inter", sans-serif',
            mono: '"JetBrains Mono", monospace',
        }
    },
    // Section specific configurations
    sections: {
        hero: {
            title: "01_HERO",
            subtitle: "SYS.READY",
            activeIndex: 0
        },
        portfolio: {
            title: "02_PORTFOLIO",
            subtitle: "SYS.GRID_VIEW",
            activeIndex: 1
        },
        network: {
            title: "03_NETWORK_LOGIC",
            subtitle: "SYS.LOGIC_VIEW",
            activeIndex: 2
        },
        credentials: {
            title: "04_CREDENTIALS",
            subtitle: "SYS.VALIDATION_LAYER",
            activeIndex: 3
        }
    },
    // Scrollbar aesthetics and behavior
    scrollbar: {
        classes: "scrollbar-left blueprint-scrollbar",
    }
};
