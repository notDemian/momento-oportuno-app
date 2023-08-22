import { Button, CheckBox } from '../elements'
import { useEffect, useState } from 'react'

interface listItem {
  id: string
  label: string
}

interface CheckboxListProps {
  items: listItem[]
  onChange: (values: string[]) => void
  value?: string[]
}

export const CheckboxList = ({ items, onChange, value }: CheckboxListProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>(value || [])

  const onItemChange = (item: listItem) => {
    const index = selectedItems.indexOf(item.id)
    if (index === -1) {
      setSelectedItems([...selectedItems, item.id])
    } else {
      setSelectedItems(selectedItems.filter((i) => i !== item.id))
    }
  }

  useEffect(() => {
    onChange(selectedItems)
  }, [selectedItems])

  const [showMore, setShowMore] = useState(false)

  return (
    <>
      {items.length < 10 ? (
        items.map((item) => (
          <CheckBox
            key={item.id}
            label={item.label}
            onChange={() => onItemChange(item)}
          />
        ))
      ) : !showMore ? (
        <>
          {[...items].slice(0, 10).map((item) => (
            <CheckBox
              key={item.id}
              label={item.label}
              onChange={() => onItemChange(item)}
            />
          ))}
          <Button
            label='Ver más'
            isFullWidth
            onPress={() => setShowMore(true)}
            variant={'info'}
          />
        </>
      ) : (
        <>
          {items.map((item) => (
            <CheckBox
              key={item.id}
              label={item.label}
              onChange={() => onItemChange(item)}
            />
          ))}
          <Button
            label='Ver menos'
            isFullWidth
            onPress={() => setShowMore(false)}
            variant={'info'}
          />
        </>
      )}
    </>
  )
}

export type CheckBoxListItem = listItem
