<script setup lang="ts">
import { getCookie, saveCookie } from '@/Lib/Cookies.vue'
import { onMounted, ref } from 'vue'
const props = defineProps({
  useCookies: {
    type: Boolean,
    default: false,
  },
  textContent: {
    type: [String],
    default: '',
  },
  id: {
    type: String,
  },
  textArea: {
    type: Boolean,
    default: false,
  },
})

const textContent = ref(props.textContent)
const textContentSpan = ref<HTMLElement | null>(null)
const textContentArea = ref<HTMLElement | null>(null)
const textContentInput = ref<HTMLElement | null>(null)
const swapInput = () => {
  textContentSpan.value?.classList.toggle('d-none')
  if (props.textArea) {
    textContentArea.value?.classList.toggle('d-none')
    textContentArea.value?.focus()
  } else {
    textContentInput.value?.classList.toggle('d-none')
    textContentInput.value?.focus()
  }
}
const updateTextContent = (event: Event) => {
  const target = event.target as HTMLInputElement
  textContent.value = target!.value
  if (props.useCookies && props.id) {
    saveCookie(`${props.id}-textContent`, target!.value)
  }
}
onMounted(() => {
  if (props.useCookies && props.id) {
    const textContent_check = getCookie(`${props.id}-textContent`)
    textContent.value = textContent_check ? textContent_check : textContent.value
  }
  textContentInput.value?.addEventListener('focusout', () => {
    textContentSpan.value?.classList.toggle('d-none')
    textContentInput.value?.classList.toggle('d-none')
  })
  textContentArea.value?.addEventListener('focusout', () => {
    textContentSpan.value?.classList.toggle('d-none')
    textContentArea.value?.classList.toggle('d-none')
  })
})
</script>
<template>
  <span @click="swapInput" ref="textContentSpan">{{ textContent }}</span>
  <input
    class="d-none"
    ref="textContentInput"
    type="text"
    :value="textContent"
    @input="updateTextContent"
    v-if="!props.textArea"
  />
  <textarea
    class="d-none"
    ref="textContentArea"
    :value="textContent"
    @input="updateTextContent"
    v-if="props.textArea"
  ></textarea>
</template>
<style scoped>
.d-none {
  display: none !important;
}
</style>
