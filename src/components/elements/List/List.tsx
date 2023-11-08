import React from 'react'
import { FlatList, FlatListProps } from 'react-native'
import { Box } from '../Box'
import { Divider } from '../Divider'
import { Text } from '../Text'

import { useScrollToTop } from '@react-navigation/native'
import { useAppTheme } from '@src/theme'

export function List<T>({ contentContainerStyle, ...rest }: FlatListProps<T>) {
  const { colors } = useAppTheme()
  const ref = React.useRef(null)
  useScrollToTop(ref)

  const renderDivider = () => {
    return <Divider />
  }

  return (
    <FlatList
      ref={ref}
      ItemSeparatorComponent={rest.ItemSeparatorComponent ?? (() => null)}
      ListEmptyComponent={
        <Box flex={1} justifyContent='center' alignItems='center'>
          <Text variant='secondary'>Sin info</Text>
        </Box>
      }
      style={{ backgroundColor: colors.card }}
      contentContainerStyle={[
        {
          backgroundColor: colors.card,
        },
        contentContainerStyle,
      ]}
      {...rest}
    />
  )
}
