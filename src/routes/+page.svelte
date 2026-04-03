<script lang="ts">
  import { resolve } from "$app/paths";

  import ArrowRight from "@lucide/svelte/icons/arrow-right";

  import { Button } from "$lib/components/ui/button";
</script>

<div class="flex min-h-[calc(100svh-4rem)] items-center justify-center px-4">
  <div class="flex w-full max-w-2xl flex-col items-start gap-8 sm:items-center sm:text-center">
    <h1 class="mb-4 text-3xl font-extrabold md:text-5xl lg:text-6xl">
      <span class="bg-linear-to-r from-sky-400 to-emerald-600 bg-clip-text text-transparent">
        {import.meta.env.APP_NAME}
      </span>
      <span class="text-foreground">in github.io</span>
    </h1>

    <Button href={resolve("/(app)/@tags")} variant="outline" size="lg" class="gap-2 shadow-sm">
      Enter
      <ArrowRight class="size-4" />
    </Button>
  </div>
</div>
