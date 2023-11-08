import React from 'react'

import { DateTimePickerProps } from './DateTimePicker.type'

import RNDateTimePicker from '@react-native-community/datetimepicker'
import { createBox } from '@shopify/restyle'
import { Theme, useAppTheme } from '@src/theme'

const InnerDateTimePicker = createBox<Theme, DateTimePickerProps>(
  RNDateTimePicker,
)

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  textColor,
  accentColor,
  ...rest
}) => {
  const { colors, colorScheme } = useAppTheme()
  return (
    <InnerDateTimePicker
      textColor={textColor || colors.text}
      accentColor={accentColor || colors.primary}
      themeVariant={colorScheme === 'dark' ? 'dark' : 'light'}
      {...rest}
    />
  )
}
