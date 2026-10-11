export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    email.trim()
  )
}

export function isNotEmpty(value) {
  return typeof value === 'string' && value.trim().length > 0
}