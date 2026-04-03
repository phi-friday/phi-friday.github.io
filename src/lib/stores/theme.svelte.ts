import { modeStorageKey, systemPrefersMode, userPrefersMode } from "mode-watcher";

/**
 * User's preferred mode — `"light"`, `"dark"`, or `"system"`.
 * Persisted to `localStorage` via mode-watcher. Directly writable via `.current`.
 */
export const theme_mode = userPrefersMode;

/**
 * Reads the user's stored mode synchronously from `localStorage`.
 * Useful for avoiding icon flash on initial render before reactive state initializes.
 * @returns {"light" | "dark" | "system"} The stored mode, or `"system"` if not set or invalid.
 */
export function readStoredMode(): "light" | "dark" | "system" {
  if (typeof localStorage === "undefined") return "system";
  const raw = localStorage.getItem(modeStorageKey.current);
  return raw === "light" || raw === "dark" || raw === "system" ? raw : "system";
}

// Synchronous fallback for system preference before systemPrefersMode initializes
function readSystemPref(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

const _theme = $derived(
  userPrefersMode.current === "system"
    ? (systemPrefersMode.current ?? readSystemPref())
    : userPrefersMode.current
);

/**
 * Resolved actual theme — always `"light"` or `"dark"`.
 * Derived from `theme_mode` + OS preference when `"system"`. Read-only.
 */
export const theme = {
  get current(): "light" | "dark" {
    return _theme;
  },
};

// DOM sync — keep <html> class in sync with resolved theme
if (typeof document !== "undefined") {
  $effect.root(() => {
    $effect.pre(() => {
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(_theme);
    });
  });
}
