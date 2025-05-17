<template>
  <section>
    <div class="header-container">
      <i class="logo-icon">
        <img src="/achareh-logo.svg" alt="" />
      </i>
      <div class="header-text">
        <RouterLink to="submit-address" class="submit-address">ثبت آدرس</RouterLink>
        <RouterLink to="/saved-addresses" class="see-address">مشاهده آدرس ها</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  background-color: var(--color-white);
  padding: var(--spacing-small) var(--spacing-large);
}

.header-text {
  display: flex;
  align-items: center;
  gap: var(--spacing-large);
}

.logo-icon svg {
  display: block;
}

.see-address,
.submit-address {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  text-decoration: none;
  color: var(--color-primary); /* or your default color */
}

.router-link-active,
.router-link-exact-active {
  color: var(--color-text) !important;
}

@media (min-width: 992px) {
  .header-container {
    padding: var(--spacing-small) 80px;
  }
}
</style>
