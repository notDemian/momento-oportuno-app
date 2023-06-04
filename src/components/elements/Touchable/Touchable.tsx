import { createBox } from '@shopify/restyle';
import { Theme } from '@src/theme';
import React from 'react';
import { Platform, TouchableNativeFeedback } from 'react-native';
import { ButtonProps } from '../Button';
import { TouchableOpacity } from 'react-native-gesture-handler';

export type TouchableProps = React.ComponentPropsWithoutRef<
  typeof TouchableOpacity
> &
  React.ComponentPropsWithoutRef<typeof TouchableNativeFeedback> &
  Pick<ButtonProps, 'variant' | 'children'>;

export const InnerTouchable: React.FC<TouchableProps> = ({
  children,
  variant,
  ...rest
}) => {
  return Platform.OS === 'ios' || variant === 'transparent' ? (
    <TouchableOpacity {...rest}>{children}</TouchableOpacity>
  ) : (
    <TouchableNativeFeedback {...rest}>{children}</TouchableNativeFeedback>
  );
};

export const Touchable = createBox<Theme, TouchableProps>(InnerTouchable);
