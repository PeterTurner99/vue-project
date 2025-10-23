<script setup lang="ts">
import MoveableCard from '@/components/MoveableCard/MoveableCard.vue'
import MoveableCardContent from '@/components/MoveableCard/MoveableCardContent.vue'
import MoveableCardHeader from '@/components/MoveableCard/MoveableCardHeader.vue'
import { onMounted, ref } from 'vue'
import { getCookie, saveCookie } from '@/Lib/Cookies.vue'
import type { MoveableCardType } from '@/components/MoveableCard/MoveableCardTypes'
const titleText = ref('')
const titleSpan = ref<HTMLElement | null>(null)
const titleInput = ref<HTMLElement | null>(null)
const CardList = ref<MoveableCardType[]>([])
const reorder_cards = (id_changed: number | null, card: MoveableCardType | null | undefined) => {
  const list_length = CardOrder.value?.length
  if (list_length && list_length > 0) {
    if (id_changed !== null) {
      CardOrder.value = CardOrder.value!.filter(function (item: number) {
        return item != id_changed
      })
    } else {
      id_changed = list_length
    }

    CardOrder.value!.push(id_changed)
  } else {
    if (id_changed !== null) {
      CardOrder.value?.push(id_changed)
    } else {
      CardOrder.value?.push(0)
      card!.id = 0
      CardList.value?.push(card!)
    }
  }
  saveCookie('cards', CardList.value)
  saveCookie('card_order', CardOrder.value)
}
const card_moved_or_resized = (card: MoveableCardType) => {
  CardList.value = CardList.value!.map(function (item: MoveableCardType) {
    if (item.id == card.id) {
      return card
    }
    return item
  })
  saveCookie('cards', CardList.value)
  saveCookie('card_order', CardOrder.value)
}

const updateTitle = (event: Event) => {
  const target = event.target as HTMLInputElement
  titleText.value = target!.value
  saveCookie('title', target!.value)
}
const CardOrder = ref<number[]>([])
const swapInput = () => {
  titleSpan.value?.classList.toggle('d-none')
  titleInput.value?.classList.toggle('d-none')
  titleInput.value?.focus()
}
onMounted(() => {
  titleText.value = getCookie('title')
  titleInput.value?.addEventListener('focusout', () => {
    titleSpan.value?.classList.toggle('d-none')
    titleInput.value?.classList.toggle('d-none')
  })
  CardList.value = getCookie('cards') ? getCookie('cards') : []
  CardOrder.value = getCookie('card_order') ? getCookie('card_order') : []
})
</script>

<template>
  <main>
    <div class="centered">
      <h3 class="swappable_title">
        <span @click="swapInput" ref="titleSpan">{{ titleText }}</span
        ><input
          class="d-none"
          ref="titleInput"
          type="text"
          :value="titleText"
          @input="updateTitle"
        />
      </h3>
      <div>
        <template v-for="index in CardOrder" :key="index + '_card'">
          <template v-for="card in [CardList[index]]" :key="card.id + '_card_inner'">
            <MoveableCard
              @layer-changed="reorder_cards"
              @card-moved="card_moved_or_resized"
              @card-resized="card_moved_or_resized"
              :Resizeable="card.resizeable"
              :Measurement="card.measurement"
              :left="card.left"
              :top="card.top"
              :width="card.width"
              :height="card.height"
              :id="card.id"
              :header="card.header"
              :content="card.content"
            >
              <MoveableCardHeader :v-if="card.header">{{ card.header }}</MoveableCardHeader>
              <MoveableCardContent :v-if="card.content">{{ card.content }} </MoveableCardContent>
            </MoveableCard>
          </template>
        </template>
      </div>
    </div>
  </main>
</template>

<style scoped>
.centered {
  text-align: center;
}
.d-none {
  display: none;
}
.swappable_title {
  border: 1px solid grey;
  padding: 10px 15px;
  border-radius: 5px;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;
}
</style>
