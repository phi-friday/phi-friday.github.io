<template>
  <KeepAlive>
    <div>
      <form class="search-form">
        <label for="search-input" class="sr-only">Search</label>
        <input
          class="search-form-input"
          type="text"
          id="search-input"
          placeholder="Google Search"
          required
          v-model="search"
          @keydown.enter.prevent="click_button"
        />
        <button class="search-form-button" type="button" @click="click_button">
          <svg
            class="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span class="sr-only">Search</span>
        </button>
      </form>
      <SearchGoogle v-show="false" />
    </div>
  </KeepAlive>
</template>

<script setup lang="ts">
const search = ref<string>("");
const input = ref<HTMLInputElement | null>(null);
const button = ref<HTMLButtonElement | null>(null);

const click_button = () => {
  button.value?.click();
};

watch(search, (value) => {
  if (input.value) {
    input.value.value = value;
  }
});

onMounted(async () => {
  await nextTick();
  const search_box = document.getElementById("google-searchbox-container");

  input.value = search_box?.getElementsByTagName("input")?.[0] ?? null;
  button.value = search_box?.getElementsByTagName("button")?.[0] ?? null;
});
</script>

<style lang="css" scoped>
.search-form {
  @apply flex items-center mx-auto min-w-0 w-36 minima0:w-44 minima:w-full;
}
.search-label {
  @apply mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white;
}
.search-form .search-form-input {
  @apply text-sm rounded-lg block w-full ps-3 p-2.5;
  @apply bg-gray-50 border border-gray-300 text-gray-900;
  @apply dark:bg-neutral-700 dark:border-neutral-600 dark:placeholder-neutral-400 dark:text-white;
  @apply focus:ring-slate-500 focus:border-slate-500;
}
.search-form .search-form-button {
  @apply p-2.5 ms-2 text-sm font-medium rounded-lg border focus:ring-2 focus:outline-none;
  @apply text-white bg-slate-700 border-slate-700 hover:bg-slate-800 focus:ring-slate-300;
  @apply dark:bg-neutral-600 dark:hover:bg-neutral-700 dark:focus:ring-neutral-800;
}
</style>
