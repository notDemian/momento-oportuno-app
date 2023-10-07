import { FC, useCallback, useState } from 'react'

import { FieldSchema } from '@src/api'
import { Box, Button, RadioOption, Text, TextField } from '@src/components'
import { ModalRadioButton } from '@src/components/ModalRadioButton'

const ButtonMudalGenerator: FC<{
  data: { label: string; value: string }[]
  title: string
  onPressItem: (item: RadioOption) => void
}> = ({ data, title, onPressItem }) => {
  const [showModal, setShowModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState<RadioOption>()
  return (
    <>
      <Button
        label={selectedItem ? selectedItem.label : `Seleccionar ${title}`}
        onPress={() => setShowModal(true)}
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

export const ExtraContent: FC<{
  fields: FieldSchema[]
  setInputs: React.Dispatch<
    React.SetStateAction<
      Array<{
        id: number
        value: string
      }>
    >
  >
  setSelectedItems: React.Dispatch<
    React.SetStateAction<
      Array<{
        id: number
        value: NonNullable<FieldSchema['terms']>[number] | undefined
      }>
    >
  >
}> = ({ fields, setInputs, setSelectedItems }) => {
  // const [selectedItems, setSelectedItems] = useState<
  //   Array<{
  //     id: number
  //     value: NonNullable<FieldSchema['terms']>[number] | undefined
  //   }>
  // >([])

  const onSelectedItemsChange = useCallback(
    (id: number) => (newItem: RadioOption) => {
      setSelectedItems((p) => [
        ...p,
        {
          id,
          value: fields
            .find((f) => f.id === id)
            ?.terms?.find((t) => t.id === +newItem.value),
        },
      ])
    },
    [fields],
  )

  // const [inputs, setInputs] = useState<
  //   // Record<string | number, FieldSchema & { value: string }>
  //   Array<{
  //     id: number
  //     value: string
  //   }>
  // >([])

  const onInputChange = useCallback(
    (id: number) => (text: string) => {
      setInputs((p) => {
        const index = p.findIndex((i) => i.id === id)
        if (index === -1) return [...p, { id, value: text }]
        p[index].value = text
        return [...p]
      })
    },
    [],
  )

  return (
    <Box gap={'m'}>
      {fields.map((field, fIndex) => {
        if (field.type === 'embed' || field.type === 'gallery') return null
        if (
          field.type === 'number' ||
          field.type === 'price' ||
          field.type === 'salary'
        )
          return (
            <TextField
              inputProps={{
                placeholder: field.name,
                keyboardType: 'numeric',
                onChangeText: onInputChange(field.id),
              }}
              key={fIndex}
            />
          )
        if (!field.terms) return null

        return (
          <Box key={fIndex}>
            <Text variant={'subHeader'}>{field.name}</Text>
            <ButtonMudalGenerator
              data={field.terms.map((term) => ({
                label: term.name,
                value: term.id + '',
              }))}
              title={field.name}
              onPressItem={onSelectedItemsChange(field.id)}
            />
          </Box>
        )
      })}
    </Box>
  )
}
