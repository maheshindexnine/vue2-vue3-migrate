<template>
  <div>
    <div class="size-variations pt-2">
      <span class="d-block font-weight-bold mt-2 mb-2">Select size</span>
      <div class="row no-gutters">
        <div class="col-md-5">
          <div
            v-for="size in sizes"
            :key="size.index"
            class="sizes mb-1 waves-effect waves-light"
            :class="{
              'size-selected': selectedSize === size.number,
              'size-disabled': !size.available,
            }"
            :disabled="!size.available"
            @click="selectShoesSize(size.number)"
          >
            <span class="single-size text-uppercase">{{ size.number }}</span>
          </div>
        </div>
        <div class="col">
          <a
            href="#sizeGuideModal"
            class="size-guide-link mb-3 ml-3"
            data-toggle="modal"
            data-target="#sizeGuideModal"
          >
            <md-icon>straighten</md-icon>
            <span class="link-text">Size guide</span>
          </a>
        </div>
      </div>
    </div>
    <size-guide />
    <transition name="fade">
      <p v-if="selectedSize">
        Selected size:
        <span class="accent font-weight-bold">{{ selectedSize }}</span>
      </p>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import SizeGuide from './SizeGuide.vue'
import { useEcommerceStore } from '@/stores/ecommerce'

const props = defineProps({
  sizes: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['selectedSize'])

const ecommerceStore = useEcommerceStore()
const selectedSize = ref(null)

const productPreview = computed(() => ecommerceStore.productPreview)
const productPreviewId = computed(() => productPreview.value.id)

watch(productPreviewId, () => {
  resetSize()
})

const resetSize = () => {
  selectedSize.value = null
}

const selectShoesSize = (number) => {
  emit('selectedSize', number)
  selectedSize.value = number
}
</script>

<style scoped>
.size-name {
  font-size: 1.3em;

  .accent {
    color: #333;
  }
}
.sizes {
  display: inline-block;
  width: 30px;
  height: 30px;
  background-color: #33b5e5;
  margin-right: 0.5em;
  text-align: center;
  font-size: 1em;
  color: #fff;
  line-height: 2.2;
  cursor: pointer;
}
.size-selected {
  background-color: #0099cc;
}
.size-disabled {
  background-color: #ccc;
  pointer-events: none;
}
.size-guide-link {
  margin-top: 0.2em;
  color: #666;
  display: block;
  font-size: 1.2em;

  .link-text {
    margin-left: 0.3em;
  }

  &:hover {
    color: #ccc;
    text-decoration: none;
  }
}
</style>
