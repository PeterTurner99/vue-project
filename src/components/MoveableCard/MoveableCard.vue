<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'
import ResizeableCard from '../ResizeableCard/ResizeableCard.vue'
const props = defineProps({
  Measurement: {
    type: String,
    default: 'pixels',
  },
  Resizeable: {
    type: Boolean,
    default: false,
  },
})
const CONVERSION_OBJ: Record<string, string> = {
  pixels: 'px',
  percent: '%',
}
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
  const converted = CONVERSION_OBJ[props.Measurement]
  addEventListener('mousemove', (event: MouseEvent) => {
    if (mouseDown.value == true) {
      const x = event.pageX - mouseXOffset.value
      const y = event.pageY - mouseYOffset.value
      const elem = moveableCard.value as HTMLDivElement
      // const newElem = elem!.cloneNode(true) as HTMLDivElement
      const parent = elem!.parentNode
      if (parent!.firstChild != elem.nodeValue) {
        parent!.appendChild(elem)

        // clone the element and insert the cloned element as the first child, preserving the HTMLDivElement type
        elem.addEventListener('mousedown', (event) => MoveCard(event))
        moveableCard.value = elem
      }
      let x_string
      let y_string
      if (props.Measurement == 'percent') {
        x_string = ((Math.max(x, 0) / window.innerWidth) * 100).toString()
        y_string = ((Math.max(y, 0) / window.innerHeight) * 100).toString()
      } else {
        x_string = Math.max(x, 0).toString()
        y_string = Math.max(y, 0).toString()
      }

      elem!.style.left = x_string + converted
      elem!.style.top = y_string + converted
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
  <div @mousedown="MoveCard($event)" ref="moveableCard" class="MoveableCard">
    <div class="ContentSection">
      <ResizeableCard v-if="props.Resizeable" :Measurement="props.Measurement"></ResizeableCard>

      <div class="innerContent">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.MoveableCard {
  width: fit-content;
  position: absolute;
}
.ContentSection {
  cursor: move;
  border-radius: 10px;
  z-index: 5;
  position: absolute;
  min-width: fit-content;
  min-height: fit-content;
}
.innerContent {
  z-index: 5;
  background-color: green;
  border: 2px solid blue;
  border-radius: 10px;
  position: relative;
  height: 100%;
}
</style>
