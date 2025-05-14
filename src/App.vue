<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import SubmitAdress from './views/SubmitAdress.vue'
import Header from './components/Header.vue'
</script>

<template>
  <section>
    <Header></Header>
    <SubmitAdress />
  </section>
</template>

<style scoped></style>
