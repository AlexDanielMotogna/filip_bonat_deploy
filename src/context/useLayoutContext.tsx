'use client'
import { type ReactNode, createContext, useContext, useEffect, useMemo, useState } from 'react'
import { LayoutState, LayoutType } from '../types/layouts'
const LayoutContext = createContext<LayoutType | undefined>(undefined)

function useLayoutContext() {
  const context = useContext(LayoutContext)
  if (context === undefined) {
    throw new Error('useLayoutContext must be used within an LayoutProvider')
  }
  return context
}
function LayoutProvider({ children }: Readonly<{ children: ReactNode }>) {
  const INIT_STATE: LayoutState = {
    theme: 'light',
  }
  const [settings] = useState<LayoutState>(INIT_STATE)
  const themeMode = 'light'

  useEffect(() => {
    const html = document.getElementsByTagName('html')[0]
    html.classList.add('light-mode')
    html.classList.remove('dark-mode')
    document.body.classList.add('light-mode')
    document.body.classList.remove('dark-mode')
    localStorage.setItem('theme', 'light')
  }, [])

  const updateTheme = () => {
    // No-op: theme is always light
  }

  const resetSettings = () => {
    // No-op: settings are always light
  }

  return (
    <LayoutContext.Provider
      value={useMemo(
        () => ({
          settings,
          themeMode,
          updateTheme,
          resetSettings,
        }),
        [settings, themeMode],
      )}>
      {children}
    </LayoutContext.Provider>
  )
}
export { LayoutProvider, useLayoutContext }
