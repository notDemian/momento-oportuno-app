import { TextInputProps } from 'react-native/types';
import {
  ColorProps,
  SpacingProps,
  BackgroundColorProps,
  LayoutProps,
  VisibleProps,
  OpacityProps,
  BorderProps,
  TypographyProps,
} from '@shopify/restyle';
import { Theme } from '@src/theme';

export type InputRestyleProps = SpacingProps<Theme> &
  ColorProps<Theme> &
  BackgroundColorProps<Theme> &
  LayoutProps<Theme> &
  VisibleProps<Theme> &
  OpacityProps<Theme> &
  BorderProps<Theme> &
  TypographyProps<Theme>;

export type TextFieldProps = {
  leftElement?: string;
  leftElementSize?: number;
  hasMargin?: boolean;
  inputProps: TextInputProps;
} & InputRestyleProps;
