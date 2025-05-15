<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import SubmitAdress from './views/SubmitAdress.vue'
import Header from './components/Header.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <section>
    <Header></Header>
    <RouterView></RouterView>
  </section>
</template>

<style scoped></style>
