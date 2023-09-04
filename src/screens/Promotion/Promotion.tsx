import React, { FC, useCallback } from 'react'
import { Alert } from 'react-native'

import {
  Button,
  Section,
  TextField,
} from '@src/components'
import { AccountStackParamList, ScreenProps } from '@src/navigation'

type PromotionProps = ScreenProps<AccountStackParamList, 'Promotion'>

export const Promotion: FC<PromotionProps> = ({ navigation: { goBack } }) => {
  const [code, setCode] = React.useState('')

  const onApplyCode = useCallback(() => {
    if (code.length === 0) return
    Alert.alert('Cupón aplicado', `Cupón ${code} aplicado con éxito`)
    goBack()
  }, [code])

  return (
    <Section title='¿Tienes un cupón de descuento?' paddingHorizontal={'m'}>
      <TextField
        inputProps={{
          placeholder: 'Ingresa tu cupón',
          value: code,
          onChangeText: setCode,
        }}
      />
      <Button
        marginTop='m'
        variant='primary'
        onPress={onApplyCode}
        isDisabled={code.length === 0}
      >
        Aplicar
      </Button>
    </Section>
  )
}
