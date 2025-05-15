<script setup>
import { ref } from 'vue'

import MapPage from './MapPage.vue'
import SubmitButton from './SubmitButton.vue'

const selectedLocation = ref({ lat: null, lng: null })

const updateLocation = ({ lat, lng }) => {
  selectedLocation.value = { lat, lng }
  console.log('selected location:', selectedLocation.value)
}

const handleSubmit = () => {
  if (selectedLocation.value.lat && selectedLocation.value.lng) {
    console.log('مختصات ارسال شد')
  } else {
    console.log('ارسال مختصات با خطا مواجه شد')
  }
}
</script>

<template>
  <section class="map-page-wrapper">
    <div class="header-container">
      <h1 class="section-title">انتخاب موقعیت</h1>
    </div>

    <div class="map-wrapper">
      <div class="map-container">
        <h2 class="location-heading">لطفا موقعیت مورد نظر خود را روی نقشه مشخص کنید</h2>
        <div class="map-content">
          <MapPage @locationSelected="updateLocation" class="map-cart" />
        </div>
      </div>
    </div>

    <div class="bottom-spacing"></div>

    <!-- Submit Button -->
    <SubmitButton @click="handleSubmit" :disabled="!selectedLocation.lat || !selectedLocation.lng">
    </SubmitButton>
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
  margin-bottom: var(--spacing-small);
  margin-top: var(--spacing-small);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.map-wrapper {
  flex: 1;
  display: flex;
  justify-content: center;
  margin-bottom: var(--spacing-large);
  height: calc(100vh-200px);
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
  height: 20px; /* Adjust based on the height of your fixed button */
  width: 100%;
}

/* Tablet and above breakpoints */
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
    height: 80px; /* Adjust based on the height of your fixed button */
    width: 100%;
  }
}

/* Desktop breakpoints */
@media (min-width: 992px) {
  .map-page-wrapper {
    max-width: 808px;
  }

  .header-container {
    justify-content: right;
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

/* Large Desktop breakpoints */
@media (min-width: 1200px) {
}
</style>
