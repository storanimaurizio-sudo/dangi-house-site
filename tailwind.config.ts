import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#FBF7EF",
          100: "#F3ECDD",
          200: "#E7DAC0",
          300: "#D9C7A3",
          400: "#C9B083"
        },
        sea: {
          400: "#3D8FA3",
          500: "#1B6E8C",
          600: "#155A74",
          700: "#0E4A5A"
        },
        sun: "#E2A06A"
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"]
      },
      maxWidth: {
        content: "1180px"
      }
    }
  },
  plugins: []
};

export default config;
