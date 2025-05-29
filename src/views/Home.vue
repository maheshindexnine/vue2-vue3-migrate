<template>
  <div class="mt-5">
    <page-header class="mb-4" />
    <collection header="New Collection" class="pt-4">
      <product-thumbnail
        v-for="item in showThreeProducts"
        :key="item.id"
        :product="item"
      ></product-thumbnail>
    </collection>
    <collection header="Sale" class="mt-4 mb-4">
      <product-thumbnail
        v-for="item in saleCollection"
        :key="item.id"
        :product="item"
      ></product-thumbnail>
    </collection>
    <app-footer />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import PageHeader from '@/components/PageHeader.vue'
import Collection from '@/components/Collection.vue'
import ProductThumbnail from '@/components/product/ProductThumbnail.vue'
import AppFooter from '@/components/Footer.vue'
import products from '@/services/productList'

// State
const productsList = products

// Computed
const newCollection = computed(() => {
  return productsList.filter((product) => product.offer === 'New')
})

const showThreeProducts = computed(() => {
  return newCollection.value.slice(0, 3)
})

const saleCollection = computed(() => {
  return productsList.filter((product) => product.offer === 'Sale')
})
</script>
