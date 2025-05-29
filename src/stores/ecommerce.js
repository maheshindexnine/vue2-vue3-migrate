import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useEcommerceStore = defineStore('ecommerce', () => {
  // State
  const selectedProduct = ref(null)
  const inCart = ref([])
  const productPreview = ref(null)
  const user = ref(null)

  // Getters
  const cartTotal = computed(() => {
    return inCart.value.reduce((acc, cur) => {
      if (cur.salePercentage) {
        const priceAfterDiscount = cur.price - Math.floor((cur.salePercentage / 100) * cur.price)
        return acc + priceAfterDiscount * cur.amount
      }
      return acc + cur.price * cur.amount
    }, 0)
  })

  const cartAmount = computed(() => {
    return inCart.value.reduce((acc, cur) => acc + cur.amount, 0)
  })

  const userName = computed(() => user.value?.displayName || '')
  const userEmail = computed(() => user.value?.email || '')

  // Actions
  const setUser = (userData) => {
    user.value = userData
  }

  const clearUser = () => {
    user.value = null
  }

  const addToCart = (product) => {
    const foundInCart = inCart.value.some(
      (item) => item.id === product.id && item.size === product.size,
    )

    if (foundInCart) {
      inCart.value = inCart.value.map((item) => {
        if (item.id === product.id && item.size === product.size) {
          return { ...item, amount: item.amount + product.amount }
        }
        return item
      })
    } else {
      inCart.value.push(product)
    }
  }

  const removeFromCart = ({ id, size }) => {
    const productIndex = inCart.value.findIndex(
      (cartItem) => cartItem.id === id && cartItem.size === size,
    )
    if (productIndex > -1) {
      inCart.value.splice(productIndex, 1)
    }
  }

  const setProductToPreview = (product) => {
    productPreview.value = product
  }

  const login = async (email, password) => {
    try {
      const userCredential = {
        user: {
          displayName: 'Mahesh Gaikwad',
          email: email,
        },
      }
      const { displayName, email: userEmail } = userCredential.user
      setUser({ displayName, email: userEmail })
      return true
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const register = async (name, email, password) => {
    try {
      const userCredential = {
        user: {
          displayName: name,
          email: email,
        },
      }
      const currentUser = userCredential.user
      await currentUser.updateProfile({ displayName: name })
      setUser({ displayName: name, email })
      return true
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      clearUser()
      return true
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  return {
    // State
    selectedProduct,
    inCart,
    productPreview,
    user,

    // Getters
    cartTotal,
    cartAmount,
    userName,
    userEmail,

    // Actions
    setUser,
    clearUser,
    addToCart,
    removeFromCart,
    setProductToPreview,
    login,
    register,
    logout,
  }
})
