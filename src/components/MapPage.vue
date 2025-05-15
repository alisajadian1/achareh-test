<script setup>
import { onMounted } from 'vue'
import L from 'leaflet'

const emit = defineEmits(['locationSelected'])

onMounted(() => {
  const initialLatLng = [35.6892, 51.389]
  const map = L.map('map').setView(initialLatLng, 13) // Tehran coordinates

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map)

  let marker = L.marker(initialLatLng).addTo(map)

  map.on('click', function (e) {
    const { lat, lng } = e.latlng

    if (marker) {
      marker.setLatLng(e.latlng)
    } else {
      marker = L.marker(e.latlng).addTo(map)
    }

    emit('locationSelected', { lat, lng })
  })
})
</script>

<template>
  <section>
    <div id="map" class="map"></div>
  </section>
</template>

<style scoped>
.map {
  width: 100%;
  height: 100vh;
  box-shadow: 5px 2px 5px gray;
  overflow: hidden;
}
</style>
