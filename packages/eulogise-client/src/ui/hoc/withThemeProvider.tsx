import React from 'react'
import { ThemeProvider } from '../components/providers/ThemeProvider'

export const withThemeProvider = (Component: React.ReactNode) => (
  <ThemeProvider>{Component}</ThemeProvider>
)
