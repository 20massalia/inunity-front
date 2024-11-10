import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../ui/src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#185bec',
        'disabled-text': '#626262',
        'disabled-bg': '#D9D9D9',
        black: '#0F1419',
        body: '#3B3F43',
        placeholder: 'rgba(0,0,0,0.5)',
        unselected: 'rgba(0,0,0,0.04)',
        success: '#2CF500',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      height: {
        'real-screen': 'calc(var(--vh) * 100)',
      },

    },
  },
  plugins: [],
};
export default config;
