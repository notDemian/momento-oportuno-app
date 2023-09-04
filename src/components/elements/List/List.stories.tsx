import { FlatListProps, ListRenderItem } from 'react-native'
import { Card } from '../Card'

import { List } from './List'

import { PlaceCardInfo } from '@src/components'
import { mockPlaceList } from '@src/data'
import { Meta, StoryObj } from '@storybook/react-native'

export default {
  title: 'List',
  component: List,

  args: {
    data: mockPlaceList,
  },
} as Meta<FlatListProps<any>>

type Story = StoryObj<FlatListProps<any>>;

const renderItem: ListRenderItem<any> = (props) => {
  const { title, subTitle } = props.item
  return (
    <Card
      key={props.index}
      coverImageSize="m"
      title={title}
      subTitle={subTitle}
      marginRight="m"
      width="100%"
      borderRadius="none"
      onPress={() => console.log('item pressed')}>
      <PlaceCardInfo data={props.item} />
    </Card>
  )
}

const renderHorizontalItem: ListRenderItem<any> = (props) => {
  const { title, subTitle } = props.item
  return (
    <Card
      variant="flat"
      key={props.index}
      coverImageSize="m"
      title={title}
      subTitle={subTitle}
      marginRight="m"
      width={200}
      titleProps={{ numberOfLines: 1 }}
      subTitleProps={{ numberOfLines: 2 }}
      onPress={() => console.log('item pressed')}>
      <PlaceCardInfo data={props.item} />
    </Card>
  )
}

export const Basic: Story = {
  args: {
    renderItem,
  },
}

export const Horizontal: Story = {
  args: {
    renderItem: renderHorizontalItem,
    horizontal: true,
    contentContainerStyle: { height: 180, padding: 16 },
  },
}
