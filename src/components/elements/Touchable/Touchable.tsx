import React from 'react'
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'

import { TouchableProps } from './Touchable.type'

import { createBox } from '@shopify/restyle'
import { Theme } from '@src/theme'

export const InnerTouchable: React.FC<TouchableProps> = ({
  children,
  variant,
  withoutFeedback = false,
  ...rest
}) => {
  return !withoutFeedback ? (
    Platform.OS === 'ios' || variant === 'transparent' ? (
      <TouchableOpacity {...rest}>{children}</TouchableOpacity>
    ) : (
      <TouchableNativeFeedback {...rest}>{children}</TouchableNativeFeedback>
    )
  ) : (
    <TouchableWithoutFeedback {...rest}>{children}</TouchableWithoutFeedback>
  )
}

export const Touchable = createBox<Theme, TouchableProps>(InnerTouchable)
