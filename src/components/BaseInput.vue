<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  error: {
    type: String,
    default: '',
  },
  showError: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="form-group">
    <label :for="id" class="form-label">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :class="['form-input', { 'input-error': error && showError }]"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <p v-if="showError && error" class="error-text">
      {{ error }}
    </p>
  </div>
</template>

<style scoped>
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
  caret-color: var(--color-primary);
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

.input-error {
  border-color: red;
}

.error-text {
  color: red;
  font-size: 10px;
  margin-top: 4px;
}
</style>
