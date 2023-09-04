import { useState } from 'react'
import { FlatList } from 'react-native'
import { AccordionItem } from '../AccordionItem'
import { AccordionItemProps } from '../AccordionItem/AccordionItem.type'
import { Text } from '../Text'

import { AccordionListProps } from './AccordionList.type'

type AccordionItem = Pick<
  AccordionItemProps,
  'customTitle' | 'customBody' | 'customIcon'
>

const data: AccordionItem[] = [
  {
    customBody: () => {
      return <Text>body</Text>
    },
    customTitle: () => {
      return <Text>title</Text>
    },
  },
]

function AccordionList<T>({
  data,
  customTitle,
  customBody,
  customIcon = undefined,
  containerItemStyle = {},
  animationDuration = 300,
  expandMultiple = false,
  ...props
}: AccordionListProps<T>) {
  const [currentlyOpen, setCurrentlyOpen] = useState<T>()
  const renderItem = ({ item }: { item: T }) => (
    <AccordionItem
      containerStyle={containerItemStyle}
      customTitle={() => customTitle(item)}
      customBody={() => customBody(item)}
      customIcon={customIcon}
      animationDuration={animationDuration}
      isOpen={JSON.stringify(currentlyOpen) === JSON.stringify(item)}
      onPress={(status) => {
        if (status && !expandMultiple) {
          setCurrentlyOpen(item)
        }
      }}
    />
  )
  return (
    <FlatList<T>
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      {...props}
    />
  )
}

export default AccordionList
