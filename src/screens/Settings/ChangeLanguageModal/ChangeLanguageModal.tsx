import React from 'react'

import {
  BottomSheetModal,
  Box,
  RadioButton,
  RadioOption,
  Text,
} from '@src/components'

type ChangeLanguageModalProps = {
  isVisible: boolean
  hideModal: () => void
}

const languageOptions: RadioOption[] = [
  {
    label: 'English',
    value: 'english',
  },
  {
    label: 'Vietnamese',
    value: 'vietnamese',
  },
  {
    label: 'French',
    value: 'French',
  },
]

export const ChangeLanguageModal: React.FC<ChangeLanguageModalProps> = ({
  isVisible,
  hideModal,
}) => {
  const onItemPress = (item: RadioOption) => {}

  return (
    <BottomSheetModal
      isOpened={isVisible}
      useScrollView
      snapPoints={['40%']}
      onClose={hideModal}
    >
      <Box>
        <Text textAlign='center' variant='header'>
          Change Appearance
        </Text>
        <Box marginTop='m'>
          <RadioButton
            defaultValue={languageOptions[0].value}
            data={languageOptions}
            onItemPress={onItemPress}
          />
        </Box>
      </Box>
    </BottomSheetModal>
  )
}
