<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import SavedDataCard from '@/components/SavedDataCard.vue'

const savedAddresses = ref([])
const error = ref(null)
const isLoading = ref(true)

// Load the addresses and error handling
onMounted(async () => {
  try {
    const res = await axios.get('https://stage.achareh.ir/api/karfarmas/address', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4',
      },
    })
    savedAddresses.value = res.data
  } catch (err) {
    error.value = 'دریافت اطلاعات با خطا مواجه شد'
    console.log(err)
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <section class="address-page">
    <h1 class="section-title">آدرس ها و مشخصات</h1>
    <div class="address-list-wrapper">
      <div v-if="isLoading" class="info-message">در حال بارگذاری ...</div>
      <div v-else-if="error" class="error-message">{{ error }}</div>
      <div v-else-if="savedAddresses.length === 0" class="info-message">هنوز آدرس ثبت نشده است</div>
      <div v-else class="card-list">
        <SavedDataCard v-for="item in savedAddresses" :key="item.id" :savedAddresses="item" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.address-page {
  max-width: 808px;
  margin: 0 auto;
  padding: var(--spacing-large);
}

.section-title {
  text-align: right;
}

.address-list-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-medium);
}

.info-message,
.error-message {
  font-size: var(--font-size-base);
  color: var(--color-text);
  text-align: center;
  padding: 1rem;
  border-radius: 8px;
  background-color: var(--color-background-soft);
}

.error-message {
  color: var(--color-error, red);
  background-color: #ffe5e5;
}

.card-list {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-large);
}
</style>
