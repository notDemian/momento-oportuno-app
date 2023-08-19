import { BottomSheetModal, Box, RadioButton, RadioOption, Text } from '..'
import { type FC, useCallback } from 'react'

type ChangeLanguageModalProps = {
  isVisible: boolean
  hideModal: () => void
  data: RadioOption[]
  title: string
  onPressItem: (item: RadioOption) => void
}

export const ModalRadioButton: FC<ChangeLanguageModalProps> = ({
  isVisible,
  hideModal,
  data,
  title,
  onPressItem,
}) => {
  const onItemPress = useCallback(
    (item: RadioOption) => {
      console.log('onItemPress -> item', item)
      onPressItem(item)
    },
    [onPressItem],
  )

  return (
    <BottomSheetModal
      isOpened={isVisible}
      useScrollView
      snapPoints={['40%']}
      onClose={hideModal}
    >
      <Box>
        <Text textAlign='center' variant='header'>
          {title}
        </Text>
        <Box marginTop='m'>
          <RadioButton
            defaultValue={data[0].value}
            data={data}
            onItemPress={onItemPress}
          />
        </Box>
      </Box>
    </BottomSheetModal>
  )
}
