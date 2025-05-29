<template>
  <div
    class="modal fade"
    ref="userLoginModal"
    id="userLoginModal"
    tabindex="-1"
    role="dialog"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header text-center">
          <ul class="nav nav-tabs" id="loginTab" role="tablist">
            <li class="nav-item">
              <a
                class="nav-link active mr-1"
                id="login-tab"
                data-toggle="tab"
                href="#login"
                role="tab"
                aria-controls="login"
                aria-selected="true"
                >Login</a
              >
            </li>
            <li class="nav-item">
              <a
                class="nav-link ml-1"
                id="register-tab"
                data-toggle="tab"
                href="#register"
                role="tab"
                aria-controls="register"
                aria-selected="false"
                >Register</a
              >
            </li>
          </ul>
        </div>
        <div class="modal-body mx-3">
          <div class="tab-content" id="myTabContent">
            <!-- Login -->
            <div
              class="tab-pane fade show active"
              id="login"
              role="tabpanel"
              aria-labelledby="login-tab"
            >
              <div class="md-form mb-2 mt-3">
                <md-icon class="prefix grey-text">email</md-icon>
                <input
                  type="email"
                  id="login-email"
                  v-model="email"
                  class="form-control validate mb-2"
                />
                <label data-error="wrong" data-success="right" for="login-email">Your email</label>
              </div>
              <div class="md-form mb-2">
                <md-icon class="prefix grey-text">lock</md-icon>
                <input
                  type="password"
                  id="login-pass"
                  v-model="password"
                  class="form-control validate mb-2"
                  @keyup.enter="login"
                />
                <label data-error="wrong" data-success="right" for="login-pass"
                  >Your password</label
                >
              </div>
              <button class="login-btn btn btn-primary btn-block mb-2 mt-4" @click="login()">
                Login
              </button>
            </div>
            <!-- Register -->
            <div class="tab-pane fade" id="register" role="tabpanel" aria-labelledby="register-tab">
              <div class="md-form pb-2 mt-2">
                <md-icon class="prefix grey-text">account_circle</md-icon>
                <input
                  type="text"
                  id="register-name"
                  v-model="name"
                  class="form-control validate mb-2"
                />
                <label data-error="wrong" data-success="right" for="register-name">Your name</label>
              </div>
              <div class="md-form pb-2 mt-2">
                <md-icon class="prefix grey-text">email</md-icon>
                <input
                  type="email"
                  id="register-email"
                  v-model="email"
                  class="form-control validate mb-2 mt-4"
                />
                <label data-error="wrong" data-success="right" for="register-email"
                  >Your email</label
                >
              </div>
              <div class="md-form pb-2 mt-2">
                <md-icon class="prefix grey-text">lock</md-icon>
                <input
                  type="password"
                  id="register-pass"
                  v-model="password"
                  class="form-control validate mb-2"
                />
                <label data-error="wrong" data-success="right" for="register-pass"
                  >Your password</label
                >
              </div>
              <button
                class="register-btn btn btn-default btn-block mb-2 mt-4"
                @click="registerUser()"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import $ from 'jquery'
import { useEcommerceStore } from '@/stores/ecommerce'

const router = useRouter()
const ecommerceStore = useEcommerceStore()

// State
const name = ref(null)
const email = ref(null)
const password = ref(null)
const userLoginModal = ref(false)

// Methods
const registerUser = async () => {
  try {
    const currentUser = ecommerceStore.user
    await currentUser.updateProfile({ displayName: name.value })

    // Note: You'll need to implement a notification system in Vue 3
    console.log('You successfully registered your account')

    $('#userLoginModal').modal('hide')
    router.push('/user-dashboard')
  } catch (error) {
    if (error.code === 'auth/weak-password') {
      console.error('The password is too weak')
      return
    }
    console.error(error.message)
  }
}

const login = async () => {
  try {
    $('#userLoginModal').modal('hide')
    router.push('/user-dashboard')
  } catch (error) {
    if (error.code === 'auth/wrong-password') {
      console.error('Wrong password')
      return
    }
    console.error(error.message)
  }
}
</script>

<style scoped>
.md-form {
  .prefix {
    top: 0.4rem;
  }
}
.modal-header {
  border-bottom: 0;
  background-color: #0099cc;
}
.modal-footer {
  border-top: 0;
}
.nav-tabs {
  width: 100%;
  border-bottom: 0;

  .nav-link {
    text-transform: uppercase;
    color: #fff;

    &:hover {
      text-decoration: none;
    }

    &.active {
      color: #666;
    }

    &:not(.active):hover {
      border-color: transparent;
      background-color: rgba(255, 255, 255, 0.3);
    }
  }

  .nav-item {
    flex: 1 !important;
  }
}
</style>
