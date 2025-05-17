<script setup>
import LoadingDots from './LoadingDots.vue'

defineProps({
  text: {
    type: String,
    default: 'ثبت و ادامه',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  fixed: {
    type: Boolean,
    default: true,
  },
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <div :class="fixed ? 'fixed-button-container' : 'button-container'">
    <div class="button-wrapper">
      <button class="base-button" :disabled="disabled" @click="handleClick">
        <div v-if="disabled" class="loading-container">
          <LoadingDots />
        </div>
        <span v-else>{{ text }}</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.fixed-button-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 84px;
  background-color: var(--color-white);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-container {
  width: 100%;
  height: 84px;
  background-color: var(--color-white);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-wrapper {
  padding: var(--spacing-medium);
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}

.base-button {
  width: 100%;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary);
  color: var(--color-white);
  border: none;
  border-radius: 4px;
  font-family: inherit;
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-bold);
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.base-button:hover {
  background-color: #00a896;
}

.base-button:disabled {
  background-color: var(--color-primary);
  cursor: not-allowed;
}

.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

/* Responsive styles */
@media (min-width: 768px) {
  .button-wrapper {
    max-width: 720px;
    padding: var(--spacing-medium) var(--spacing-large);
  }
}

@media (min-width: 992px) {
  .button-wrapper {
    max-width: 224px;
  }
}
</style>
