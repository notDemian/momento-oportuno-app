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
  selectedItems,
}) => {
  const { colors } = useAppTheme()
  const [selectedValues, setSelectedValues] = React.useState<
    RadioOption['value'] | RadioOption['value'][]
  >(
    selectedItems && selectedItems.length > 0
      ? selectedItems.map((i) => i.value)
      : [],
  )

  const onPress = (item: RadioOption) => {
    return () => {
      setSelectedValues((p) => {
        if (Array.isArray(p)) {
          if (p.includes(item.value)) {
            return p.filter((i) => i !== item.value)
          }
          return [...p, item.value]
        }
        return item.value
      })
      onItemPress(item)
    }
  }

  // if ('multiple' in rest && rest.multiple) {
  //   return (
  //     <>
  //       {data.map((item) => {
  //         const { value, label, rightElement } = item
  //         let isChecked = value === defaultValue
  //         if (selectedValues) {
  //           isChecked = value === selectedValues
  //         }
  //         return (
  //           <Box
  //             key={value}
  //             flexDirection='row'
  //             alignItems='center'
  //             borderBottomWidth={1}
  //             borderColor='border'
  //           >
  //             <Touchable
  //               flexDirection='row'
  //               justifyContent='space-between'
  //               alignItems='center'
  //               onPress={onPress(item)}
  //             >
  //               <Box
  //                 width='100%'
  //                 flexDirection='row'
  //                 paddingHorizontal='s'
  //                 paddingVertical='m'
  //                 justifyContent='space-between'
  //                 alignItems='center'
  //                 {...containerProps}
  //               >
  //                 <Box flexDirection='row' alignItems='center'>
  //                   <Box>
  //                     <BouncyCheckbox
  //                       disableBuiltInState
  //                       isChecked={isChecked}
  //                       size={25}
  //                       fillColor={colors.secondary}
  //                       unfillColor={colors.card}
  //                       iconStyle={{
  //                         borderColor: colors.primary,
  //                       }}
  //                       textStyle={{
  //                         color: colors.text,
  //                       }}
  //                       onPress={onPress(item)}
  //                     />
  //                   </Box>
  //                   <Box>
  //                     <Text>{label}</Text>
  //                   </Box>
  //                 </Box>
  //                 {rightElement ? (
  //                   <Box alignItems='flex-end'>{rightElement}</Box>
  //                 ) : null}
  //               </Box>
  //             </Touchable>
  //           </Box>
  //         )
  //       })}
  //     </>
  //   )
  // }

  return (
    <>
      {data.map((item) => {
        const { value, label, rightElement } = item
        // let isChecked = data.map((d) => d.value).includes(value)
        // if (selectedValues) {
        //   isChecked = value === selectedValues
        // }
        let isChecked = false
        if (selectedValues) {
          if (Array.isArray(selectedValues)) {
            isChecked = selectedValues.includes(value)
          } else {
            isChecked = value === selectedValues
          }
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
                      fillColor={colors.secondary}
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
