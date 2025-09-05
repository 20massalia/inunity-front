import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../ui/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#185bec",
        "disabled-text": "#626262",
        "disabled-bg": "#D9D9D9",
        black: "#0F1419",
        divider: "#EFF3F4",
        "black-50": "rgba(0,0,0,0.5)",
        danger: "#FF3131",
        body: "#3B3F43",
        placeholder: "rgba(0,0,0,0.5)",
        unselected: "rgba(0,0,0,0.04)",
        success: "#2CF500",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      height: {
        "real-screen": "calc(var(--vh) * 100)",
      },
      fontSize: {
        "h-xl": "2rem",
        "h-lg": "1.5rem",
        "h-no": "1.125rem",
        "h-sm": "1rem",
        "p-lg": "1.125rem",
        "p-no": "0.875rem",
        "p-sm": "0.75rem",
        "l-lg": "1rem",
        "l-no": "0.875rem",
        "l-sm": "0.75rem",
      },
      spacing: {
        "2.5": "10px",
        "5": "20px",
        "6": "24px",
      },
    },
  },
  plugins: [],
};
export default config;
