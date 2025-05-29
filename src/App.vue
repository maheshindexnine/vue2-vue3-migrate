<template>
  <div id="app">
    <Navbar />
    <Cart />
    <transition name="fade">
      <router-view />
      <!-- temp comment -->
    </transition>
    <!-- <notifications classes="notifications" /> -->
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Cart from '@/components/Cart.vue'
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
