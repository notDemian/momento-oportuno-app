import { useContext } from 'react'
import { ColorSchemeName } from 'react-native/types'

import { Theme } from './theme'
import { ThemeContext } from './theme-context'

import { useTheme } from '@shopify/restyle'

type AppTheme = Theme & {
  colorScheme: ColorSchemeName
}

export const useAppTheme = (): AppTheme => {
  const { theme: colorScheme, useSystemTheme } = useContext(ThemeContext)

  const appTheme = useTheme<Theme>()

  return {
    ...appTheme,
    colorScheme,
  }
}
