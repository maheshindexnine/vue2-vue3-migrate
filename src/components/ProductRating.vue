<template>
  <div>
    <span class="font-weight-bold">Product rating</span>
    <div class="d-flex align-items-center mb-2">
      <star-rating
        :show-rating="false"
        :increment="0.5"
        :max-rating="5"
        :rating="productRating"
        :read-only="true"
        inactive-color="#000"
        active-color="#ffd055"
        v-bind:star-size="22"
      ></star-rating>
      <span class="d-inline-block ml-3 mt-1">(15 reviews)</span>
    </div>
  </div>
</template>

<script setup>
// import StarRating from "vue-star-rating";

defineProps({
  productRating: {
    type: Number,
    required: true,
  },
})
</script>

<style scoped>
.font-weight-bold {
  font-weight: 500;
}

.d-flex {
  display: flex;
}

.align-items-center {
  align-items: center;
}

.mb-2 {
  margin-bottom: 0.5rem;
}

.ml-3 {
  margin-left: 1rem;
}

.mt-1 {
  margin-top: 0.25rem;
}

.d-inline-block {
  display: inline-block;
}
</style>
