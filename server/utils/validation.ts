/**
 * Server-side validation utilities
 */

export interface ValidationRule {
  required?: boolean
  email?: boolean
  phone?: boolean
  minLength?: number
  maxLength?: number
}

export interface ValidationRules {
  [field: string]: ValidationRule
}

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string[]>
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateRequired = (value: any): boolean => {
  if (typeof value === 'string') {
    return value.trim().length > 0
  }
  return value !== null && value !== undefined
}

export const validatePhone = (phone: string): boolean => {
  // Basic phone validation - can be enhanced based on requirements
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/
  return phoneRegex.test(phone)
}

export const validateFormData = (data: Record<string, any>, rules: ValidationRules): ValidationResult => {
  const errors: Record<string, string[]> = {}

  for (const [field, rule] of Object.entries(rules)) {
    const value = data[field]
    const fieldErrors: string[] = []

    if (rule.required && !validateRequired(value)) {
      fieldErrors.push(`${field} is required`)
    }

    if (value && rule.email && !validateEmail(value)) {
      fieldErrors.push(`${field} must be a valid email`)
    }

    if (value && rule.phone && !validatePhone(value)) {
      fieldErrors.push(`${field} must be a valid phone number`)
    }

    if (value && rule.minLength && value.length < rule.minLength) {
      fieldErrors.push(`${field} must be at least ${rule.minLength} characters`)
    }

    if (value && rule.maxLength && value.length > rule.maxLength) {
      fieldErrors.push(`${field} must be no more than ${rule.maxLength} characters`)
    }

    if (fieldErrors.length > 0) {
      errors[field] = fieldErrors
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// Sanitize input to prevent XSS
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove < and > characters
    .trim()
}

// Sanitize object recursively
export const sanitizeObject = (obj: Record<string, any>): Record<string, any> => {
  const sanitized: Record<string, any> = {}

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeInput(value)
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      sanitized[key] = sanitizeObject(value)
    } else {
      sanitized[key] = value
    }
  }

  return sanitized
}
