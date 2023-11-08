import { TextProps as RNTextProps } from 'react-native'

import { TextProps as RestyleTextProps,VariantProps } from '@shopify/restyle'
import { Theme } from '@src/theme'

export type TextVariants = VariantProps<Theme, 'textVariants'>;

export type TextProps = RestyleTextProps<Theme, true> &
  TextVariants & {
    children?: React.ReactNode;
  } & RNTextProps;
