<script setup lang="ts">
import NavLink from './NavLink.vue'

defineProps<{
  links: {
    link: string
    content: string
  }[]
}>()
</script>

<template>
  <div class="navbar">
    <NavLink
      v-for="(linkObj, index) in links"
      :content="linkObj.content"
      :link="linkObj.link"
      :key="index"
    />
  </div>
</template>

<style scoped>
.navbar {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}
</style>
