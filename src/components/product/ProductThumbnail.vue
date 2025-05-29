<template>
  <div class="col-md-4 col-sm-6">
    <router-link :to="'/product/' + product.id" class="product-link">
      <div class="product-thumbnail pb-2" @click="showProduct()">
        <div v-if="!product.sale" class="offer-tag">{{ product.offer }}</div>
        <div v-else class="offer-tag" :class="{ accent: product.sale }">
          {{ `-${product.salePercentage}%` }}
        </div>
        <div class="product-image">
          <img :src="product.image" />
        </div>
        <h3 class="fancy-font mt-2 mb-2">{{ product.title }}</h3>
        <span class="product-price fancy-font" :class="{ 'sale-price': product.sale }">
          ${{ product.price }}
        </span>
        <span v-if="product.sale" class="product-price fancy-font deep-orange-text">
          ${{ salePrice }}
        </span>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useEcommerceStore } from '@/stores/ecommerce'

const ecommerceStore = useEcommerceStore()

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const salePrice = computed(() => {
  return props.product.price * (1 - props.product.salePercentage / 100)
})

const showProduct = () => {
  ecommerceStore.setProductToPreview(props.product)
}
</script>

<style scoped>
.product-thumbnail {
  width: 100%;
  margin-bottom: 1.5em;
  background-color: #f2f2f2;
  position: relative;
  color: #666;
}

.product-thumbnail:hover .product-image img {
  transform: scale(1.1);
  transition: all 0.5s linear;
}

.offer-tag {
  width: 40px;
  height: 40px;
  background-color: #0099cc;
  color: #fff;
  line-height: 2.8;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

.product-image {
  width: 100%;
  background-color: #f2f2f2;
  overflow: hidden;
}

.product-image img {
  transition: all 0.5s linear;
}

.product-price {
  color: grey;
  font-size: 2em;
}

.product-link:hover {
  text-decoration: none;
}

.accent {
  background-color: #ff5722;
}

.btn {
  margin: 0.5em auto;
  display: block;
}

.sale-price {
  text-decoration: line-through;
  margin: 0 0.5em;
}
</style>
