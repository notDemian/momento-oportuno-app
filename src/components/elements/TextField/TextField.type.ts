import { TextInputProps } from 'react-native/types'
import { IconProps } from '../Icon'

import {
  BackgroundColorProps,
  BorderProps,
  ColorProps,
  LayoutProps,
  OpacityProps,
  SpacingProps,
  TypographyProps,
  VisibleProps,
} from '@shopify/restyle'
import { Theme } from '@src/theme'

export type InputRestyleProps = SpacingProps<Theme> &
  ColorProps<Theme> &
  BackgroundColorProps<Theme> &
  LayoutProps<Theme> &
  VisibleProps<Theme> &
  OpacityProps<Theme> &
  BorderProps<Theme> &
  TypographyProps<Theme>

export type TextFieldProps = {
  leftIcon?: IconProps['name']
  leftIconSize?: number
  lefIconOnPress?: () => void
  leftIconColor?: string
  hasMargin?: boolean
  inputProps: TextInputProps
  required?: boolean
  error?: string
} & InputRestyleProps
