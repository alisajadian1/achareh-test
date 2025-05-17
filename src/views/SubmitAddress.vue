<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

import {
  firstError,
  validateRequiredField,
  validateLength,
  validateMobile,
  validatePhone,
  validateGender,
} from '/utils/validation.js'

import SubmitButton from '../components/SubmitButton.vue'
import LocationPicker from '@/components/LocationPicker.vue'
import BaseInput from '@/components/BaseInput.vue'

const router = useRouter()
const step = ref(1)
const submitAttempt = ref(false)
const isLoading = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  mobile: '',
  phone: '',
  address: '',
  gender: '',
})

const coordinates = ref({ lat: null, lng: null })

const updateCoordinates = async ({ lat, lng }) => {
  coordinates.value = { lat, lng }
  await submitForm()
}

const submitForm = async () => {
  const payload = {
    first_name: form.firstName,
    last_name: form.lastName,
    coordinate_mobile: form.mobile,
    coordinate_phone_number: form.phone,
    address: form.address,
    gender: form.gender,
    lat: coordinates.value.lat,
    lng: coordinates.value.lng,
    region: 1,
  }

  try {
    isLoading.value = true
    const res = await axios.post('https://stage.achareh.ir/api/karfarmas/address', payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic MDk4MjIyMjIyMjI6U2FuYTEyMzQ1Njc4',
      },
    })
    console.log('اطلاعات با موفقیت ارسال شد', res.data)
    router.push('/submit-address/success')
  } catch (err) {
    console.error('❌ ارسال فرم با خطا مواجه شد', err)
  } finally {
    isLoading.value = false
  }
}

const errors = computed(() => ({
  firstName: firstError([
    validateRequiredField(form.firstName, 'نام الزامی است'),
    validateLength(form.firstName, 3, 'نام باید دارای 3 کارکتر باشد'),
  ]),
  lastName: firstError([
    validateRequiredField(form.lastName, 'نام خانوادگی الزامی است'),
    validateLength(form.lastName, 3, 'نام خانوادگی باید دارای 3 کارکتر باشد'),
  ]),
  mobile: firstError([
    validateRequiredField(form.mobile, 'شماره موبایل الزامی است'),
    validateLength(form.mobile, 11, 'شماره وارد شده صحیح نمی‌باشد'),
    validateMobile(form.mobile),
  ]),
  phone: firstError([
    form.phone ? validateLength(form.phone, 11, 'شماره وارد شده صحیح نمی‌باشد') : '',
    form.phone ? validatePhone(form.phone) : '',
  ]),
  address: firstError([
    validateRequiredField(form.address, 'آدرس الزامی است'),
    validateLength(form.address, 10, 'آدرس باید دارای 10 کارکتر باشد'),
  ]),
  gender: firstError([
    validateRequiredField(form.gender, 'انتخاب جنسیت الزامی است'),
    validateGender(form.gender),
  ]),
}))

const handleSubmit = () => {
  submitAttempt.value = true
  const actualErrors = Object.values(errors.value).filter(Boolean)
  if (actualErrors.length === 0) {
    step.value = 2
  } else {
    console.warn('❌ فرم دارای خطا است', actualErrors)
  }
}
</script>

<template>
  <section class="submit-address">
    <!-- step 1-->
    <div id="step-1" v-if="step === 1">
      <!-- Page Title -->
      <h1 class="section-title">ثبت آدرس</h1>

      <!-- Form Container -->
      <div class="input-data-cart">
        <h2 class="form-heading">لطفا مشخصات و آدرس خود را وارد کنید</h2>

        <form @submit.prevent="handleSubmit">
          <!-- Row 1: Name and mobile fields -->
          <div class="form-row">
            <BaseInput
              v-model="form.firstName"
              id="first-name"
              label="نام"
              placeholder="مثال: محمد رضا"
              :error="errors.firstName"
              :showError="submitAttempt"
            />

            <BaseInput
              v-model="form.lastName"
              id="last-name"
              label="نام خانوادگی"
              placeholder="مثال: رضایی"
              :error="errors.lastName"
              :showError="submitAttempt"
            />

            <BaseInput
              v-model="form.mobile"
              id="mobile"
              type="tel"
              label="شماره تلفن همراه"
              placeholder="مثال: 09121234567"
              :error="errors.mobile"
              :showError="submitAttempt"
            />
          </div>

          <!-- Row 2: phone and Address -->
          <div class="form-row">
            <!-- Landline Input -->
            <BaseInput
              v-model="form.phone"
              id="phone"
              type="tel"
              label="شماره تلفن ثابت"
              placeholder="مثال: 02112345678"
              :error="errors.phone"
              :showError="submitAttempt"
            />

            <div class="form-group form-group-large">
              <BaseInput
                v-model="form.address"
                id="address"
                label="آدرس"
                placeholder="مثال: خیابان ولیعصر، کوچه ..."
                :error="errors.address"
                :showError="submitAttempt"
              />
            </div>
          </div>

          <!-- Gender Selection -->
          <div class="form-row">
            <div class="form-group form-group-radio">
              <span class="form-label">جنسیت</span>
              <div class="radio-group">
                <div class="radio-item">
                  <label for="gender-woman" class="radio-label">
                    <input
                      v-model="form.gender"
                      type="radio"
                      value="female"
                      name="gender"
                      id="gender-woman"
                      class="radio-input"
                    />
                    خانم
                  </label>
                </div>

                <div class="radio-item">
                  <label for="gender-male" class="radio-label">
                    <input
                      v-model="form.gender"
                      type="radio"
                      value="male"
                      name="gender"
                      id="gender-male"
                      class="radio-input"
                    />
                    آقا
                  </label>
                </div>
              </div>
              <p
                v-if="submitAttempt && errors.gender"
                class="error-text"
                style="color: red; font-size: 10px; margin-top: 4px"
              >
                {{ errors.gender }}
              </p>
            </div>
          </div>
        </form>
      </div>
      <div class="bottom-spacing"></div>

      <!-- Fixed Submit Button -->
      <SubmitButton @click="handleSubmit"> </SubmitButton>
    </div>

    <div id="step-2" v-if="step === 2">
      <LocationPicker
        @goBack="step = 1"
        @userLocation="updateCoordinates"
        :is-loading="isLoading"
      />
    </div>
  </section>
</template>

<style>
.submit-address {
  max-width: 100%;
  margin: 0 auto;
}

.submit-address #step-1 {
  padding: var(--spacing-large);
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

/* ===== Gender Radio Buttons ===== */
.form-group-radio {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.radio-group {
  display: flex;
  gap: var(--spacing-large);
  margin-top: var(--spacing-small);
  margin-right: var(--spacing-large);
}

.radio-item {
  display: flex;
  align-items: center;
}

.radio-input {
  margin-left: var(--spacing-small);
  margin-right: var(--spacing-small);
  accent-color: var(--color-primary);
}
.radio-label {
  display: flex;
  align-items: center;
  font-size: var(--font-size-base);
  color: var(--color-text);
}

/* ===== Spacing for Fixed Button Visibility ===== */
.bottom-spacing {
  height: 80px; /* Match height of the fixed SubmitButton component */
}

/* ===== Responsive Layout (Tablet & Desktop) ===== */
@media (min-width: 768px) {
  .submit-address {
    padding: var(--spacing-large) 0;
    max-width: 720px;
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
    max-width: 808px;
  }

  .input-data-cart {
    width: 808px;
    padding: var(--spacing-large);
  }
}
</style>
