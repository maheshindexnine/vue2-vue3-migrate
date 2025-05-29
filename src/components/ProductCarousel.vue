<template>
  <div>
    <!--Carousel Wrapper-->
    <div id="carousel-product-view" class="carousel slide carousel-fade" data-interval="8000">
      <!--Indicators-->
      <ol class="carousel-indicators">
        <li
          data-target="#carousel-product-view"
          data-slide-to="index"
          class="waves-effect waves-light"
          v-for="(value, index) in productPreview.sliderImages"
          :key="index"
        >
          <img :src="value" class="d-block w-100" />
        </li>
      </ol>
      <!--/.Indicators-->
      <!--Slides-->
      <div class="carousel-inner" role="listbox">
        <!--First slide-->
        <div
          class="carousel-item"
          v-for="(value, index) in productPreview.sliderImages"
          :key="index"
          :class="{ active: index === 0 }"
        >
          <img :src="value" class="d-block w-100" alt="First slide" />
        </div>
        <!--/First slide-->
      </div>
      <!--/.Slides-->
    </div>
    <!--/.Carousel Wrapper-->
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useEcommerceStore } from '@/stores/ecommerce'

const ecommerceStore = useEcommerceStore()
const productPreview = computed(() => ecommerceStore.productPreview)
</script>

<style scoped>
.carousel {
  margin-bottom: 4.5em;
}

@media (min-width: 576px) {
  .carousel {
    margin-bottom: 5.5em;
  }
}

.slider {
  width: 100%;
  background-color: #ccc;
  height: 600px;
}

.carousel-indicators {
  bottom: -6.8em;
  margin-left: 25%;
  margin-right: 25%;
}

.carousel-indicators li {
  width: auto;
  height: 60px;
  background-color: transparent;
  border-radius: 0;
}

.carousel-indicators li:before,
.carousel-indicators li:after {
  display: none;
}
</style>
