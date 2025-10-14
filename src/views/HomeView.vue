<script setup lang="ts">
import MoveableCard from '@/components/MoveableCard/MoveableCard.vue'
import MoveableCardContent from '@/components/MoveableCard/MoveableCardContent.vue'
import MoveableCardHeader from '@/components/MoveableCard/MoveableCardHeader.vue'
</script>

<template>
  <main>
    <div class="centered">
      <h3>Home page</h3>
      <div>
        <MoveableCard :Resizeable="true" Measurement="percent">
          <MoveableCardHeader>header test </MoveableCardHeader>
          <MoveableCardContent>content test </MoveableCardContent>
        </MoveableCard>

        <MoveableCard>
          <MoveableCardHeader>header test 2</MoveableCardHeader>
          <MoveableCardContent>content test 2</MoveableCardContent>
        </MoveableCard>
      </div>
    </div>
  </main>
</template>

<style scoped>
.centered {
  text-align: center;
}
</style>
