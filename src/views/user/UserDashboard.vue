<template>
  <div class="dashboard mt-6 d-flex">
    <sidebar />
    <div class="content p-4">
      <h3 class="">Profile details</h3>
      <p>You can change you profile details below</p>
      <form>
        <div class="form-group">
          <label for="user-name">Name</label>
          <input
            v-model="name"
            type="text"
            class="form-control"
            id="user-name"
            placeholder="Name"
          />
        </div>
        <div class="form-group">
          <label for="user-email">E-mail</label>
          <input
            v-model="email"
            type="text"
            class="form-control"
            id="user-email"
            placeholder="E-mail"
          />
        </div>
        <div class="form-group">
          <label for="user-password">Password</label>
          <input
            v-model="password"
            type="password"
            class="form-control"
            id="user-password"
            placeholder="Password"
          />
        </div>
        <button type="submit" class="btn btn-sm btn-primary ml-0" disabled>Save</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from './Sidebar.vue'

const name = ref(null)
const email = ref(null)
const password = ref(null)
</script>

<style scoped>
.content {
  margin-top: 60px;
}
</style>
