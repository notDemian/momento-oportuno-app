import { createRestyleComponent, createVariant } from '@shopify/restyle';
import React from 'react';
import {
  ButtonProps,
  ButtonRestyleProps,
  ButtonSizeVariants,
  ButtonVariants,
} from './Button.type';
import { Box } from '../Box';
import { Theme } from '@src/theme';

export const ButtonContainer = createRestyleComponent<
  ButtonVariants &
    ButtonSizeVariants &
    React.ComponentProps<typeof Box> &
    ButtonProps &
    ButtonRestyleProps,
  Theme
>(
  [
    createVariant({ themeKey: 'buttonSizeVariants', property: 'buttonSize' }),
    createVariant({ themeKey: 'buttonVariants' }),
  ],
  Box,
);
