import typographyPlugin from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./app.vue"],
  theme: {
    extend: {
      fontFamily: {
        header: ["Cabinet Grotesk", ...defaultTheme.fontFamily.sans],
        sans: ["Satoshi", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        themeBackground: "var(--background)",
        themeText: "var(--text)",
      },
      screens: {
        minima0: "390px",
        minima: "430px",
      },
    },
  },
  plugins: [typographyPlugin],
} satisfies Config;
