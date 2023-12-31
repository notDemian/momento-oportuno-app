import { ColorSchemeName } from 'react-native/types'

import { darkTheme, Theme, theme } from './theme'

import { DarkTheme, DefaultTheme } from '@react-navigation/native'
import { SpacingProps } from '@shopify/restyle'

export const fontSize = {
  xs: 11,
  s: 13,
  m: 16,
  l: 20,
  xl: 24,
  xxl: 28,
  xxxl: 32,
}

export const getNavigationTheme = (themeScheme: ColorSchemeName) => {
  const appTheme = themeScheme === 'light' ? theme.colors : darkTheme.colors

  const defaultNavigationTheme =
    themeScheme === 'light' ? DefaultTheme : DarkTheme

  return {
    ...defaultNavigationTheme,
    colors: {
      ...defaultNavigationTheme.colors,
      primary: appTheme.primary,
      background: appTheme.background,
      card: appTheme.card,
      text: appTheme.text,
      border: appTheme.border,
    },
  }
}

export const extractSpacingProps = (prop: SpacingProps<Theme>) => {
  const {
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    padding,
    paddingBottom,
    paddingEnd,
    paddingHorizontal,
    paddingLeft,
    paddingRight,
    paddingStart,
    paddingTop,
    paddingVertical,
    ...rest
  } = prop
  return {
    spacingProps: {
      margin,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      padding,
      paddingBottom,
      paddingEnd,
      paddingHorizontal,
      paddingLeft,
      paddingRight,
      paddingStart,
      paddingTop,
      paddingVertical,
    },
    rest,
  }
}

import type { BoxProps } from '@shopify/restyle'

/**
 * 
 * borderRadius={'xl'}
   backgroundColor={'white'}
   shadowColor={'black'}
   shadowOffset={{ width: 2, height: 2 }}
   shadowOpacity={0.2}
   shadowRadius={10}
   elevation={3}
 */
export function getShadowBoxProps(opts?: {
  elevation?: number
  shadowColor?: BoxProps<Theme>['shadowColor']
  borderRadius?: BoxProps<Theme>['borderRadius']
  shadowOpacity?: BoxProps<Theme>['shadowOpacity']
}): Required<
  Pick<
    BoxProps<Theme>,
    | 'elevation'
    | 'shadowColor'
    | 'shadowOffset'
    | 'shadowOpacity'
    | 'shadowRadius'
    | 'borderRadius'
    | 'backgroundColor'
  >
> {
  return {
    backgroundColor: 'white',
    elevation: opts?.elevation ?? 3,
    shadowColor: opts?.shadowColor ?? 'gray',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: opts?.shadowOpacity ?? 0.3,
    shadowRadius: 10,
    borderRadius: opts?.borderRadius ?? 'xl',
  }
}
