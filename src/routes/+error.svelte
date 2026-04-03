<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";

  import { Button } from "$lib/components/ui/button";
  import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "$lib/components/ui/card";

  const error_message = $derived(page.error?.message ?? "Something went wrong.");
</script>

<div class="flex min-h-[calc(100svh-4rem)] items-center justify-center px-4 py-16">
  <Card class="w-full max-w-lg border-border/60 bg-card shadow-sm">
    <CardHeader class="space-y-3">
      <p class="text-sm font-medium text-primary">Error {page.status}</p>
      <CardTitle class="text-2xl sm:text-3xl">Something went wrong</CardTitle>
      <CardDescription class="text-base leading-7">
        {error_message}
      </CardDescription>
    </CardHeader>

    <CardFooter
      class="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      <span class="text-sm text-muted-foreground">Try heading back to the homepage.</span>
      <Button href={resolve("/")} variant="default">Go home</Button>
    </CardFooter>
  </Card>
</div>
