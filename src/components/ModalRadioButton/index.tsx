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
  selectedItems?: RadioOption[] | undefined
}

export const ModalRadioButton: FC<ChangeLanguageModalProps> = ({
  isVisible,
  hideModal,
  data,
  title,
  onPressItem,
  selectedItems,
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
            defaultValue={data?.[0]?.value}
            data={data}
            onItemPress={onItemPress}
            selectedItems={selectedItems}
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
  multiple?: boolean
}> = ({ data, title, onPressItem, multiple }) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<
    RadioOption | RadioOption[]
  >()
  const { colors } = useAppTheme()
  return (
    <>
      <Button
        label={
          // selectedItem?.[0] ? selectedItem[0].label : `Seleccionar ${title}`
          Array.isArray(selectedItem)
            ? selectedItem.length > 0
              ? selectedItem.map((s) => s.label).join(', ')
              : title
            : selectedItem?.label ?? title
        }
        onPress={() => setShowModal(true)}
        variant={
          Array.isArray(selectedItem)
            ? selectedItem.length > 0
              ? 'orangy'
              : 'outline'
            : selectedItem
            ? 'orangy'
            : 'outline'
        }
        opacity={
          Array.isArray(selectedItem)
            ? selectedItem.length > 0
              ? 1
              : 0.5
            : selectedItem
            ? 1
            : 0.5
        }
        isFullWidth
        isModal
        modalColor={colors.secondary}
      />
      <ModalRadioButton
        data={data}
        isVisible={showModal}
        hideModal={() => setShowModal(false)}
        onPressItem={(item) => {
          setSelectedItem((p) => {
            if (multiple) {
              if (Array.isArray(p)) {
                const index = p.findIndex((i) => i.value === item.value)
                if (index === -1) return [...p, item]
                p.splice(index, 1)
                return [...p]
              }
              return [item]
            }
            return item
          })

          !multiple && setShowModal(false)
          onPressItem(item)
        }}
        // selectedItems={
        //   multiple
        //     ? Array.isArray(selectedItem)
        //       ? selectedItem
        //       : [selectedItem ?? data[0]]
        //     : undefined
        // }
        {...(multiple
          ? {
              selectedItems: Array.isArray(selectedItem)
                ? selectedItem
                : selectedItem
                ? [selectedItem]
                : [],
            }
          : {})}
        title={title}
      />
    </>
  )
}
