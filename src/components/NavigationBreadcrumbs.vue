<template>
  <div>
    <div class="breadcrumbs">
      <a href="#" v-for="element in breadcrumbs" :key="element">
        {{ element }}
        <md-icon>keyboard_arrow_right</md-icon>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const breadcrumbs = ref(['Home', 'Women', 'Shoes'])
</script>

<style scoped>
.breadcrumbs {
  margin: 2em 0 1em;
  padding-top: 2em;
}

a {
  color: #666;
  font-size: 1.2em;
}

a:last-child {
  color: #333;
}

a:last-child i {
  display: none;
}

i {
  font-size: 1.4em !important;
}
</style>
