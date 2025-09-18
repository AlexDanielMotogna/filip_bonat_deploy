/**
 * Comprehensive form validation utilities
 * Centralizes all form validation logic for better maintainability
 */

import { validateEmail, validateRequired, validatePhone } from './validation'

// Base validation result interface
export interface ValidationResult {
  isValid: boolean
  error?: string
}

// Form data interfaces
export interface AnfrageFormData {
  name: string
  email: string
  phone: string
  message?: string
  houseLink?: string
}

export interface SchadenMeldungFormData {
  name: string
  email: string
  telefon?: string
  wiePassiert: string
  woPassiert: string
  wannPassiert: string
  images?: File[]
}

export interface KreditAnfrageFormData {
  name: string
  email: string
  phone: string
  message?: string
}

// Validation functions for each form type
export const validateAnfrageForm = (formData: AnfrageFormData, t?: (key: string) => string): ValidationResult => {
  if (!validateRequired(formData.name)) {
    return {
      isValid: false,
      error: t?.('form.nameRequired') || 'Name is required'
    }
  }

  if (!validateRequired(formData.email)) {
    return {
      isValid: false,
      error: t?.('form.emailRequired') || 'Email is required'
    }
  }

  if (!validateEmail(formData.email)) {
    return {
      isValid: false,
      error: t?.('form.emailInvalid') || 'Please enter a valid email'
    }
  }

  if (!validateRequired(formData.phone)) {
    return {
      isValid: false,
      error: t?.('form.phoneRequired') || 'Phone is required'
    }
  }

  return { isValid: true }
}

export const validateSchadenMeldungForm = (formData: SchadenMeldungFormData): ValidationResult => {
  if (!validateRequired(formData.name)) {
    return {
      isValid: false,
      error: 'Bitte geben Sie Ihren Namen ein'
    }
  }

  if (!validateRequired(formData.email)) {
    return {
      isValid: false,
      error: 'Bitte geben Sie Ihre E-Mail-Adresse ein'
    }
  }

  if (!validateEmail(formData.email)) {
    return {
      isValid: false,
      error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
    }
  }

  if (!validateRequired(formData.wiePassiert)) {
    return {
      isValid: false,
      error: 'Bitte beschreiben Sie, wie der Schaden passiert ist'
    }
  }

  if (formData.wiePassiert.length < 10) {
    return {
      isValid: false,
      error: 'Die Beschreibung muss mindestens 10 Zeichen lang sein'
    }
  }

  if (!validateRequired(formData.woPassiert)) {
    return {
      isValid: false,
      error: 'Bitte geben Sie an, wo der Schaden passiert ist'
    }
  }

  if (!validateRequired(formData.wannPassiert)) {
    return {
      isValid: false,
      error: 'Bitte geben Sie an, wann der Schaden passiert ist'
    }
  }

  return { isValid: true }
}

export const validateKreditAnfrageForm = (formData: KreditAnfrageFormData): ValidationResult => {
  if (!validateRequired(formData.name)) {
    return {
      isValid: false,
      error: 'Bitte geben Sie Ihren Namen ein'
    }
  }

  if (!validateRequired(formData.email)) {
    return {
      isValid: false,
      error: 'Bitte geben Sie Ihre E-Mail-Adresse ein'
    }
  }

  if (!validateEmail(formData.email)) {
    return {
      isValid: false,
      error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein'
    }
  }

  if (!validateRequired(formData.phone)) {
    return {
      isValid: false,
      error: 'Bitte geben Sie Ihre Telefonnummer ein'
    }
  }

  return { isValid: true }
}

// Generic field validators for reusable validation logic
export const fieldValidators = {
  name: (value: string, t?: (key: string) => string): ValidationResult => {
    if (!validateRequired(value)) {
      return {
        isValid: false,
        error: t?.('form.nameRequired') || 'Name is required'
      }
    }
    return { isValid: true }
  },

  email: (value: string, t?: (key: string) => string): ValidationResult => {
    if (!validateRequired(value)) {
      return {
        isValid: false,
        error: t?.('form.emailRequired') || 'Email is required'
      }
    }
    if (!validateEmail(value)) {
      return {
        isValid: false,
        error: t?.('form.emailInvalid') || 'Please enter a valid email'
      }
    }
    return { isValid: true }
  },

  phone: (value: string, t?: (key: string) => string): ValidationResult => {
    if (!validateRequired(value)) {
      return {
        isValid: false,
        error: t?.('form.phoneRequired') || 'Phone is required'
      }
    }
    if (!validatePhone(value)) {
      return {
        isValid: false,
        error: t?.('form.phoneInvalid') || 'Please enter a valid phone number'
      }
    }
    return { isValid: true }
  },

  required: (value: string, fieldName: string, t?: (key: string) => string): ValidationResult => {
    if (!validateRequired(value)) {
      return {
        isValid: false,
        error: t?.(`form.${fieldName}Required`) || `${fieldName} is required`
      }
    }
    return { isValid: true }
  },

  minLength: (value: string, minLength: number, fieldName: string): ValidationResult => {
    if (value.length < minLength) {
      return {
        isValid: false,
        error: `${fieldName} muss mindestens ${minLength} Zeichen lang sein`
      }
    }
    return { isValid: true }
  }
}

// Utility function to validate multiple fields at once
export const validateFields = (
  fields: Array<{
    value: string
    validator: (value: string, ...args: any[]) => ValidationResult
    args?: any[]
  }>
): ValidationResult => {
  for (const field of fields) {
    const result = field.validator(field.value, ...(field.args || []))
    if (!result.isValid) {
      return result
    }
  }
  return { isValid: true }
}
