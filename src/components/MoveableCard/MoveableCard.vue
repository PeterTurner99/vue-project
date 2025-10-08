<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'
const mouseDown = ref(false)
const mouseXOffset = ref(0)
const moveableCard = ref<HTMLElement | null>(null)
const mouseYOffset = ref(0)
function MoveCard(event: MouseEvent) {
  mouseDown.value = true
  mouseXOffset.value = event.offsetX
  mouseYOffset.value = event.offsetY
  document.onselectstart = () => {
    return false
  }
}

onMounted(() => {
  addEventListener('mousemove', (event: MouseEvent) => {
    if (mouseDown.value == true) {
      const x = event.pageX - mouseXOffset.value
      const y = event.pageY - mouseYOffset.value
      let elem = moveableCard.value as HTMLDivElement
      const newElem = elem!.cloneNode(true) as HTMLDivElement
      const parent = elem!.parentNode
      if (parent!.firstChild != elem.nodeValue) {
        parent!.appendChild(newElem)

        elem?.remove()
        // clone the element and insert the cloned element as the first child, preserving the HTMLDivElement type
        elem = newElem
        elem.addEventListener('mousedown', (event) => MoveCard(event))
        moveableCard.value = elem
      }
      elem!.style.left = Math.max(x, 0).toString() + 'px'
      elem!.style.top = Math.max(y, 0).toString() + 'px'
    }
  })
})
addEventListener('mouseup', () => {
  mouseDown.value = false
  document.onselectstart = () => {
    return true
  }
})
</script>

<template>
  <div @mousedown.capture="MoveCard($event)" ref="moveableCard" class="MoveableCard">
    <slot />
  </div>
</template>

<style scoped>
.MoveableCard {
  border: 2px solid blue;
  padding: 5px 10px;
  border-radius: 10px;
  width: fit-content;
  background-color: green;
  cursor: pointer;
  position: absolute;
}
</style>
