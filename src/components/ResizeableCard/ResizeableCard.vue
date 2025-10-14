<script setup lang="ts">
import { onMounted, ref } from 'vue'
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
const mouseX = ref(0)
const resizeableCard = ref<HTMLElement | null>(null)
const mouseY = ref(0)
const initialWidth = ref(0)
const initialHeight = ref(0)
const initialLeft = ref(0)
const initialTop = ref(0)
const changeHeightFromTop = ref(false)
const changeWidthFromLeft = ref(false)
const changeHeightFromBottom = ref(false)
const changeWidthFromRight = ref(false)
function startResizeCard(event: MouseEvent) {
  mouseX.value = event.pageX
  mouseY.value = event.pageY
  event.stopPropagation()
  const elem = event.target as HTMLElement
  const dims = elem.getBoundingClientRect()
  const height = dims.height
  const width = dims.width
  initialLeft.value = dims.left
  initialTop.value = dims.top
  initialHeight.value = height
  initialWidth.value = width
  if (event.offsetY < 25) {
    changeHeightFromTop.value = true
  }
  if (event.offsetX < 25) {
    changeWidthFromLeft.value = true
  }
  if (Math.abs(width - event.offsetX) < 25) {
    changeWidthFromRight.value = true
  }
  if (Math.abs(height - event.offsetY) < 25) {
    changeHeightFromBottom.value = true
  }
  document.onselectstart = () => {
    return false
  }
  document.body.style.cursor = 'crosshair'
  document.addEventListener('mousemove', resizeCard)
  // mouseDown.value = true
}
function resizeCard(event: MouseEvent) {
  // console.log(
  //   changeHeightFromBottom.value,
  //   changeHeightFromTop.value,
  //   changeWidthFromLeft.value,
  //   changeWidthFromRight.value,
  //   event,
  // )
  /*
  DRAG FROM LEFT / TOP
  CHANGE START
  ELSE
  CHANGE END
  IF Dragged past other end
  reverse

  */
  const elem = resizeableCard.value as HTMLElement
  const width = event.pageX - mouseX.value
  const height = event.pageY - mouseY.value
  if (changeHeightFromBottom.value || changeHeightFromTop.value) {
    const newHeight = height * (changeHeightFromTop.value ? -1 : 1) + initialHeight.value
    if (changeHeightFromTop.value) {
      elem!.parentElement!.parentElement!.style.top = (initialTop.value + height).toString() + 'px'
    }
    elem.parentElement!.style.height = newHeight.toString() + 'px'
  }
  if (changeWidthFromLeft.value || changeWidthFromRight.value) {
    const newWidth = width * (changeWidthFromLeft.value ? -1 : 1) + initialWidth.value
    if (changeWidthFromLeft.value) {
      elem!.parentElement!.parentElement!.style.left = (initialLeft.value + width).toString() + 'px'
    }
    elem.parentElement!.style.width = newWidth.toString() + 'px'
  }
}

onMounted(() => {})

addEventListener('mouseup', () => {
  mouseDown.value = false
  changeHeightFromTop.value = false
  changeWidthFromLeft.value = false
  changeHeightFromBottom.value = false
  changeWidthFromRight.value = false
  document.onselectstart = () => {
    return true
  }
  document.body.style.cursor = 'auto'
  document.removeEventListener('mousemove', resizeCard)
})
</script>

<template>
  <div @mousedown.capture="startResizeCard($event)" ref="resizeableCard" class="ResizeableCard">
    <span>&nbsp;</span>
  </div>
</template>

<style scoped>
.ResizeableCard {
  cursor: crosshair;
  position: absolute;
  background-color: red;
  z-index: 1;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  top: -1px;
  left: -1px;
  border-radius: 5px;
}
</style>
