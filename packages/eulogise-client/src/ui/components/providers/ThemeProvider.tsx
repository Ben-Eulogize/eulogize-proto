import React from 'react'
import { ConfigProvider } from 'antd'

type IThemeProviderProps = React.PropsWithChildren

ConfigProvider.config({
  theme: {
    primaryColor: '#faad14',
  },
})

export const ThemeProvider = ({ children }: IThemeProviderProps) => (
  <ConfigProvider>{children}</ConfigProvider>
)
