<template>
  <div>
    <transition name="fade">
      <div class="product">
        <div class="container">
          <breadcrumbs />
          <div class="row">
            <div class="col-md-5">
              <carousel />
            </div>
            <div class="col-md-7">
              <h1 class="product-name">{{ productPreview.title }}</h1>
              <rating />
              <div class="row no-gutters">
                <div class="col-md-5">
                  <small class="dark-muted-color text-uppercase d-block mb-2"
                    >sku: {{ productPreview.sku }}</small
                  >
                </div>
              </div>
              <span
                :class="[
                  'fancy-font',
                  'mr-2',
                  'product-price',
                  { 'muted-price': productPreview.sale },
                ]"
              >
                ${{ productPreview.price }}
              </span>
              <span v-if="productPreview.sale" class="product-price fancy-font deep-orange-text">
                ${{ salePrice }}
              </span>
              <div class="mt-2">
                <span
                  v-if="productPreview.inStock"
                  class="product-stock dark-muted-color font-bold d-block"
                  >in stock</span
                >
                <span
                  v-else
                  :class="[
                    'product-stock',
                    'font-bold',
                    'd-block',
                    { 'deep-orange-text': !productPreview.inStock },
                  ]"
                  >out of stock</span
                >
              </div>
              <size-variations :sizes="productPreview.sizes" @selectedSize="setSelectedSize" />
              <amount class="mb-4" @amount="setAmount" />
              <span v-if="sizeNotSelected" class="d-block mt-1 mb-1 text-danger"
                >Select the size first</span
              >
              <button
                class="cart-btn btn btn-lg button-accent ml-0 mr-0 p-3 waves-effect waves-light text-uppercase"
                :class="{ disabled: !productPreview.inStock }"
                @click="addToCart()"
                :disabled="!productPreview.inStock"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <product-details />
    <collection header="You might also like" class="pt-4 mt-4">
      <product-thumbnail
        v-for="item in suggestions"
        :key="item.id"
        :product="item"
      ></product-thumbnail>
    </collection>
    <offer />
    <app-footer />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import Rating from '@/components/Rating.vue'
import SizeVariations from '@/components/size/SizeVariations.vue'
import Carousel from '@/components/Carousel.vue'
import Breadcrumbs from '@/components/Breadcrumbs.vue'
import ProductDetails from '@/components/product/ProductDetails.vue'
import Offer from '@/components/Offer.vue'
import Collection from '@/components/Collection.vue'
import ProductThumbnail from '@/components/product/ProductThumbnail.vue'
import Amount from '@/components/Amount.vue'
import AppFooter from '@/components/Footer.vue'
import products from '@/services/productList'
import { useEcommerceStore } from '@/stores/ecommerce'

const ecommerceStore = useEcommerceStore()

// State
const selectedSize = ref(null)
const sizeNotSelected = ref(false)
const selectedAmount = ref(1)

// Computed
const productPreview = computed(() => ecommerceStore.productPreview)

const productPreviewId = computed(() => productPreview.value.id)

const salePrice = computed(() => {
  return productPreview.value.price * (1 - productPreview.value.salePercentage / 100)
})

const suggestions = computed(() => products.slice(0, 6))

// Methods
const resetSizeAndAmount = () => {
  selectedSize.value = null
  selectedAmount.value = 1
}

const setSelectedSize = (size) => {
  selectedSize.value = size
  if (sizeNotSelected.value) {
    sizeNotSelected.value = false
  }
}

const setAmount = (amount) => {
  selectedAmount.value = amount
}

const addToCart = () => {
  if (!selectedSize.value) {
    sizeNotSelected.value = true
    return
  }

  const { id, title, sku, price, salePercentage, color, image, sliderImages, sale } =
    productPreview.value
  const normalizedProduct = {
    id,
    title,
    sku,
    price,
    salePercentage,
    color,
    image,
    sliderImages,
    sale,
  }

  const selectedProductData = {
    ...normalizedProduct,
    amount: selectedAmount.value,
    size: selectedSize.value,
  }

  ecommerceStore.addToCart(selectedProductData).then(() => {
    // Note: You'll need to implement a notification system in Vue 3
    console.log('Item was added to the basket')
    sizeNotSelected.value = false
  })
}

// Watch
watch(productPreviewId, () => {
  resetSizeAndAmount()
})
</script>

<style scoped>
.product {
  margin-top: 3.5em;
  padding-bottom: 2em;

  @include device-size(xs, sm) {
    padding-bottom: 0;
  }
}
.product-name,
.product-price {
  font-weight: bold;
}
.product-price {
  font-size: 2em;
}
.muted-price {
  color: grey;
  text-decoration: line-through;
}
.button-accent {
  width: 235px;
  margin-top: 0.37em;
  box-shadow: none;
  &:hover {
    color: #fff;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
