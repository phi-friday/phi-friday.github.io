// @ts-check
import { createConfigForNuxt } from "@nuxt/eslint-config/flat";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import stylisticTs from "@stylistic/eslint-plugin-ts";

export default createConfigForNuxt({
    features: {
        typescript: {
            strict: true,
        },
    },
})
    .prepend({
        plugins: {
            "@stylistic/ts": stylisticTs,
            "simple-import-sort": simpleImportSort,
        },
        rules: {
            "no-console": "off",
            "simple-import-sort/imports": "error",
            "simple-import-sort/exports": "error",
            "import/first": "error",
            "import/newline-after-import": "error",
            "import/no-duplicates": "error",
        },
        files: ["**/*.ts", "**/*.tsx", "**/*.vue"],
    })
    .override("nuxt/rules", {
        rules: {
            "@typescript-eslint/no-explicit-any": "off",
            "vue/html-self-closing": "off",
            "vue/prop-name-casing": ["error", "snake_case"],
            "vue/multi-word-component-names": "off",
            "import/order": "off",
        },
    });
