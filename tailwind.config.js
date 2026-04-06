import defaultTheme from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";
import typographyPlugin from "@tailwindcss/typography";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,json,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--aw-color-primary)",
        secondary: "var(--aw-color-secondary)",
        accent: "var(--aw-color-accent)",
        default: "var(--aw-color-text-default)",
        muted: "var(--aw-color-text-muted)",
      },
      typography: {
        DEFAULT: {
          css: {
            // Blockquote: remove default italic + decorative quotes, add accent border + subtle bg
            blockquote: {
              fontStyle: "normal",
              fontWeight: "400",
              borderInlineStartColor: "var(--aw-color-primary)",
              borderInlineStartWidth: "4px",
              backgroundColor: "rgba(0, 0, 0, 0.02)",
              padding: "1rem 1.5rem",
              borderRadius: "0.375rem",
            },
            "blockquote p:first-of-type::before": {
              content: "none",
            },
            "blockquote p:last-of-type::after": {
              content: "none",
            },
            // Table headers: thicker bottom border, subtle background
            thead: {
              borderBottomWidth: "2px",
              borderBottomColor: "var(--aw-color-primary)",
            },
            "thead th": {
              backgroundColor: "rgba(0, 0, 0, 0.04)",
              paddingTop: "0.75rem",
              paddingBottom: "0.75rem",
            },
            // H2: subtle bottom border
            h2: {
              borderBottomWidth: "1px",
              borderBottomColor: "var(--aw-color-text-muted)",
              paddingBottom: "0.5rem",
            },
            // Inline code: classic styling without backticks
            code: {
              backgroundColor: "rgba(0, 0, 0, 0.05)",
              padding: "0.2rem 0.4rem",
              borderRadius: "0.25rem",
              fontWeight: "400",
            },
            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },
            "pre code": {
              backgroundColor: "transparent",
              padding: "0",
              borderRadius: "0",
              fontWeight: "inherit",
            },
          },
        },
        // Dark mode (applied when `prose-invert` is active)
        invert: {
          css: {
            blockquote: {
              backgroundColor: "rgba(255, 255, 255, 0.05)",
            },
            "thead th": {
              backgroundColor: "rgba(255, 255, 255, 0.08)",
            },
            code: {
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            },
            "pre code": {
              backgroundColor: "transparent",
            },
          },
        },
      },
      fontFamily: {
        sans: [
          "var(--aw-font-sans, ui-sans-serif)",
          ...defaultTheme.fontFamily.sans,
        ],
        serif: [
          "var(--aw-font-serif, ui-serif)",
          ...defaultTheme.fontFamily.serif,
        ],
        heading: [
          "var(--aw-font-heading, ui-sans-serif)",
          ...defaultTheme.fontFamily.sans,
        ],
      },

      animation: {
        fade: "fadeInUp 1s both",
      },

      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(2rem)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    typographyPlugin,
    plugin(({ addVariant }) => {
      addVariant("intersect", "&:not([no-intersect])");
    }),
  ],
  darkMode: "class",
};
