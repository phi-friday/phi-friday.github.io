<template>
  <li class="leading-7"><slot /></li>
</template>

<style lang="ts" scoped>
css({
  li: {
    fontFamily: '{typography.font.body}',
    margin: '{prose.li.margin}',
    listStylePosition: '{prose.li.listStylePosition}',
  }
})
</style>