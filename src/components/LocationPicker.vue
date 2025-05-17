<script setup>
import { ref } from 'vue'

import MapPage from './MapPage.vue'
import SubmitButton from './SubmitButton.vue'

const emit = defineEmits(['goBack', 'userLocation'])

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
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.5 12H19.5"
              stroke="#323232"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M13.5 6L19.5 12L13.5 18"
              stroke="#323232"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </i>
      </button>
      <h1 class="section-title">انتخاب موقعیت</h1>
    </div>

    <div class="map-wrapper">
      <div class="map-container">
        <h2 class="location-heading">لطفا موقعیت مورد نظر خود را روی نقشه مشخص کنید</h2>
        <div class="map-content">
          <MapPage @userLocation="updateSelectedLocation" class="map-cart" />
        </div>
      </div>
    </div>

    <div class="bottom-spacing"></div>

    <!-- Submit Button -->
    <SubmitButton @click="sendCoordinates"> </SubmitButton>
  </section>
</template>

<style scoped>
.map-page-wrapper {
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: var(--color-border);
  padding-bottom: calc(var(--spacing-large) + 80px);
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: var(--spacing-small) var(--spacing-small);
}

.step-back {
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
}

.section-title {
  font-size: 1.25rem;
  text-align: center;
  flex: 1;
}

.map-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-large);
  height: calc(100vh - 200px);
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
  height: calc(100vh - 200px);
  position: relative;
  overflow: hidden;
}

.bottom-spacing {
  height: 20px;
  width: 100%;
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
