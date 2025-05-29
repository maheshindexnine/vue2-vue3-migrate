<template>
  <div class="custom-popover">
    <!-- activator goes here -->
    <div @click="openPopover" v-click-outside="closePopover" v-if="$slots.activator">
      <slot name="activator"></slot>
    </div>
    <!-- content goes here -->
    <div v-show="isOpen" v-if="$slots.content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// import { vClickOutside } from 'vue-click-outside'

const isOpen = ref(false)

const openPopover = () => {
  isOpen.value = true
}

const closePopover = () => {
  isOpen.value = false
}
</script>

<style scoped>
.popover {
  width: 200px;
  background-color: #005580;
  color: #fff;
  border-radius: 0;
  border: 0;
  margin-top: 0.5em;
  box-shadow:
    0 2px 5px 0 rgba(0, 0, 0, 0.16),
    0 2px 10px 0 rgba(0, 0, 0, 0.12);
}

.popover .popover-body {
  padding: 0;
}

.popover .arrow {
  display: none;
}

.popover-item {
  padding: 0.5em 1em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
}

.popover-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.popover-item:last-child {
  border-bottom: 0;
}
</style>
