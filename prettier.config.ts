import * as prettierPluginOxc from "@prettier/plugin-oxc";
import type { Config } from "prettier";
import * as prettierPluginSvelte from "prettier-plugin-svelte";
import type { PluginOptions } from "prettier-plugin-tailwindcss";
import * as prettierPluginTailwindcss from "prettier-plugin-tailwindcss";

const config: Config & PluginOptions = {
  printWidth: 100,
  tabWidth: 2,
  singleQuote: false,
  trailingComma: "es5",
  arrowParens: "avoid",
  bracketSpacing: true,
  useTabs: false,
  endOfLine: "auto",
  singleAttributePerLine: false,
  bracketSameLine: false,
  jsxSingleQuote: false,
  quoteProps: "as-needed",
  semi: true,
  htmlWhitespaceSensitivity: "ignore",
  plugins: [prettierPluginSvelte, prettierPluginTailwindcss, prettierPluginOxc],
  overrides: [
    {
      files: "*.svelte",
      options: {
        parser: "svelte",
        plugins: [prettierPluginSvelte, prettierPluginTailwindcss, prettierPluginOxc],
      },
    },
  ],
  tailwindAttributes: ["class", "className", "classname", "parentClassName", "contentClass"],
  tailwindStylesheet: "./src/app.css",
  tailwindFunctions: ["cn"],
};

export default config;
