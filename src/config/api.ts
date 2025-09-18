/**
 * API Configuration
 * Centralized API endpoints and configuration
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://filip-bonat-deploy.vercel.app/'

export const API_ENDPOINTS = {
  ANFRAGE: `${API_BASE_URL}/api/anfrage`,
  SCHADENMELDUNG: `${API_BASE_URL}/api/schadenmeldung`,
  KREDIT_ANFRAGE: `${API_BASE_URL}/api/kredit-anfrage`,
} as const

export const API_CONFIG = {
  BASE_URL: API_BASE_URL,
  TIMEOUT: 30000, // 30 seconds
  HEADERS: {
    'Content-Type': 'application/json',
  },
} as const

export interface ApiResponse<T = any> {
  success: boolean
  message: string
  data?: T
}

export interface ApiError {
  success: false
  message: string
  errors?: string[]
}
