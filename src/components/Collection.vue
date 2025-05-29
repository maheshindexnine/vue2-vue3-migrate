<template>
  <div>
    <div class="collection" id="product-grid">
      <div class="container">
        <h1 class="collection-header">{{ header }}</h1>
        <div class="row collection-items">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  header: {
    type: String,
    required: true,
  },
})
</script>

<style scoped>
.collection {
  text-align: center;
}
.collection-header {
  color: #333;
  font-weight: bold;
}
.collection-items {
  margin-top: 2em;
}
</style>
