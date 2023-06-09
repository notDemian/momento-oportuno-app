import React from 'react';
import { TextInput, I18nManager } from 'react-native';
import { Box } from '../Box';
import { InputRestyleProps, TextFieldProps } from './TextField.type';
import {
  backgroundColor,
  border,
  color,
  createRestyleComponent,
  layout,
  opacity,
  spacing,
  typography,
  visible,
} from '@shopify/restyle';
import { Theme, fontSize, useAppTheme } from '@src/theme';
import { Icon } from '../Icon';

const InnerTextInput = createRestyleComponent<
  InputRestyleProps & React.ComponentProps<typeof TextInput>,
  Theme
>(
  [
    spacing,
    color,
    backgroundColor,
    layout,
    visible,
    opacity,
    border,
    typography,
  ],
  TextInput,
);

export const TextField: React.FC<TextFieldProps> = ({
  leftElement,
  leftElementSize = fontSize.l,
  hasMargin,
  inputProps: { onFocus, onBlur, ...restInputProps },
  ...rest
}) => {
  const {
    colors: { text },
  } = useAppTheme();
  const [borderWidth, setBorderWidth] = React.useState(1);
  const handleOnFocus = (e) => {
    setBorderWidth(2);
    onFocus?.(e);
  };

  const handleOnBlur = (e) => {
    setBorderWidth(1);
    onBlur?.(e);
  };

  return (
    <Box
      flex={1}
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      borderRadius="l"
      backgroundColor="card"
      borderWidth={borderWidth}
      borderColor="border"
      height={55}
      {...rest}
      margin={hasMargin ? 's' : undefined}>
      {leftElement ? (
        <Box paddingLeft="m" paddingRight={I18nManager.isRTL ? 's' : 'none'}>
          <Icon name={leftElement as any} size={leftElementSize} color={text} />
        </Box>
      ) : null}
      <InnerTextInput
        color="text"
        fontSize={fontSize.m}
        placeholderTextColor={text}
        underlineColorAndroid="transparent"
        flex={1}
        padding="m"
        paddingHorizontal="m"
        paddingLeft={leftElement ? 's' : undefined}
        borderRadius="l"
        backgroundColor="transparent"
        height="100%"
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        {...restInputProps}
      />
    </Box>
  );
};
