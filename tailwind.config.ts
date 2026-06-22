import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        espresso: "#1A1A1A",
        cream: "#F5EFE6",
        sand: "#C9A96E",
        terre: "#7B6E63",
        linen: "#E8DDD0",
        tobacco: "#2E2318",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "Cormorant Garamond", "serif"],
        "cormorant-sc": ["var(--font-cormorant-sc)", "Cormorant SC", "serif"],
        sans: ["var(--font-sans)", "DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;