// 3. MODIFIED FILE: LocationPicker.vue
<script setup>
import { ref } from 'vue'

import MapPage from './MapPage.vue'
import SubmitButton from './SubmitButton.vue'
import LoadingDots from './LoadingDots.vue'

const emit = defineEmits(['goBack', 'userLocation'])

// Accept isLoading prop from parent
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false,
  },
})

const goPreviousStep = () => {
  emit('goBack')
}

const location = ref({ lat: null, lng: null })

const updateSelectedLocation = ({ lat, lng }) => {
  location.value = { lat, lng }
}

const showError = ref(false)

const sendCoordinates = () => {
  if (location.value.lat && location.value.lng) {
    emit('userLocation', { ...location })
    console.log('مختصات با موفقیت ثبت شد')
  } else {
    console.log('مختصات را روی نقشه انتخاب کنید')
    showError.value = true

    setTimeout(() => {
      showError.value = false
    }, 2000)
  }
}
</script>

<template>
  <section class="map-page-wrapper">
    <div class="header-container">
      <div v-if="showError" class="error-toast">لطفاً ابتدا موقعیت را روی نقشه انتخاب کنید</div>
      <button @click="goPreviousStep" class="step-back">
        <i>
          <img src="/src/assets/icons/arrow-right.svg" alt="step-back" class="arrow-icon" />
        </i>
      </button>
      <h1 class="section-title">انتخاب موقعیت</h1>
    </div>

    <div class="map-wrapper">
      <div class="map-container">
        <h2 class="location-heading">لطفا موقعیت مورد نظر خود را روی نقشه مشخص کنید</h2>
        <div class="map-content">
          <MapPage @userLocation="updateSelectedLocation" class="map-card" />
        </div>
      </div>
    </div>

    <!-- Loading overlay when isLoading is true -->
    <div v-if="isLoading" class="loading-overlay">
      <div class="loading-content">
        <LoadingDots />
        <span class="loading-text">در حال ثبت اطلاعات...</span>
      </div>
    </div>

    <!-- Submit Button -->
    <SubmitButton @click="sendCoordinates" :disabled="isLoading" text="ذخیره آدرس" />
  </section>
</template>

<style scoped>
.map-page-wrapper {
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.step-back {
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
}

.arrow-icon {
  width: 24px;
  height: 24px;
  stroke: #323232; /* does not apply to external SVGs */
  filter: brightness(0) saturate(100%) invert(20%) sepia(0%) saturate(0%) hue-rotate(0deg)
    brightness(100%) contrast(100%);
}

.section-title {
  font-size: var(--font-size-large);
  text-align: center;
  flex: 1;
}

.map-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-large);
}

.map-container {
  background-color: var(--color-white);
  box-shadow: 0 2px 10px gray;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.location-heading {
  font-size: var(--font-size-small);
  color: var(--color-text);
  padding: var(--spacing-large);
  margin: 0;
  border-bottom: 1px solid var(--color-border);
  display: none;
  text-align: center;
}

.map-content {
  width: 100%;
  height: calc(100vh - 170px);
  position: relative;
  overflow: hidden;
}

.error-toast {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #ff4d4f;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  font-weight: bold;
  z-index: 200;
  animation: fade 0.3s ease-in-out;
}

/* Loading overlay styles */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 84px; /* Adjust for button height */
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 150;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  padding: 24px 32px;
}

.loading-text {
  margin-top: 16px;
  font-size: var(--font-size-base);
  color: white;
}

@keyframes fade {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@media (min-width: 768px) {
  .map-page-wrapper {
    padding: var(--spacing-large) 0;
    max-width: 720px;
    margin: 0 auto;
  }

  .map-content {
    height: 340px;
  }

  .bottom-spacing {
    height: 80px;
    width: 100%;
  }
}

@media (min-width: 992px) {
  .map-page-wrapper {
    max-width: 808px;
  }

  .header-container {
    justify-content: flex-start;
  }

  .section-title {
    text-align: right;
    flex: unset;
    margin-right: var(--spacing-small);
  }

  .map-container {
    width: 100%;
    max-width: 808px;
  }

  .map-content {
    height: 380px;
  }

  .location-heading {
    padding: 10px 48px;
    text-align: right;
    display: block;
  }
}
</style>
