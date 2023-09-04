import { ListRenderItemInfo } from 'react-native'

import {
  Box,
  Divider,
  List,
  ListRowItem,
  ListRowItemProps,
  TextField,
} from '@src/components'
import { Address, savedAddresses } from '@src/data/mock-address'

export const AddAddress = () => {
  const prepareListData = (addresses: Address[]) => {
    return addresses.map((item) => {
      const { id, description, name } = item
      return {
        id,
        title: name,
        subTitle: description,
      }
    })
  }

  const renderItem = (props: ListRenderItemInfo<ListRowItemProps>) => {
    return <ListRowItem key={props.index} {...props.item} />
  }

  const renderListHeader = () => {
    return (
      <>
        <Box paddingVertical='s' paddingHorizontal='m'>
          <TextField
            inputProps={{
              placeholder: 'Enter Address',
            }}
            leftIcon='location'
          />
        </Box>
        <Divider marginVertical='s' />
      </>
    )
  }

  return (
    <List
      data={prepareListData(savedAddresses)}
      ListHeaderComponent={renderListHeader()}
      renderItem={renderItem}
    />
  )
}
