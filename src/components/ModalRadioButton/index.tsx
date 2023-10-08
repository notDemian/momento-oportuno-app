import { type FC, useCallback, useState } from 'react'

import {
  BottomSheetModal,
  Box,
  Button,
  RadioButton,
  RadioOption,
  Text,
} from '..'

import { useAppTheme } from '@src/theme'

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

export const ButtonModalGenerator: FC<{
  data: { label: string; value: string }[]
  title: string
  onPressItem: (item: RadioOption) => void
}> = ({ data, title, onPressItem }) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<RadioOption>()
  const { colors } = useAppTheme()
  return (
    <>
      <Button
        label={selectedItem ? selectedItem.label : `Seleccionar ${title}`}
        onPress={() => setShowModal(true)}
        variant={selectedItem ? 'orangy' : 'outline'}
        opacity={selectedItem ? 1 : 0.5}
        isFullWidth
        isModal
        modalColor={colors.secondary}
      />
      <ModalRadioButton
        data={data}
        isVisible={showModal}
        hideModal={() => setShowModal(false)}
        onPressItem={(item) => {
          setSelectedItem(item)
          setShowModal(false)
          onPressItem(item)
        }}
        title={title}
      />
    </>
  )
}
