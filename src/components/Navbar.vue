<template>
  <div class="app-header">
    <!--Navbar-->
    <nav class="navbar navbar-dark info-color fixed-top scrolling-navbar">
      <!-- Navbar brand -->
      <router-link to="/" class="navbar-brand">
        <img :src="logo" style="width: 35px; margin-left: 20px" />
      </router-link>
      <ul class="navbar-nav ml-auto navbar-icons">
        <li class="nav-item">
          <UserPopover>
            <template #activator>
              <a class="nav-link font-weight-bolder text-large">
                User
                <md-icon>account_circle</md-icon>
              </a>
            </template>
            <template #content>
              <div class="popover-content">
                <span class="popover-arrow"></span>
                <a
                  v-if="!user"
                  class="register-btn popover-item popover-link font-weight-bolder"
                  href="#userLoginModal"
                  data-toggle="modal"
                  data-target="#userLoginModal"
                  @click="openRegisterTab"
                >
                  <span class="popover-text">Register</span>
                </a>
                <a
                  v-if="!user"
                  class="login-btn popover-item popover-link font-weight-bolder"
                  href="#userLoginModal"
                  data-toggle="modal"
                  data-target="#userLoginModal"
                  @click="openLoginTab"
                >
                  <span class="popover-text">Login</span>
                </a>
                <router-link
                  v-if="!!user"
                  class="user-profile popover-item popover-link font-weight-bolder"
                  to="/user-dashboard"
                  >User profile</router-link
                >
                <div v-if="!!user" class="popover-item popover-link">
                  <button class="logout-btn button-reset font-weight-bolder" @click="logout()">
                    Logout
                  </button>
                </div>
              </div>
            </template>
          </UserPopover>
        </li>
        <li class="nav-item">
          <a
            href="#shoppingCartModal"
            class="nav-link font-weight-bolder text-large"
            data-toggle="modal"
            data-target="#shoppingCartModal"
          >
            <span v-show="inCart.length > 0" class="cart-counter">{{ inCart.length }}</span>
            <span class="mr-1">Cart</span>
            <md-icon>shopping_cart</md-icon>
          </a>
        </li>
      </ul>
      <!-- Collapse button -->
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#basicExampleNav"
        aria-controls="basicExampleNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Collapsible content -->
      <div class="collapse navbar-collapse" id="basicExampleNav">
        <!-- Links -->
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              Women
              <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Men</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Children</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Sale</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">About Us</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Your order</a>
          </li>
        </ul>
        <!-- Links -->
      </div>
      <!-- Collapsible content -->
    </nav>
    <!--/.Navbar-->
    <Login />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Login from '@/components/user/Login.vue'
import UserPopover from '@/components/Popover.vue'
import $ from 'jquery'
import { useEcommerceStore } from '@/stores/ecommerce'

const ecommerceStore = useEcommerceStore()
const router = useRouter()
const route = useRoute()

// State
const logo = ref('../assets/logo.svg')

// Computed
const user = computed(() => ecommerceStore.user)
const inCart = computed(() => ecommerceStore.inCart)

// Methods
const openRegisterTab = () => {
  $('#loginTab a[href="#register"]').tab('show')
}

const openLoginTab = () => {
  $('#loginTab a[href="#login"]').tab('show')
}

const clearUser = () => {
  return ecommerceStore.clearUser()
}

const logout = async () => {
  try {
    await clearUser()

    // Note: You'll need to implement a notification system in Vue 3
    // This is a placeholder for the notification
    console.log('You logout successfully')

    if (route.name !== 'Home') {
      router.push('/')
    }
  } catch (error) {
    console.error('Logout error:', error)
  }
}
</script>

<style scoped>
.app-header {
  border-bottom: 1px solid #ccc;
}

.navbar.navbar-dark .navbar-nav .nav-item .nav-link {
  padding: 10px;
  position: relative;
}

.navbar.navbar-dark .navbar-nav .nav-item .nav-link:hover {
  text-decoration: none;
}

.navbar .navbar-brand {
  width: 30px;
}

.navbar-nav.navbar-icons {
  flex-direction: row;
  flex-wrap: nowrap;
}

.navbar-nav.navbar-icons .nav-item {
  display: inherit;
}

.info-color {
  background-color: #0099cc !important;
}

.cart-counter {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #ff5722;
  text-align: center;
  font-weight: bold;
  font-size: 0.8em;
  color: #fff;
  position: absolute;
  top: 0;
  right: -0.2em;
}
</style>
