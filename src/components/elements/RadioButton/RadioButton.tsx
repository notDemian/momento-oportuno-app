import React from 'react'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { Box } from '../Box'
import { Text } from '../Text'
import { Touchable } from '../Touchable'

import { RadioButtonProps, RadioOption } from './RadioButton.type'

import { useAppTheme } from '@src/theme'

export const RadioButton: React.FC<RadioButtonProps> = ({
  data,
  onItemPress,
  defaultValue,
  value: valueProps,
  containerProps,
}) => {
  const { colors } = useAppTheme()
  const [selectedValue, setSelectedValue] = React.useState<
    RadioOption['value']
  >(valueProps + '')

  const onPress = (item: RadioOption) => {
    return () => {
      setSelectedValue(item.value)
      onItemPress(item)
    }
  }

  return (
    <>
      {data.map((item) => {
        const { value, label, rightElement } = item
        let isChecked = value === defaultValue
        if (selectedValue) {
          isChecked = value === selectedValue
        }
        return (
          <Box
            key={value}
            flexDirection='row'
            alignItems='center'
            borderBottomWidth={1}
            borderColor='border'
          >
            <Touchable
              flexDirection='row'
              justifyContent='space-between'
              alignItems='center'
              onPress={onPress(item)}
            >
              <Box
                width='100%'
                flexDirection='row'
                paddingHorizontal='s'
                paddingVertical='m'
                justifyContent='space-between'
                alignItems='center'
                {...containerProps}
              >
                <Box flexDirection='row' alignItems='center'>
                  <Box>
                    <BouncyCheckbox
                      disableBuiltInState
                      isChecked={isChecked}
                      size={25}
                      fillColor={colors.yellow}
                      unfillColor={colors.card}
                      iconStyle={{
                        borderColor: colors.primary,
                      }}
                      textStyle={{
                        color: colors.text,
                      }}
                      onPress={onPress(item)}
                    />
                  </Box>
                  <Box>
                    <Text>{label}</Text>
                  </Box>
                </Box>
                {rightElement ? (
                  <Box alignItems='flex-end'>{rightElement}</Box>
                ) : null}
              </Box>
            </Touchable>
          </Box>
        )
      })}
    </>
  )
}
