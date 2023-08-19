import React from 'react'
import { ListRenderItemInfo } from 'react-native'
import { Icon, ListRowItem, ListRowItemProps, List, Box } from '@src/components'
import { notifications } from '@src/data/mock-notification'

export const Notification = () => {
  const data = notifications.map((item) => {
    const { id, title, subTitle } = item
    return {
      id,
      title,
      subTitle,
      leftElement: (
        <Box backgroundColor='primary' padding='s' borderRadius='xxl'>
          <Icon name='mail' color='white' />
        </Box>
      ),
      hasChevron: true,
    }
  })

  const renderItem = (props: ListRenderItemInfo<ListRowItemProps>) => {
    return <ListRowItem key={props.index} {...props.item} />
  }

  return <List data={data} renderItem={renderItem} />
}
