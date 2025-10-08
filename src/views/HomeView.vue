<script setup lang="ts">
import MoveableCard from '@/components/MoveableCard/MoveableCard.vue'
</script>

<template>
  <main>
    <div class="centered">
      <h3>Home page</h3>
      <div>
        <MoveableCard><p>test1</p> </MoveableCard>
        <MoveableCard><p>test2</p> </MoveableCard>
      </div>
    </div>
  </main>
</template>

<style scoped>
.centered {
  text-align: center;
}
</style>
