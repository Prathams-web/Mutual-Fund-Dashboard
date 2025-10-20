import type { Config } from "tailwindcss";

export const withOpacity = (variable: string) => {
  return ({ opacityValue }: { opacityValue?: string }) =>
    opacityValue === undefined
      ? `rgb(var(${variable}))`
      : `rgb(var(${variable}) / ${opacityValue})`;
};

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/styles/**/*.{css,scss}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        md: "2rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      screens: {
        "2xl": "1440px",
      },
      fontFamily: {
        sans: ["var(--font-noto-sans)", "sans-serif"],
        mono: ["var(--font-roboto-mono)", "monospace"],
      },
      colors: {
        base: withOpacity("--color-base") as any,
        "base-secondary": withOpacity("--color-base-secondary") as any,
        "primary": withOpacity("--color-brand-primary") as any,
        "brand-accent": withOpacity("--color-brand-accent") as any,
        stroke: withOpacity("--color-stroke") as any,
        success: withOpacity("--color-success") as any,
        warning: withOpacity("--color-warning") as any,
        error: withOpacity("--color-error") as any,
        "text-primary": withOpacity("--color-title-h1") as any,
        "text-secondary": withOpacity("--color-title-h2") as any,
      },
      fontSize: {
        h1: [
          "clamp(1.5rem, 2vw, 2.25rem)",
          { lineHeight: "2.75rem", fontWeight: "700" },
        ],
        h2: [
          "clamp(1.25rem, 1.5vw, 1.5rem)",
          { lineHeight: "2.25rem", fontWeight: "600" },
        ],
        h3: [
          "clamp(1.125rem, 1.2vw, 1.25rem)",
          { lineHeight: "2rem", fontWeight: "500" },
        ],
        body: [
          "clamp(1rem, 1vw, 1.125rem)",
          { lineHeight: "1.75rem", fontWeight: "400" },
        ],
        caption: [".75rem", { lineHeight: "1.25rem", fontWeight: "400" }],
      },
      spacing: {
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        6: "24px",
        8: "32px",
        10: "40px",
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "12px",
      },
    },
  },
  plugins: [],
};

export default config;
