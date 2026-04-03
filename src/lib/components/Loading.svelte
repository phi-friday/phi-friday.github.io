<script lang="ts">
  import Loader2Icon from "@lucide/svelte/icons/loader-2";
  import { Portal } from "bits-ui";
  import type { ComponentProps } from "svelte";

  import { Spinner } from "$lib/components/ui/spinner";

  let { ...rest }: ComponentProps<typeof Loader2Icon> = $props();
</script>

<Portal>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <Spinner {...rest} />
  </div>
</Portal>
