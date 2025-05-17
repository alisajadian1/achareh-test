export const firstError = (errors) => errors.filter(Boolean)[0]

// Helper function to ensure all required fields are filled
export const validateRequiredField = (fieldName, msg) => {
  const value = fieldName.trim()
  return !value ? msg : ''
}

export const validateLength = (fieldName, minChar, msg) => {
  const value = fieldName.replace(/\s+/g, '')
  return value.length < minChar ? msg : ''
}

export function validateMobile(fieldName, msg = 'شماره موبایل معتبر نیست') {
  const pattern = /^(09)[0-9]{9}$/
  return !fieldName || !pattern.test(fieldName) ? msg : ''
}

export function validatePhone(fieldName, msg = 'شماره تلفن معتبر نیست') {
  const pattern = /^0\d{2,3}\d{7,8}$/
  return !fieldName || !pattern.test(fieldName) ? msg : ''
}

export function validateGender(fieldName, msg = 'جنسیت را انتخاب کنید') {
  return !fieldName ? msg : ''
}
