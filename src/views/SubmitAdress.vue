<script setup>
// Importing the custom SubmitButton component
import { ref, reactive } from 'vue'
import SubmitButton from '../components/SubmitButton.vue'

const form = reactive({
  firstName: '',
  lastName: '',
  mobile: '',
  phone: '',
  address: '',
  gender: '',
})

const errors = reactive({
  firstName: '',
  lastName: '',
  mobile: '',
  phone: '',
  address: '',
  gender: '',
})

const checkInputs = (fieldName, minChar, label) => {
  const value = form[fieldName].replace(/\s+/g, '')
  if (!value) {
    errors[fieldName] = `لطفا ${label} را وارد کنید`
  } else if (value.length < minChar) {
    errors[fieldName] = `${label} باید دارای ${minChar} کاراکتر باشد`
  } else {
    errors[fieldName] = ''
  }
}

const FormValidation = () => {
  let isValid = true

  checkInputs('firstName', 3, 'نام')
  checkInputs('lastName', 3, 'نام خانوادگی')
  checkInputs('address', 10, 'آدرس')
  checkInputs('mobile', 11, 'شماره همراه')
  checkInputs('phone', 10, 'تلفن ثابت')

  // Gender check
  if (!form.gender) {
    errors.gender = 'جنسیت را انتخاب کنید'
    isValid = false
  } else {
    errors.gender = ''
  }
}

// Function to handle form submission logic

const handleSubmit = () => {
  if (FormValidation()) {
    console.log('✅ فرم با موفقیت ارسال شد:', form)
    // Do something (send to backend, go to next step...)
  } else {
    console.log('❌ فرم نامعتبر است')
  }
}
</script>

<template>
  <section class="submit-address">
    <!-- Page Title -->
    <h1 class="section-title">ثبت آدرس</h1>

    <!-- Form Container -->
    <div class="input-data-cart">
      <h2 class="form-heading">لطفا مشخصات و آدرس خود را وارد کنید</h2>

      <!-- Form: Collects user personal details -->
      <form @submit.prevent="handleSubmit">
        <!-- Row 1: Name and mobile fields -->
        <div class="form-row">
          <!-- First Name Input -->
          <div class="form-group">
            <label for="first-name" class="form-label">نام</label>
            <input
              v-model="form.firstName"
              type="text"
              id="first-name"
              class="form-input"
              :class="{ 'input-error': errors.firstName }"
              placeholder="مثال: محمد رضا"
            />
            <p v-if="errors.firstName" class="error-text">{{ errors.firstName }}</p>
          </div>

          <!-- Last Name Input -->
          <div class="form-group">
            <label for="last-name" class="form-label">نام خانوادگی</label>
            <input
              v-model="form.lastName"
              type="text"
              id="last-name"
              :class="{ 'input-error': errors.lastName }"
              placeholder="مثال: رضایی"
              class="form-input"
            />
            <p v-if="errors.lastName" class="error-text">{{ errors.lastName }}</p>
          </div>

          <!-- Mobile Phone Input -->
          <div class="form-group">
            <label for="mobile" class="form-label">شماره تلفن همراه</label>
            <input
              v-model="form.mobile"
              type="tel"
              id="mobile"
              :class="{ 'input-error': errors.mobile }"
              placeholder="مثال: 0912123456789"
              class="form-input"
            />
            <p v-if="errors.mobile" class="error-text">{{ errors.mobile }}</p>
          </div>
        </div>

        <!-- Row 2: Landline and Address -->
        <div class="form-row">
          <!-- Landline Input -->
          <div class="form-group">
            <label for="phone" class="form-label">شماره تلفن ثابت</label>
            <input
              v-model="form.mobile"
              type="tel"
              id="phone"
              :class="{ 'input-error': errors.phone }"
              placeholder="مثال: 0211234567"
              class="form-input"
            />
            <p v-if="errors.phone" class="error-text">{{ errors.phone }}</p>
          </div>

          <!-- Address Input (wider field) -->
          <div class="form-group form-group-large">
            <label for="address" class="form-label">آدرس</label>
            <input
              v-model="form.address"
              type="text"
              id="address"
              :class="{ 'input-error': errors.address }"
              placeholder="مثال: خیابان ولیعصر، کوچه ..."
              class="form-input"
            />
            <p v-if="errors.address" class="error-text">{{ errors.address }}</p>
          </div>
        </div>

        <!-- Gender Selection -->
        <div class="form-row">
          <div class="form-group form-group-radio">
            <span class="form-label">جنسیت</span>
            <div class="radio-group">
              <!-- Female Option -->
              <div class="radio-item">
                <input
                  v-model="form.gender"
                  type="radio"
                  value="female"
                  name="gender"
                  id="gender-woman"
                  class="radio-input"
                />
                <label for="gender-woman" class="radio-label">خانم</label>
              </div>

              <!-- Male Option -->
              <div class="radio-item">
                <input
                  v-model="form.gender"
                  type="radio"
                  value="male"
                  name="gender"
                  id="gender-male"
                  class="radio-input"
                />
                <label for="gender-male" class="radio-label">آقا</label>
              </div>
            </div>
            <span class="error-text">{{ errors.gender }}</span>
          </div>
        </div>
      </form>
    </div>

    <!-- Spacer: Prevent form content from being hidden behind the fixed button -->
    <div class="bottom-spacing"></div>

    <!-- Fixed Submit Button -->
    <SubmitButton @click="handleSubmit"> </SubmitButton>
  </section>
</template>

<style scoped>
/* ===== Layout and Container Styles ===== */
.submit-address {
  padding: var(--spacing-large);
  max-width: 100%;
  margin: 0 auto;
}

.section-title {
  font-size: var(--font-size-large);
  color: var(--color-text);
  margin-bottom: var(--spacing-small);
  text-align: right;
}

/* ===== Form Card Styling ===== */
.input-data-cart {
  background-color: var(--color-white);
  border-radius: 8px;
  padding: var(--spacing-large);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: var(--spacing-large);
}

/* ===== Form Section Headings ===== */
.form-heading {
  font-size: 1rem;
  color: var(--color-text);
  margin-bottom: var(--spacing-large);
  border-bottom: 1px solid var(--color-border);
  padding-bottom: var(--spacing-medium);
}

/* ===== Form Layout and Inputs ===== */
.form-row {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-large);
  margin-bottom: var(--spacing-large);
}

.form-group {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.form-group-large {
  flex: 2;
}

/* ===== Labels and Inputs ===== */
.form-label {
  font-size: var(--font-size-base);
  color: var(--color-text);
  margin-bottom: var(--spacing-small);
  font-weight: var(--font-weight-bold);
}

.form-input {
  text-align: right;
  padding: var(--spacing-medium);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  font-family: inherit;
  font-size: var(--font-size-base);
  transition: border-color 0.3s ease;
  background-color: #f9f9f9;
}

.form-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(0, 191, 165, 0.1);
}

.form-input::placeholder {
  color: var(--color-gray);
}

/* ===== Gender Radio Buttons ===== */
.form-group-radio {
  display: flex;
  flex-direction: column;
}

.radio-group {
  display: flex;
  gap: var(--spacing-large);
  margin-top: var(--spacing-small);
}

.radio-item {
  display: flex;
  align-items: center;
}

.radio-input {
  margin-left: var(--spacing-small);
  accent-color: var(--color-primary); /* Custom primary color for radio button */
}

.radio-label {
  font-size: var(--font-size-base);
  color: var(--color-text);
}

/* ===== Spacing for Fixed Button Visibility ===== */
.bottom-spacing {
  height: 80px; /* Match height of the fixed SubmitButton component */
}

.input-error {
  border-color: red;
}

.error-text {
  color: red;
  font-size: 0.85rem;
  margin-top: 4px;
}

/* ===== Responsive Layout (Tablet & Desktop) ===== */
@media (min-width: 768px) {
  .submit-address {
    padding: var(--spacing-large) 0;
    max-width: 720px;
  }

  .section-title {
    font-size: 1.75rem;
  }

  .form-row {
    flex-direction: row; /* Arrange inputs side-by-side on wider screens */
  }

  .input-data-cart {
    padding: var(--spacing-large) calc(var(--spacing-large) * 2);
  }
}

@media (min-width: 992px) {
  .submit-address {
    max-width: 960px;
  }

  .input-data-cart {
    padding: calc(var(--spacing-large) * 2);
  }
}
</style>
