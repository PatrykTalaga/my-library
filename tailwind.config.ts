import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    screens: {
      usm: { max: "865px" },
      mdList: { min: "861px", max: "1220px" },
      lgList: { min: "1221px", max: "1380px" },
      smNav: { max: "1200px" },
      md: { max: "1350px" },
      // => @media (min-width: 640px) { ... }
      lg: "1351px",
      // => @media (min-width: 1440px) { ... }
    },
  },
  plugins: [],
};
export default config;
