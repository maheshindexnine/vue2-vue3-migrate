<template>
  <div class="sidebar-container">
    <h3 class="sidebar-header pl-3 pt-4 pb-3">Your profile</h3>
    <div class="separator"></div>
    <div class="sidebar-user mt-3 ml-3 mb-2">Hello, {{ userName }}</div>
    <div class="sidebar-user mt-3 ml-3 mb-2">{{ userEmail }}</div>
    <div class="separator mt-3 mb-4"></div>
    <button class="logout-btn button-reset text-white ml-3" @click="logout()">
      <md-icon class="icon-sm">logout</md-icon>Logout
    </button>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { fb } from '@/firebase'
import { useEcommerceStore } from '@/stores/ecommerce'

const ecommerceStore = useEcommerceStore()
const router = useRouter()

const user = computed(() => ecommerceStore.user)

const userName = computed(() => (user.value ? user.value.displayName : ''))
const userEmail = computed(() => (user.value ? user.value.email : ''))

const logout = () => {
  fb.auth()
    .signOut()
    .then(() => {
      ecommerceStore.clearUser()
      // Note: You'll need to implement a notification system in Vue 3
      console.log('You logged out successfully')
      router.push('/')
    })
    .catch(() => {
      // Note: You'll need to implement a notification system in Vue 3
      console.error('Logout error')
    })
}
</script>

<style scoped>
.sidebar-container {
  margin-top: 60px;
  width: 240px;
  height: 93.9vh;
  background-color: $dark-blue;
}
.sidebar-header {
  color: #fff;
}
.btn {
  &.btn-link {
    color: #fff;
  }
}
.sidebar-user {
  color: #fff;
}
.separator {
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
}
</style>
