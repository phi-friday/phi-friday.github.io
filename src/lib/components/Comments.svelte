<script lang="ts">
  import { untrack } from "svelte";

  import { watch } from "runed";

  import { theme } from "$lib/stores/theme.svelte";

  let container: HTMLDivElement | undefined = $state();
  let script_el: HTMLScriptElement | undefined = $state();
  const utterances_theme = $derived(theme.current === "dark" ? "github-dark" : "github-light");
  const utterances_args: Record<string, string> = $derived({
    src: import.meta.env.UTTERANCE_SRC,
    repo: import.meta.env.UTTERANCE_REPO,
    "issue-term": import.meta.env.UTTERANCE_ISSUE_TERM,
    crossorigin: import.meta.env.UTTERANCE_CROSSORIGIN,
  });

  $effect.pre(() => {
    script_el?.setAttribute(
      "theme",
      untrack(() => utterances_theme)
    );
  });
  watch(
    [(): HTMLDivElement | undefined => container, (): string => utterances_theme],
    ([$container, $utterances_theme]) => {
      if (!$container) return;
      $container
        .querySelector<HTMLIFrameElement>(".utterances-frame")
        ?.contentWindow?.postMessage(
          { type: "set-theme", theme: $utterances_theme },
          "https://utteranc.es"
        );
    }
  );
</script>

<section class="mt-8">
  <div bind:this={container} id="utterance-container">
    <script bind:this={script_el} async {...utterances_args}></script>
  </div>
</section>
