<template>
  <div>
    <span class="font-weight-bold d-block mt-2 mb-2">{{ label }}</span>
    <div class="amount">
      <button class="btn m-0" :disabled="selectedAmount === 1" @click="decreaseAmount">-</button>
      <span class="amount-number border-dark">{{ selectedAmount }}</span>
      <button class="btn m-0" @click="increaseAmount">+</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useEcommerceStore } from '@/stores/ecommerce'

const props = defineProps({
  label: {
    type: String,
    default: 'Select amount',
  },
})

const emit = defineEmits(['amount'])

const ecommerceStore = useEcommerceStore()
const selectedAmount = ref(1)

const productPreview = computed(() => ecommerceStore.productPreview)
const productPreviewId = computed(() => productPreview.value.id)

watch(productPreviewId, () => {
  resetAmount()
})

const resetAmount = () => {
  selectedAmount.value = 1
}

const increaseAmount = () => {
  selectedAmount.value++
  emit('amount', selectedAmount.value)
}

const decreaseAmount = () => {
  if (selectedAmount.value <= 1) {
    return
  }
  selectedAmount.value--
  emit('amount', selectedAmount.value)
}
</script>

<style scoped>
.amount {
  display: inline-flex;
  align-items: center;
}

.amount .btn {
  padding: 5px 10px;
  box-shadow: none;
  color: inherit;
  border: 2px solid #666;
  line-height: 16px;
}

.amount .btn:first-of-type {
  border-right: none;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.amount .btn:last-of-type {
  border-left: none;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.amount .btn:disabled {
  border-color: #ccc;
  color: #ccc;
}

.amount-number {
  border: 2px solid #666;
  padding: 5px 10px;
  line-height: 16px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
