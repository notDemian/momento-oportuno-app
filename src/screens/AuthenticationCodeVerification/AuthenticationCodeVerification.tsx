import React from 'react'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'

import { AuthenticationCodeVerificationProps } from './AuthenticationCodeVerification.type'

import { AuthenticationLayout, Box, Button, Text } from '@src/components'
import { fontSize } from '@src/theme'
import { T } from '@src/utils'

const CELL_COUNT = 5
const CODE_FIELD_SIZE = 60

export const AuthenticationCodeVerification: React.FC<
  AuthenticationCodeVerificationProps
> = ({ navigation }) => {
  const [value, setValue] = React.useState('')
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })

  const onNextButtonPress = () => {
    if (value.length !== 5) {
      T.error('El código de verificación debe tener 5 dígitos')
      return
    }
    navigation.replace('Login')
  }

  return (
    <AuthenticationLayout
      title='Código de verificación'
      subtitle='Un código de verificación se ha enviado a tu número de teléfono'
      footer={
        <Button label='Continuar' isFullWidth onPress={onNextButtonPress} />
      }
    >
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        keyboardType='number-pad'
        textContentType='oneTimeCode'
        autoFocus
        renderCell={({ index, symbol, isFocused }) => (
          <Box
            key={index}
            width={CODE_FIELD_SIZE}
            height={CODE_FIELD_SIZE}
            borderWidth={2}
            borderColor={isFocused ? 'primary' : 'border'}
            borderRadius='m'
          >
            <Text
              textAlign='center'
              fontSize={fontSize.xl}
              lineHeight={CODE_FIELD_SIZE}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </Box>
        )}
      />
    </AuthenticationLayout>
  )
}
