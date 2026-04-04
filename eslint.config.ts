// @ts-check
import { fileURLToPath } from "node:url";

import { includeIgnoreFile } from "@eslint/compat";
import js from "@eslint/js";
import type { Config } from "eslint/config";
import { defineConfig, globalIgnores } from "eslint/config";
import oxlint from "eslint-plugin-oxlint";
import prettierConfig from "eslint-plugin-prettier/recommended";
import svelte from "eslint-plugin-svelte";
import globals from "globals";
import ts from "typescript-eslint";

import svelteConfig from "./svelte.config";

const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url));

const config: Config[] = defineConfig(
  globalIgnores([
    "**/dist/**",
    "**/dist-ssr/**",
    "**/coverage/**",
    "**/.svelte-kit/**",
    "src/lib/components/ui/**",
    "src/lib/hooks/**",
    "src/lib/utils/ui.ts",
    ".agents/**",
    "vite-env.d",
    "vite-env.d.ts",
    "static/js/gtag.js",
  ]),
  includeIgnoreFile(gitignorePath),
  prettierConfig,
  ...svelte.configs.recommended,
  ...svelte.configs.prettier,
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: ts.parser,
    },
    rules: { "no-undef": "off" },
  },
  {
    files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
    extends: [js.configs.recommended, ...ts.configs.recommended, ...svelte.configs.recommended],
    languageOptions: {
      parserOptions: {
        projectService: true,
        extraFileExtensions: [".svelte", ".svelte.ts", ".svelte.js"],
        parser: ts.parser,
        tsconfigRootDir: import.meta.dirname,
        svelteConfig,
      },
    },
    rules: {
      "svelte/no-target-blank": "error",
      "svelte/button-has-type": "error",
      "svelte/block-lang": [
        "error",
        {
          script: ["ts"],
        },
      ],
      "svelte/no-add-event-listener": "error",
      "svelte/no-ignored-unsubscribe": "error",
      "svelte/prefer-const": "error",
      "svelte/require-stores-init": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
      "no-undef": "off",
      "no-useless-assignment": "off",
    },
  },
  ...oxlint.buildFromOxlintConfigFile("oxlint.config.ts"),
  {
    files: ["**/*.svelte"],
    rules: {
      // FIXME: oxlint no-deprecated does not support svelte's @deprecated tag
      "@typescript-eslint/no-deprecated": "error",
    },
  }
);

export default config;
