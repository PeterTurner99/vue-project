<script setup lang="ts">
import { ref } from 'vue'
import { onMounted } from 'vue'
import ResizeableCard from '../ResizeableCard/ResizeableCard.vue'
import type { MoveableCardType } from './MoveableCardTypes'
const props = defineProps({
  Measurement: {
    type: String,
    default: 'pixels',
  },
  Resizeable: {
    type: Boolean,
    default: false,
  },
  left: {
    type: Number,
    default: 100,
  },
  top: {
    type: Number,
    default: 100,
  },
  width: {
    type: Number,
    default: 100,
  },
  height: {
    type: Number,
    default: 100,
  },
  id: {
    type: Number,
  },
  header: {
    type: [String, HTMLElement],
    default: 'test1',
  },
  content: {
    type: [String, HTMLElement],
    default: 'testt',
  },
})
const emit = defineEmits(['layerChanged', 'cardMoved', 'cardResized'])
const CONVERSION_OBJ: Record<string, string> = {
  pixels: 'px',
  percent: '%',
}
const resizeable = ref(props.Resizeable)
const mouseDown = ref(false)
const mouseXOffset = ref(0)
const moveableCard = ref<HTMLElement | null>(null)
const mouseYOffset = ref(0)
const card_details = ref({
  resizeable: props.Resizeable,
  measurement: props.Measurement,
  left: props.left,
  top: props.top,
  width: props.width,
  height: props.height,
  id: props.id,
  header: props.header,
  content: props.header,
})
function MoveCard(event: MouseEvent) {
  const target = event.target as HTMLElement
  if (target.tagName && target.tagName.toLowerCase() == 'textarea') {
    return
  }
  mouseDown.value = true
  console.log(event.target)
  mouseXOffset.value = event.offsetX
  mouseYOffset.value = event.offsetY
  document.onselectstart = () => {
    return false
  }
}
function resizeCard(new_card: MoveableCardType) {
  card_details.value.width = new_card.width
  card_details.value.height = new_card.height
  card_details.value.left = new_card.left
  card_details.value.top = new_card.top
  card_details.value.measurement = new_card.measurement
  emit('cardResized', card_details.value)
}

onMounted(() => {
  addEventListener('mousemove', (event: MouseEvent) => {
    if (mouseDown.value == true) {
      const x = event.pageX - mouseXOffset.value
      const y = event.pageY - mouseYOffset.value
      const elem = moveableCard.value as HTMLDivElement
      // const newElem = elem!.cloneNode(true) as HTMLDivElement
      const parent = elem!.parentNode
      if (parent!.firstChild != elem.nodeValue) {
        parent!.appendChild(elem)
        emit('layerChanged', props.id, card_details.value)
        // clone the element and insert the cloned element as the first child, preserving the HTMLDivElement type
        elem.addEventListener('mousedown', (event) => MoveCard(event))
        moveableCard.value = elem
      }
      if (props.Measurement == 'percent') {
        card_details.value.left = (Math.max(x, 0) / window.innerWidth) * 100
        card_details.value.top = (Math.max(y, 0) / window.innerHeight) * 100
      } else {
        card_details.value.left = Math.max(x, 0)
        card_details.value.top = Math.max(y, 0)
      }
      emit('cardMoved', card_details.value)
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
  <div
    @mousedown="MoveCard($event)"
    ref="moveableCard"
    :style="{
      left: card_details.left.toString() + CONVERSION_OBJ[Measurement],
      top: card_details.top.toString() + CONVERSION_OBJ[Measurement],
    }"
    class="MoveableCard"
  >
    <div
      class="ContentSection"
      :style="{
        width: card_details.width.toString() + 'px',
        height: card_details.height.toString() + 'px',
      }"
    >
      <ResizeableCard
        v-if="resizeable"
        @card-resized="resizeCard"
        :Resizeable="card_details.resizeable"
        :Measurement="card_details.measurement"
        :left="card_details.left"
        :top="card_details.top"
        :width="card_details.width"
        :height="card_details.height"
        :id="card_details.id"
        :header="card_details.header"
        :content="card_details.content"
      ></ResizeableCard>

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
  min-height: 120px;
}
.innerContent {
  z-index: 5;
  background-color: green;
  border: 2px solid blue;
  border-radius: 10px;
  position: relative;
  height: 100%;
  min-height: 100px;
}
</style>
