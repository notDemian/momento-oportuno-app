import { ButtonProps } from './Button.type'

import { ColorProps, TextProps } from '@shopify/restyle'
import { fontSize, Theme } from '@src/theme'

export const getTextColor = (
  varant: ButtonProps['variant'],
): ColorProps<Theme>['color'] => {
  switch (varant) {
    case 'transparent':
    case 'outline':
      return 'primary'
    case 'outlineSecondary':
      return 'secondary'
    default:
      return 'white'
  }
}

export const getTextFontSize = (
  buttonSize: ButtonProps['buttonSize'],
): TextProps<Theme>['fontSize'] => {
  switch (buttonSize) {
    case 's':
      return fontSize.s
    case 'l':
      return fontSize.l
    default:
      return fontSize.m
  }
}
