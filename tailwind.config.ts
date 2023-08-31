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
      maxWidth: {
        "1/2": "50%",
        "1/3": "40%",
      },
      minWidth: {
        "100": "100px",
      },
      width: {
        "9/10": "90%",
        "7/10": "70%",
        "1/10": "10%",
      },
      minHeight: {
        "50px": "50px",
      },
      height: {
        "9/10": "90%",
        "1/10": "10%",
      },
      fontSize: {
        "10px": "10px",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
export default config;
