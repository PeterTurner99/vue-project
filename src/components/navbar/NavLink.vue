<script setup lang="ts">
const linkObj = defineProps<{
  link: string
  content: string
}>()
</script>

<template>
  <div class="navlink">
    <RouterLink :to="linkObj.link">{{ linkObj.content }}</RouterLink>
  </div>
</template>

<style scoped></style>
