import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      maxWidth: {
        "1/2": "50%",
        "1/3": "40%",
        "1/5": "20%",
        "7/10": "70%",
        "8/10": "80%",
        "9/10": "90%",
        "100px": "100px",
        "150px": "150px",
      },
      minWidth: {
        "100": "100px",
      },
      width: {
        "9/10": "90%",
        "7/10": "70%",
        "8/10": "80%",
        "1/10": "10%",
      },
      minHeight: {
        "50px": "50px",
      },
      height: {
        "9/10": "90%",
        "1/10": "10%",
        "8.5/10": "85%",
        "1.5/10": "15%",
      },
      maxHeight: {
        "9/10": "90%",
      },
      fontSize: {
        "10px": "10px",
      },
      gridTemplateColumns: {
        main: "minmax(0,2fr) minmax(0,6fr) minmax(0,16fr)",
        medium: "minmax(0,2fr) minmax(0,6fr) minmax(0,10fr)",
        small: "minmax(0,1fr) minmax(0,4fr)",
        phone: "1fr",
      },
      gridTemplateRows: {
        all: "1fr",
        phone: "1fr 10fr",
        chat: "minmax(0,2fr) minmax(0,12fr)",
        chatlog: "minmax(0,9fr) minmax(0,1fr)",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
export default config;
