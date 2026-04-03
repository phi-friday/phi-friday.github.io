import { pushState } from "$app/navigation";

export function scrollToAnchor(id: string, update_hash: boolean = true): void {
  // oxlint-disable-next-line unicorn/prefer-query-selector
  const el = document.getElementById(id);
  if (!el) return;

  const header = document.querySelector<HTMLElement>("header");
  const offset = (header?.offsetHeight ?? 64) + 8;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top, behavior: "instant" });

  if (update_hash) {
    // eslint-disable-next-line svelte/prefer-svelte-reactivity
    const url = new URL(window.location.href);
    url.hash = id;
    // eslint-disable-next-line svelte/no-navigation-without-resolve
    pushState(url, {});
  }
}
