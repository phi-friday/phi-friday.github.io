# AGENTS.md

## Project Overview

**phi.log** — A static blog built with SvelteKit, published to GitHub Pages.

- **Author**: phi (phi.friday@gmail.com)
- **URL**: https://phi-friday.github.io/
- **Rendering**: Pure CSR (Client-Side Rendering) — no SSR/SSG
- **Deployment**: Static build output to `build/` directory

## Tech Stack

- **Framework**: SvelteKit + `@sveltejs/adapter-static`
- **Build Tool**: Vite
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn-svelte (bits-ui based)
- **Icons**: Lucide Svelte (`@lucide/svelte`)
- **Markdown**: MDsveX with GitHub-flavored plugins
- **Code Highlighting**: Shiki (github-light/github-dark themes)

## Project Structure

```
svelte-blog/
├── src/
│   ├── routes/          # SvelteKit file-based routing
│   ├── lib/
│   │   ├── components/  # Svelte components (do NOT touch ui/ or hooks/)
│   │   ├── utils/       # Utility functions (do NOT touch ui.ts)
│   │   ├── stores/      # Svelte stores
│   │   └── styles/      # Shared style utilities
│   └── contents/        # Markdown/MDsveX blog posts (.md / .svx)
├── static/              # Static assets (images, CSS)
└── build/               # Build output (GitHub Pages deployment)
```

## Commands

```bash
bun install           # Install dependencies
bun dev               # Start dev server
bun build             # Build static site
bun preview           # Preview built site
bun check             # Type-check with svelte-check
bun check:watch       # Type-check in watch mode
bun format            # Format all files with Prettier
bun lint              # Run all linters (prettier + oxlint + eslint)
bun lint:prettier     # Check formatting only
bun lint:oxlint       # Run oxlint only
bun lint:eslint       # Run ESLint only
```

**No test runner** is configured. Validation workflow — **run in this exact order**:
1. `bun lint:oxlint` — **run first**; extremely fast convention/style checker, catches most issues instantly
2. `bun check` — TypeScript + Svelte type checking
3. `bun lint:prettier` — formatting check
4. `bun lint:eslint` — slower; run last or only when oxlint passes
5. `bun build` — ensures all routes are prerenderable

> **oxlint is mandatory — never skip it.** It runs in milliseconds and catches naming, import, and style violations before slower tools even start. `bun lint` runs all three linters together; use individual commands for faster iteration.

## Key Constraints

### CSR Only
- All rendering happens client-side; no server actions or `+server.ts` endpoints
- Data generated at build time as static files

### Static Site
- Adapter: `@sveltejs/adapter-static`, output to `build/`
- `fallback: "404.html"` for SPA routing
- All routes **must** be prerenderable; export `export const csr = true;`

### Off-Limits Files
These are auto-generated — **do not edit**:
- `src/lib/components/ui/**` — shadcn-svelte CLI output
- `src/lib/hooks/**` — shadcn-svelte hooks
- `src/lib/utils/ui.ts` — shadcn-svelte utility

For UI customization, create wrapper components in `src/lib/components/`.

## Code Style

### Formatting (Prettier)
- `printWidth: 100`, `tabWidth: 2`, no tabs
- Double quotes (`singleQuote: false`), semicolons enabled
- `trailingComma: "es5"`, `arrowParens: "avoid"` (omit parens for single-param arrows)
- Tailwind classes sorted automatically via `prettier-plugin-tailwindcss` — don't manually sort

### TypeScript
- Strict mode enabled; avoid `any` and `unknown` casts
- Use `unknown` for caught errors, narrow with type guards
- Prefix private/internal symbols and intentionally unused variables/params with `_`
- Deprecated API usage is a hard error (`@typescript-eslint/no-deprecated`)
- **Explicit return types required** on all functions (`typescript/explicit-function-return-type`); IIFEs are exempt
- **Type-only imports must use `import type`** (`typescript/consistent-type-imports`):
  ```ts
  import type { Foo } from "./types";
  import { bar } from "./utils";
  ```
- Do not reassign function parameters (`eslint/no-param-reassign`)
- `switch` statements over union types must be exhaustive (`typescript/switch-exhaustiveness-check`)
- File limit: max 1000 lines; function limit: max 100 lines (blank lines and comments excluded)

### Import Order
Imports are auto-sorted by `simple-import-sort`. The enforced group order is:
1. Side-effect imports (`import "..."`)
2. Node built-ins (`node:*`)
3. Svelte core (`svelte`, `svelte/*`)
4. SvelteKit app modules (`$app/*`)
5. External packages (`@scope/pkg`, `pkg`)
6. Other `$`-prefixed aliases (not `$lib` or `$assets`)
7. `$lib` utilities (non-component)
8. `$lib/components`
9. `$assets`
10. Relative imports (`./`)
11. Image assets (`.gif`, `.png`, `.svg`, `.jpg`)

**No relative parent imports** (`import/no-relative-parent-imports`): always use `$lib/`, `$contents/`, or other aliases instead of `../`.

### Svelte Components
- Script blocks **must** use `lang="ts"`: `<script lang="ts">`
- Use **Svelte 5 runes** — no legacy `on:event` directives or `$:` reactivity
  - Props: `let { foo, ...rest } = $props();`
  - State: `let count = $state(0);`
  - Derived: `const doubled = $derived(count * 2);`
  - Effects: `$effect(() => { ... });` / `$effect.pre(() => { ... });`
  - Event handlers use prop syntax: `onclick={handler}`, `onkeydown={handler}`
- **`svelte/no-add-event-listener`**: when attaching event listeners programmatically (e.g., inside `$effect`), use Svelte's `on()` function from `svelte/events` instead of `element.addEventListener()`. This ensures proper cleanup and integration with Svelte's lifecycle:
  ```ts
  import { on } from "svelte/events";
  $effect(() => on(element, "click", handler));  // ✅
  // element.addEventListener("click", handler);  // ❌
  ```
- All `<button>` elements must have explicit `type` attribute (`svelte/button-has-type`)
- Avoid `target="_blank"` without `rel="noopener"` (`svelte/no-target-blank`)
- Prefer `const` bindings where possible (`svelte/prefer-const`)
- **Prop naming** — component props always use **camelCase** even when the corresponding local variable is snake_case; in templates: `<Component userEmail={user_email} />`
  - Event callback props use `on` prefix: `onClose`, `onSubmit`, `onSave`
  - Handler function props injected from a parent use `handle` prefix: `handleGetData`, `handleSubmit`

### Naming Conventions
- **PascalCase**: Svelte component files, TypeScript types/interfaces, classes
- **camelCase**: functions and callable values (arrow functions, event handlers, factory functions, etc.)
- **snake_case**: simple variables — local or module-level non-callable, non-constant bindings (e.g. `$state`, `$derived`, loop vars, reactive object instances)
- **UPPER_CASE**: fixed constants — module-level `const` whose value is a primitive or immutable reference that never changes at runtime (e.g. regex patterns, config strings)
- **kebab-case**: file names for routes and assets
- **`_` prefix**: private or internal symbols — prepend `_` to the name following its normal case rule (e.g. `_my_var`, `_myHelper`, `_INTERNAL_KEY`); also used to suppress unused-variable lint warnings

**Exceptions — do not rename:**
- SvelteKit page options (`prerender`, `trailingSlash`, `csr`, `ssr`, `entries`, `load`) and HTTP handlers (`GET`, `POST`, `handle`, etc.) are framework-required names
- Svelte component variables used directly in templates as `<Var />` must remain PascalCase (e.g. a `Component | null` state used as `<Content />`)

### Error Handling
- Use `try/catch` with `unknown` type for errors; log via `console.error` (mark with `// oxlint-disable-next-line no-console: FIXME` if temporary)
- `@ts-expect-error` for unavoidable dynamic/untyped scenarios (with explanatory comment)

## Routing

- File-based routing in `src/routes/`
- `(groupName)/` — route groups with shared layouts
- `[slug]/` — dynamic segments; `[...slug]` — catch-all
- Content slugs resolved via `$lib/utils/contents`
- Path alias `$contents/*` maps to `src/contents/*`

## Styling

- Tailwind CSS v4 utility classes; `cn()` helper from `$lib/utils/ui` for conditional classes
- Dark mode via `ColorMode.svelte` + `themeMode` store (`mode-watcher`)
- `@tailwindcss/typography` for markdown prose content
- Global CSS: `src/app.css`; additional global styles in `static/css/`

## Available MCP Tools

### 1. Context7
Always use Context7 for library/API documentation, setup steps, and code generation.
Use `resolve_library_id` then `get_library_docs` automatically — no need to ask.

### 2. ESLint MCP (`mcp_eslint_lint-files`)
Lint frontend files instantly (faster than terminal). Provide **absolute** file paths as an array.
Use this for ESLint checks — but **only after oxlint passes** (`bun lint:oxlint`). oxlint is faster and must run first; do not replace it with ESLint MCP.

### 3. Svelte MCP
1. **`list-sections`** — call first to discover relevant Svelte/SvelteKit documentation sections
2. **`get-documentation`** — fetch all relevant sections identified by `list-sections`
3. **`svelte-autofixer`** — analyze Svelte code for issues; call before finalizing any `.svelte` file, iterate until clean
4. **`playground-link`** — generate playground link only after user confirmation, never for project file changes

## Additional Notes

- Google Custom Search: configured via `package.json` `google` field, exposed as `import.meta.env.GOOGLE_SEARCH`
- RSS feeds: Atom, JSON, and XML formats auto-generated at build time via `+server.ts` routes
- Sitemap: auto-generated at build time
- MDsveX layout: `src/lib/components/MarkdownLayout.svelte` (applied to all `.md`/`.svx` files)
- Svelte experimental `async` compiler option is enabled — top-level `await` is supported in `<script>`
- Blog comments: Utterances widget configured via `package.json` `utterance` field

## References

- [shadcn-svelte](https://www.shadcn-svelte.com/llms.txt)
- [SvelteKit docs](https://svelte.dev/docs/kit)
- [Svelte 5 runes](https://svelte.dev/docs/svelte/what-are-runes)
- [svelte/events (`on`)](https://svelte.dev/docs/svelte/svelte-events)
