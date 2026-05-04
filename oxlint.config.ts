import type { OxlintConfig } from "oxlint";
import { defineConfig } from "oxlint";

const typescript_recommended = [
  "typescript/ban-ts-comment",
  "typescript/no-array-constructor",
  "typescript/no-duplicate-enum-values",
  "typescript/no-empty-object-type",
  "typescript/no-explicit-any",
  "typescript/no-extra-non-null-assertion",
  "typescript/no-misused-new",
  "typescript/no-namespace",
  "typescript/no-non-null-asserted-optional-chain",
  "typescript/no-require-imports",
  "typescript/no-this-alias",
  "typescript/no-unnecessary-type-constraint",
  "typescript/no-unsafe-declaration-merging",
  "typescript/no-unsafe-function-type",
  "typescript/no-unused-expressions",
  "typescript/no-unused-vars",
  "typescript/no-wrapper-object-types",
  "typescript/prefer-as-const",
  "typescript/prefer-namespace-keyword",
  "typescript/triple-slash-reference",
];

const config: OxlintConfig = defineConfig({
  options: {
    typeAware: true,
  },
  plugins: ["eslint", "unicorn", "typescript", "oxc", "import", "jsdoc", "promise", "node"],
  jsPlugins: [
    {
      name: "simple-import-sort",
      specifier: "eslint-plugin-simple-import-sort",
    },
  ],
  categories: {
    correctness: "error",
    suspicious: "error",
    pedantic: "warn",
    perf: "warn",
    style: "off",
    restriction: "warn",
  },
  globals: {},
  ignorePatterns: [
    "**/dist/**",
    "**/dist-ssr/**",
    "**/coverage/**",
    "**/.svelte-kit/**",
    "src/lib/components/ui/**",
    "src/lib/hooks/**",
    "src/lib/utils/ui.ts",
    ".agents/**",
    "vite-env.d.ts",
    "static/js/gtag.js",
  ],
  rules: {
    // oxc
    "oxc/no-async-await": "off",
    "oxc/no-optional-chaining": "off",
    "oxc/no-rest-spread-properties": "off",
    // import
    "import/max-dependencies": "off",
    "import/no-default-export": "off",
    "import/no-unassigned-import": [
      "error",
      {
        allow: ["**/*.css", "**/*.scss", "core-js/stable/**"],
      },
    ],
    "import/no-named-as-default": "off",
    "import/no-duplicates": "error",
    "import/first": "error",
    "import/no-relative-parent-imports": "error",
    // unicorn
    "unicorn/prefer-at": "off",
    "unicorn/require-module-specifiers": "off",
    "unicorn/no-array-sort": "off",
    "unicorn/no-array-reverse": "off",
    "unicorn/no-typeof-undefined": "off",
    // jsdoc
    "jsdoc/require-property-description": "off",
    "jsdoc/no-defaults": "off",
    "jsdoc/require-param": "off",
    "jsdoc/require-param-description": "off",
    "jsdoc/require-returns-description": "off",
    // eslint
    "eslint/sort-vars": "off",
    "eslint/max-lines": ["error", { max: 1000 }],
    "eslint/max-lines-per-function": [
      "error",
      {
        IIFEs: false,
        max: 100,
        skipBlankLines: true,
        skipComments: true,
      },
    ],
    "eslint/no-useless-return": "off",
    "eslint/no-inline-comments": "off",
    "eslint/no-warning-comments": "off",
    "eslint/no-param-reassign": "error",
    "eslint/no-undefined": "off",
    "eslint/no-void": "off",
    "eslint/no-use-before-define": "off",
    "eslint/no-promise-executor-return": "off",
    "no-underscore-dangle": "off",
    // typescript
    // oxlint-disable-next-line unicorn/no-useless-spread
    ...{
      ...Object.fromEntries(typescript_recommended.map(rule => [rule, "error"])),
    },
    "typescript/strict-boolean-expressions": "off",
    "typescript/only-throw-error": "off",
    "typescript/switch-exhaustiveness-check": [
      "error",
      {
        considerDefaultExhaustiveForUnions: true,
      },
    ],
    "typescript/explicit-function-return-type": [
      "error",
      {
        allowIIFEs: true,
      },
    ],
    "typescript/no-deprecated": "error",
    "typescript/consistent-type-imports": [
      "error",
      {
        prefer: "type-imports",
        fixStyle: "separate-type-imports",
        disallowTypeAnnotations: false,
      },
    ],
    "typescript/no-import-type-side-effects": "error",
    "typescript/promise-function-async": "off",
    "typescript/return-await": "off",
    "typescript/prefer-nullish-coalescing": "off",
    "typescript/no-unsafe-type-assertion": "off",
    "typescript/restrict-template-expressions": "off",
    "typescript/no-unsafe-argument": "off",
    "typescript/no-unsafe-assignment": "off",
    "typescript/no-unsafe-return": "off",
    "typescript/no-unsafe-call": "off",
    "typescript/no-unsafe-member-access": "off",
    "typescript/no-misused-promises": "off",
    "typescript/no-confusing-void-expression": "off",
    "typescript/prefer-readonly-parameter-types": "off",
    // promise
    "promise/always-return": "off",
    // js: simple-import-sort
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          ["^\\u0000"],
          ["^node:"],
          ["^svelte$", "^svelte/"],
          ["^\\$app"],
          ["^@", "^"],
          ["^\\$(?!lib|assets)"],
          ["^\\$lib", "^\\$lib/(?!components)"],
          ["^\\$lib/components"],
          ["^\\$assets"],
          ["^\\."],
          ["^.+\\.(gif|png|svg|jpg)$"],
        ],
      },
    ],
    "simple-import-sort/exports": "error",
  },
  settings: {
    jsdoc: {
      ignorePrivate: false,
      ignoreInternal: false,
      ignoreReplacesDocs: true,
      overrideReplacesDocs: true,
      augmentsExtendsReplacesDocs: false,
      implementsReplacesDocs: false,
      exemptDestructuredRootsFromChecks: false,
    },
  },
  env: {
    builtin: true,
    browser: true,
    node: true,
  },
  overrides: [
    {
      files: ["**/*.svelte", "**/*.svelte.ts", "**/*.svelte.js"],
      rules: {
        "import/unambiguous": "off",
        "require-await": "off",
        // oxlint cannot see Svelte template usage, so it incorrectly flags
        // component default imports as "type-only". ESLint with svelte-eslint-parser
        // handles this correctly instead.
        "typescript/consistent-type-imports": "off",
      },
    },
    {
      files: [
        "scripts/**",
        "vite.config.*",
        "svelte.config.*",
        "oxlint.config.*",
        "eslint.config.*",
        "prettier.config.*",
      ],
      rules: {
        "eslint/no-console": "off",
        "no-process-env": "off",
        "no-process-exit": "off",
        "no-default-export": "off",
      },
    },
    {
      files: ["src/**/*.test.ts"],
      rules: {
        "no-process-env": "off",
        "eslint/max-lines-per-function": "off",
        "typescript/no-non-null-assertion": "off",
        "eslint/max-lines": "off",
      },
    },
    {
      files: [".claude/skills/**/scripts/*.ts", ".agents/skills/**/scripts/*.ts"],
      rules: {
        "eslint/no-console": "off",
        "eslint/max-lines": "off",
        "eslint/max-lines-per-function": "off",
        "eslint/complexity": "off",
      },
    },
  ],
});

export default config;
