<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <section>
    <Header />
    <RouterView />
  </section>
</template>

<style scoped></style>
