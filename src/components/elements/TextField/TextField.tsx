import React from 'react'
import { I18nManager,TextInput } from 'react-native'
import { Box } from '../Box'
import { Icon } from '../Icon'

import { InputRestyleProps, TextFieldProps } from './TextField.type'

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
} from '@shopify/restyle'
import { fontSize, Theme, useAppTheme } from '@src/theme'

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
)

export const TextField: React.FC<TextFieldProps> = ({
  leftIcon,
  leftIconSize = fontSize.l,
  lefIconOnPress = () => {},
  leftIconColor,
  required = false,
  hasMargin,
  inputProps: { onFocus, onBlur, ...restInputProps },
  ...rest
}) => {
  const { colors } = useAppTheme()
  const [borderWidth, setBorderWidth] = React.useState(1)
  const handleOnFocus = (e) => {
    setBorderWidth(2)
    onFocus?.(e)
  }

  const handleOnBlur = (e) => {
    setBorderWidth(1)
    onBlur?.(e)
  }

  return (
    <Box
      flexDirection='row'
      justifyContent='center'
      alignItems='center'
      borderRadius='l'
      backgroundColor='card'
      borderWidth={borderWidth}
      borderColor='border'
      height={55}
      {...rest}
      margin={hasMargin ? 's' : undefined}
    >
      {leftIcon ? (
        <Box paddingLeft='m' paddingRight={I18nManager.isRTL ? 's' : 'none'}>
          <Icon
            name={leftIcon}
            size={leftIconSize}
            color={leftIconColor ?? colors.text}
            onPress={lefIconOnPress}
          />
        </Box>
      ) : null}
      <InnerTextInput
        color='text'
        fontSize={fontSize.m}
        placeholderTextColor={colors.secondary}
        underlineColorAndroid='transparent'
        flex={1}
        padding='m'
        paddingHorizontal='m'
        paddingLeft={leftIcon ? 's' : undefined}
        borderRadius='l'
        backgroundColor='transparent'
        height='100%'
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onChangeText={restInputProps.onChangeText}
        {...restInputProps}
      />
      {required ? (
        <Box
          position='absolute'
          right={0}
          top={10}
          justifyContent='center'
          alignItems='center'
          paddingHorizontal='s'
        >
          <Icon
            name={'asterisk' as 'card'}
            size={fontSize.s * 0.7}
            color={colors.primary}
            type='Fontisto'
          />
        </Box>
      ) : null}
    </Box>
  )
}
