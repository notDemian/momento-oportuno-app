import React from 'react';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Theme, useAppTheme } from '@src/theme';
import { DateTimePickerProps } from './DateTimePicker.type';
import { createBox } from '@shopify/restyle';

const InnerDateTimePicker = createBox<Theme, DateTimePickerProps>(
  RNDateTimePicker,
);

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  textColor,
  accentColor,
  ...rest
}) => {
  const { colors, colorScheme } = useAppTheme();
  return (
    <InnerDateTimePicker
      textColor={textColor || colors.text}
      accentColor={accentColor || colors.primary}
      themeVariant={colorScheme === 'dark' ? 'dark' : 'light'}
      {...rest}
    />
  );
};
