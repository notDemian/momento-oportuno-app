import { FC, useCallback } from 'react'

import { FieldSchema } from '@src/api'
import { Box, RadioOption, Text, TextField } from '@src/components'
import { ButtonModalGenerator } from '@src/components/ModalRadioButton'

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
    <>
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
          <Box key={fIndex} width={'100%'} g={'m'}>
            <Text variant={'subHeader'}>{field.name}</Text>
            <ButtonModalGenerator
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
    </>
  )
}
