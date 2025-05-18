<script setup>
import { ref, onMounted } from 'vue'
import L from 'leaflet'

const emit = defineEmits(['userLocation'])

let map
let marker

const loadMapErr = ref('')

//Locating the user location when clicking on the locating button
const goToUserLocation = () => {
  if (!map) return

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude
      const lng = position.coords.longitude
      const userLatLng = [lat, lng]

      map.setView(userLatLng, 15)

      if (marker) {
        marker.setLatLng(userLatLng)
      } else {
        marker = L.marker(userLatLng).addTo(map)
      }

      emit('userLocation', { lat, lng })
      loadMapErr.value = ''
    },
    (err) => {
      loadMapErr.value = 'دسترسی به موقعیت مکانی امکان پذیر نیست'
      setTimeout(() => {
        loadMapErr.value = ''
      }, 2000)
      console.error(err)
    },
  )
}

// Loading the map and error -- choosing the location with marker
onMounted(() => {
  const initialLatLng = [35.6892, 51.389] // Tehran
  map = L.map('map').setView(initialLatLng, 13)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  })
    .addTo(map)
    .on('tileerror', () => {
      loadMapErr.value = 'نقشه بارگزاری نشد، لطفا دوباره تلاش کنید'
      console.log('خطا در بارگزاری نقشه')
      setTimeout(() => {
        loadMapErr.value = ''
      }, 2000)
    })

  marker = L.marker(initialLatLng).addTo(map)

  // Allow user to click map to choose location
  map.on('click', function (e) {
    const { lat, lng } = e.latlng

    marker.setLatLng(e.latlng)
    emit('userLocation', { lat, lng })
  })
})
</script>

<template>
  <section>
    <div id="map" class="map"></div>
    <button @click="goToUserLocation" class="locate-button">
      <img src="/src/assets/icons/locate-button.svg" alt="locate button" />
    </button>
    <p v-if="loadMapErr" class="map-error">{{ loadMapErr }}</p>
  </section>
</template>

<style scoped>
.map {
  width: 100%;
  height: 100vh;
  box-shadow: 5px 2px 5px gray;
  overflow: hidden;
}

.map-wrapper {
  position: relative;
}

.locate-button {
  background-color: transparent;
  position: absolute;
  bottom: 16px;
  right: 24px;
  z-index: 1000;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.map-error {
  position: absolute;
  top: 60px;
  left: 16px;
  right: 16px;
  background-color: #ffe6e6;
  color: #c62828;
  padding: 10px;
  border-radius: 8px;
  font-size: var(--font-size-base);
  text-align: center;
  z-index: 1000;
}
</style>
