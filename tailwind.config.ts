import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1180px",
      },
    },
    extend: {
      colors: {
        brand: {
          cyan: "#00C7E8",
          cyanDark: "#00B8D9",
          blue: "#1E88E5",
          blueDeep: "#1565C0",
          sky: "#90C9F6",
          skySoft: "#F0F8FF",
          ice: "#FAFCFF",
          navy: "#20293A",
          slate: "#68758A",
          green: "#4CAF50",
          orange: "#FF9800",
          red: "#F44336",
          purple: "#9C27B0",
          purpleSoft: "#E1BEE7",
          border: "#DDEAF5",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Poppins", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "1.5rem",
        tile: "1rem",
        pill: "999px",
      },
      boxShadow: {
        soft: "0 12px 30px rgba(30, 136, 229, 0.14)",
        card: "0 10px 24px rgba(32, 41, 58, 0.08)",
        action: "0 12px 24px rgba(0, 199, 232, 0.28)",
      },
      backgroundImage: {
        "brand-gradient":
          "linear-gradient(135deg, #00C7E8 0%, #1E88E5 48%, #9C27B0 100%)",
        "dashboard-gradient":
          "linear-gradient(135deg, #90C9F6 0%, #1E88E5 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
