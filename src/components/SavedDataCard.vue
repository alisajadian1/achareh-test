<script setup>
defineProps({
  savedAddresses: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <section class="data-card">
    <div class="data-row">
      <div class="data-container">
        <h2 class="data-label">نام</h2>
        <p class="entered-data">{{ savedAddresses.first_name }}</p>
      </div>
      <div class="data-container">
        <h2 class="data-label">نام خانوادگی</h2>
        <p class="entered-data">{{ savedAddresses.last_name }}</p>
      </div>
      <div class="data-container">
        <h2 class="data-label">شماره تلفن همراه</h2>
        <p class="entered-data">{{ savedAddresses.coordinate_mobile }}</p>
      </div>
    </div>

    <div class="data-row">
      <div class="data-container">
        <h2 class="data-label">شماره تلفن ثابت</h2>
        <p class="entered-data">{{ savedAddresses.coordinate_phone_number || '-' }}</p>
      </div>
      <div class="data-container">
        <h2 class="data-label">جنسیت</h2>
        <p class="entered-data">{{ savedAddresses.gender || '-' }}</p>
      </div>
      <div id="address-container" class="data-container">
        <h2 class="data-label">آدرس</h2>
        <p class="entered-data">{{ savedAddresses.address }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.data-card {
  background-color: var(--color-white);
  padding: var(--spacing-large);
  border-radius: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.data-container {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
}

.data-label {
  font-size: var(--font-size-base);
  color: var(--color-text);
  margin: 0 0 0.5rem 0;
  opacity: 0.7;
}

.entered-data {
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-bold);
  color: var(--color-text);
  margin: 0;
  word-break: break-word;
}

#address-container {
  display: block;
  border-top: 1px solid rgb(175, 175, 175);
}

/* Responsive styles */
@media (min-width: 992px) {
  .data-row {
    display: flex;
    gap: var(--spacing-large);
    margin-bottom: var(--spacing-large);
    flex-wrap: wrap;
  }

  .data-container {
    display: block;
    flex: 1 1 calc(33.333% - 1rem);
    min-width: 0;
  }

  .data-card {
    width: 808px;
    margin: 0 auto;
  }

  #address-container {
    display: block;
    border-top: none;
  }
}
</style>
