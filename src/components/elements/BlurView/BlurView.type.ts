import { BoxProps } from '@shopify/restyle'
import { Theme } from '@src/theme'
import { BlurViewProps as ExpoBlurViewProps } from 'expo-blur'

export type BlurViewProps = BoxProps<Theme> & ExpoBlurViewProps;
