import { TouchableProps } from '../Touchable'

import {
  BackgroundColorProps,
  BorderProps,
  ColorProps,
  LayoutProps,
  OpacityProps,
  PositionProps,
  SpacingProps,
  TextProps,
  VariantProps,
  VisibleProps,
} from '@shopify/restyle'
import { Theme } from '@src/theme'

export type ButtonRestyleProps = SpacingProps<Theme> &
  ColorProps<Theme> &
  LayoutProps<Theme> &
  SpacingProps<Theme> &
  VisibleProps<Theme> &
  OpacityProps<Theme> &
  BorderProps<Theme> &
  PositionProps<Theme> &
  BackgroundColorProps<Theme>

export type ButtonVariants = VariantProps<Theme, 'buttonVariants'>
export type ButtonSizeVariants = VariantProps<
  Theme,
  'buttonSizeVariants',
  'buttonSize'
>

export type ButtonProps = ButtonRestyleProps &
  ButtonVariants &
  ButtonSizeVariants & {
    buttonSize?: ButtonSizeVariants['buttonSize']
    onPress?: TouchableProps['onPress']
    isFullWidth?: boolean
    label?: string
    textAlign?: TextProps<Theme>['textAlign']
    isDisabled?: boolean
    disabledText?: string
    children?: React.ReactNode
    leftIcon?: React.ReactNode
    isModal?: boolean
  }
