<script setup></script>

<template>
  <section class="success-page-container">
    <i
      ><svg
        width="45"
        height="45"
        viewBox="0 0 45 45"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M39.375 22.5C39.375 13.1802 31.8198 5.625 22.5 5.625C13.1802 5.625 5.625 13.1802 5.625 22.5C5.625 31.8198 13.1802 39.375 22.5 39.375C31.8198 39.375 39.375 31.8198 39.375 22.5Z"
          stroke="#323232"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M30.0005 18.7505L20.6255 28.1255L15.0005 22.5005"
          stroke="#323232"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </i>
    <h1 class="success-message">اطلاعات شما با موفقیت ثبت شد</h1>

    <RouterLink to="/SavedAddresses" class="navigation-link">مشاهده اطلاعات</RouterLink>
  </section>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100%;
}

.success-page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
  padding: var(--spacing-large);
}

.success-message {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  margin-bottom: 40px;
}

.navigation-link {
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-bold);
  text-decoration: none;
  border: 1px solid var(--color-primary);
  color: var(--color-primary);
  padding: 10px 90px;
}
</style>
