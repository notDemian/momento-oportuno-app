import { BoxProps } from '@shopify/restyle';
import { BlurViewProps as ExpoBlurViewProps } from 'expo-blur';
import { Theme } from '@src/theme';

export type BlurViewProps = BoxProps<Theme> & ExpoBlurViewProps;
