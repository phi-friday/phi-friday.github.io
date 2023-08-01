<template>
  <div class="alert_outer">
    <Alert :type="type"><slot /></Alert>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  type: {
    type: String,
    default: 'info',
    validator(value: string) {
      return ['info', 'success', 'warning', 'danger', 'primary'].includes(value);
    },
  },
});
</script>

<style scoped lang="css">
.alert_outer > .alert {
  @apply my-1 py-1;
}
</style>
