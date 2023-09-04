import React from 'react'
import { ColorSchemeName, useColorScheme } from 'react-native'

import { darkTheme, theme } from './theme'
import { ThemeContext } from './theme-context'

import { ThemeProvider } from '@shopify/restyle'

type AppThemeProviderProps = {
  children?: React.ReactNode
}

export const AppThemeProvider = ({ children }: AppThemeProviderProps) => {
  const scheme = useColorScheme()
  const [currentTheme, setCurrentTheme] =
    React.useState<ColorSchemeName | null>('light')
  const [useSystemTheme, setUseSystemTheme] = React.useState(false)

  React.useEffect(() => {
    if (useSystemTheme) {
      setCurrentTheme('light')
    }
  }, [scheme, useSystemTheme])

  const setTheme = React.useCallback((newTheme: ColorSchemeName) => {
    setCurrentTheme(newTheme)
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        theme: currentTheme,
        useSystemTheme,
        setTheme: setTheme,
        setUseSystemTheme,
      }}
    >
      <ThemeProvider theme={currentTheme === 'dark' ? darkTheme : theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
