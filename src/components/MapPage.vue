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

      // Move the map to user's location
      map.setView(userLatLng, 15)

      // Update or create marker
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
      <svg
        width="82"
        height="82"
        viewBox="0 0 82 82"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_d_21_1088)">
          <circle cx="41" cy="41" r="29" fill="white" />
        </g>
        <path
          d="M41.0002 50.9168C46.477 50.9168 50.9168 46.477 50.9168 41.0002C50.9168 35.5233 46.477 31.0835 41.0002 31.0835C35.5233 31.0835 31.0835 35.5233 31.0835 41.0002C31.0835 46.477 35.5233 50.9168 41.0002 50.9168Z"
          stroke="#37474F"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M40.9998 43.8332C42.5646 43.8332 43.8332 42.5646 43.8332 40.9998C43.8332 39.435 42.5646 38.1665 40.9998 38.1665C39.435 38.1665 38.1665 39.435 38.1665 40.9998C38.1665 42.5646 39.435 43.8332 40.9998 43.8332Z"
          fill="#37474F"
          stroke="#37474F"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M41 53.7502V48.0835"
          stroke="#37474F"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M41 28.25V33.9167"
          stroke="#37474F"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M33.9167 41H28.25"
          stroke="#37474F"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M53.7502 41H48.0835"
          stroke="#37474F"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <defs>
          <filter
            id="filter0_d_21_1088"
            x="0"
            y="0"
            width="82"
            height="82"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="6" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_21_1088" />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_21_1088"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
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
