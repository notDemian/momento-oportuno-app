import { BoxProps } from '@shopify/restyle';
import { Theme } from '@src/theme';
import { ActivityIndicatorProps as RNActivityIndicatorProps } from 'react-native';

export type ActivityIndicatorProps = RNActivityIndicatorProps & BoxProps<Theme>;
