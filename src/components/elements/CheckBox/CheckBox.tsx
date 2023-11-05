import React from 'react'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { Box } from '../Box'
import { Text } from '../Text'
import { Touchable } from '../Touchable'

import { fontSize, useAppTheme } from '@src/theme'

type CheckBoxProps = {
  label: string
  onChange: (checked: boolean) => void
  rightElement?: React.ReactNode
  error?: string
}
export const CheckBox: React.FC<CheckBoxProps> = ({
  label,
  onChange,
  rightElement,
  error,
}) => {
  const {
    colors: { primary, secondary, text, card },
  } = useAppTheme()
  const [checked, setChecked] = React.useState<boolean>(false)
  const handleOnChange = () => {
    setChecked(!checked)
    onChange(!checked)
  }

  return (
    <Touchable flex={1} onPress={handleOnChange}>
      <Box
        flex={1}
        // flexDirection='row'
        justifyContent='space-between'
        alignItems='stretch'
        padding='m'
        width={'100%'}
      >
        <Box flexDirection='row' alignItems='center' flex={2}>
          <BouncyCheckbox
            disableBuiltInState
            isChecked={checked}
            size={fontSize.xl}
            fillColor={secondary}
            unfillColor={card}
            iconStyle={{
              borderColor: primary,
            }}
            textStyle={{
              color: text,
            }}
            onPress={handleOnChange}
          />
          <Text paddingHorizontal={'m'}>{label}</Text>
        </Box>
        {rightElement ? (
          <Box flex={1} alignItems='flex-end'>
            {rightElement}
          </Box>
        ) : null}
        {error ? (
          <Box flex={1} alignItems={'center'}>
            <Text color={'secondary'}>{error}</Text>
          </Box>
        ) : null}
      </Box>
    </Touchable>
  )
}
