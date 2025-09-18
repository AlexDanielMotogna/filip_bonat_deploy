import { useState } from 'react'

export interface FormSubmissionState {
  loading: boolean
  error: string | null
  success: boolean
}

export interface UseFormSubmissionReturn<T> {
  state: FormSubmissionState
  submitForm: (data: T) => Promise<void>
  resetState: () => void
}

export const useFormSubmission = <T>(
  submitFn: (data: T) => Promise<void>
): UseFormSubmissionReturn<T> => {
  const [state, setState] = useState<FormSubmissionState>({
    loading: false,
    error: null,
    success: false
  })

  const submitForm = async (data: T) => {
    console.log('🔄 useFormSubmission: Starting form submission')
    setState({ loading: true, error: null, success: false })

    try {
      console.log('📤 useFormSubmission: Calling submit function')
      await submitFn(data)
      console.log('✅ useFormSubmission: Submit function completed successfully')
      setState({ loading: false, error: null, success: true })
    } catch (error) {
      console.error('❌ useFormSubmission: Submit function failed:', error)
      const errorMessage = error instanceof Error ? error.message : 'An error occurred'
      setState({ loading: false, error: errorMessage, success: false })
    }
  }

  const resetState = () => {
    setState({ loading: false, error: null, success: false })
  }

  return {
    state,
    submitForm,
    resetState
  }
}
