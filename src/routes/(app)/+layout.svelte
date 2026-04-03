<script lang="ts">
  import { resolve } from "$app/paths";

  let { children } = $props();
</script>

<div class="container mx-auto max-w-4xl px-4 py-8">
  {@render children()}
</div>

<footer class="border-t border-border/60">
  <div
    class="container mx-auto flex max-w-4xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between"
  >
    {#if import.meta.env.DEV}
      <p class="text-sm text-muted-foreground">
        © {new Date().getFullYear()}
        {import.meta.env.APP_AUTHOR_NAME} · {import.meta.env.APP_NAME}
      </p>

      <nav class="flex flex-wrap items-center gap-4 text-sm" aria-label="Feed links">
        <a
          href={resolve("/rss.xml")}
          class="text-muted-foreground transition-colors hover:text-foreground"
        >
          RSS
        </a>
        <a
          href={resolve("/rss.atom.xml")}
          class="text-muted-foreground transition-colors hover:text-foreground"
        >
          Atom
        </a>
        <a
          href={resolve("/rss.json")}
          class="text-muted-foreground transition-colors hover:text-foreground"
        >
          JSON Feed
        </a>
        <a
          href={resolve("/sitemap.xml")}
          class="text-muted-foreground transition-colors hover:text-foreground"
        >
          Sitemap
        </a>
      </nav>
    {/if}
  </div>
</footer>
