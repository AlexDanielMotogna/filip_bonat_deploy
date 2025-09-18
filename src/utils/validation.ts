/**
 * Shared validation utilities
 */

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateRequired = (value: string): boolean => {
  return value.trim().length > 0
}

export const validatePhone = (phone: string): boolean => {
  // Basic phone validation - can be enhanced based on requirements
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/
  return phoneRegex.test(phone)
}

export interface ValidationResult {
  isValid: boolean
  errors: string[]
}

export const validateFormData = (data: Record<string, any>, rules: Record<string, string[]>): ValidationResult => {
  const errors: string[] = []

  for (const [field, validationRules] of Object.entries(rules)) {
    const value = data[field]

    for (const rule of validationRules) {
      switch (rule) {
        case 'required':
          if (!validateRequired(value || '')) {
            errors.push(`${field} is required`)
          }
          break
        case 'email':
          if (value && !validateEmail(value)) {
            errors.push(`${field} must be a valid email`)
          }
          break
        case 'phone':
          if (value && !validatePhone(value)) {
            errors.push(`${field} must be a valid phone number`)
          }
          break
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}
