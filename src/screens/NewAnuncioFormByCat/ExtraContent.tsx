import { FC, useCallback, useMemo } from 'react'

import { Attribute, ListingAttribute } from '@src/api'
import { Box, RadioOption, Text, TextField } from '@src/components'
import { ButtonModalGenerator } from '@src/components/ModalRadioButton'

export const ExtraContent: FC<{
  fields: Attribute[]
  setInputs: React.Dispatch<React.SetStateAction<ListingAttribute[]>>
}> = ({ fields, setInputs }) => {
  const fieldsSorted = useMemo(() => {
    return fields.sort((a, b) => {
      //put item.type === 'number || text' at the start
      if (a.type === 'number' || a.type === 'text') return -1
      if (b.type === 'number' || b.type === 'text') return 1
      return 0
    })
  }, [fields])

  const onSelectedItemsChange = useCallback(
    (id: number, isMultiple: boolean) => (newItem: RadioOption) => {
      setInputs((p) => {
        const index = p.findIndex((i) => i.attribute_id === id)
        if (!isMultiple) {
          if (index === -1)
            return [
              ...p,
              {
                attribute_id: id,
                value: newItem.value.toString(),
              },
            ]
          p[index]!.value = newItem.value.toString()
          return [...p]
        }

        if (index === -1) {
          return [
            ...p,
            {
              attribute_id: id,
              value: JSON.stringify([newItem.value.toString()]),
            },
          ]
        }
        const parsed = JSON.parse(p[index]!.value) as string[]
        if (parsed.includes(newItem.value.toString())) {
          const filtered = parsed.filter((i) => i !== newItem.value.toString())
          const shouldDelete = filtered.length === 0
          if (shouldDelete) return p.filter((i) => i.attribute_id !== id)
          p[index]!.value = JSON.stringify(filtered)
          return [...p]
        }

        p[index]!.value = JSON.stringify([...parsed, newItem.value.toString()])

        return [...p]
      })
    },
    [],
  )

  const onInputChange = useCallback(
    (id: number) => (text: string) => {
      setInputs((p) => {
        const index = p.findIndex((i) => i.attribute_id === id)
        if (index === -1)
          return [
            ...p,
            {
              attribute_id: id,
              value: text,
            },
          ]
        p[index]!.value = text
        return [...p]
      })
    },
    [],
  )

  return (
    <Box pt={'m'} g={'m'}>
      {fieldsSorted.map((field, fIndex) => {
        if (field.type === 'number' || field.type === 'text')
          return (
            <TextField
              inputProps={{
                placeholder: field.placeholder ?? field.name,
                keyboardType: 'numeric',
                onChangeText: onInputChange(field.id),
              }}
              required={field.is_required}
              key={fIndex}
            />
          )
        if (!field.attributeValues) return null
        if (!field.is_multiple)
          return (
            <Box key={fIndex} width={'100%'} g={'m'}>
              <Text variant={'subHeader'}>{field.name}</Text>
              <ButtonModalGenerator
                data={field.attributeValues.map((term) => ({
                  label: term.name,
                  value: term.id + '',
                }))}
                title={field.name}
                onPressItem={onSelectedItemsChange(field.id, field.is_multiple)}
              />
            </Box>
          )
        return (
          <Box key={fIndex} width={'100%'} g={'m'}>
            <Text variant={'subHeader'}>{field.name}</Text>
            <ButtonModalGenerator
              data={field.attributeValues.map((term) => ({
                label: term.name,
                value: term.id + '',
              }))}
              title={field.name}
              onPressItem={onSelectedItemsChange(field.id, field.is_multiple)}
              multiple
            />
          </Box>
        )
      })}
    </Box>
  )
}
