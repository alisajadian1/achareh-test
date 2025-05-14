<script setup>
// You can define props if needed
defineProps({
  text: {
    type: String,
    default: 'ثبت و ادامه',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

// You can define emits if needed
const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <div class="fixed-button-container">
    <div class="fixed-button-wrapper">
      <button class="fixed-button" :disabled="disabled" @click="handleClick">
        {{ text }}
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
}

.fixed-button-wrapper {
  text-align: center;
  padding: var(--spacing-medium);
  max-width: 100%;
  margin: 0 auto;
}

.fixed-button {
  width: 224px;
  height: 46px;
  align-items: center;
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

.fixed-button:hover {
  background-color: #00a896;
}

.fixed-button:disabled {
  background-color: var(--color-gray);
  cursor: not-allowed;
}

/* Responsive styles */
@media (min-width: 768px) {
  .fixed-button-wrapper {
    max-width: 224px;
  }
}

@media (min-width: 992px) {
  .fixed-button-wrapper {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .fixed-button-wrapper {
    max-width: 1140px;
  }
}
</style>
