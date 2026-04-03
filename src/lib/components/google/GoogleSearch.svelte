<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  import SearchIcon from "@lucide/svelte/icons/search";

  import { cn } from "$lib/utils/ui";

  import Google from "$lib/components/google/Google.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";

  let search = $state("");
  let google_ref = $state<Google>();
  const handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleClick();
    }
  };
  const handleClick = (event?: MouseEvent): void => {
    event?.preventDefault();
    google_ref?.getGoogleElement()?.execute(search);
  };

  $effect(() => {
    google_ref?.getGoogleElement()?.prefillQuery(search);
  });

  let { class: _class, ...rest }: HTMLAttributes<HTMLFormElement> = $props();
</script>

<form class={cn("mx-auto flex w-64 items-center gap-2", _class)} {...rest}>
  <label for="search-input" class="sr-only">Search</label>
  <Input
    type="text"
    id="search-input"
    placeholder="Google Search"
    required
    bind:value={search}
    onkeydown={handleKeydown}
    class="w-full"
  />
  <Button type="button" variant="outline" size="icon" onclick={handleClick}>
    <SearchIcon />
    <span class="sr-only">Search</span>
  </Button>
</form>
<Google bind:this={google_ref} id="google-searchbox-container" class="hidden" />
