import { useCallback } from 'react'
import { ListRenderItem } from 'react-native'

import { Box, Button, List, SvgEmptyBox, Text } from '@src/components'
import { useAccountStackNavigation } from '@src/hooks'

export const DirectoriosTab = () => {
  const nav = useAccountStackNavigation()

  const renderItem = useCallback<ListRenderItem<unknown>>(({ item }) => {
    return <Box />
  }, [])

  const ListEmptyComponent = useCallback(() => {
    return (
      <Box flex={1} justifyContent='center' alignItems='center'>
        <Text variant='header' textAlign={'center'} m={'l'}>
          Aún no has creado ningún Directorio
        </Text>
        <SvgEmptyBox />
        <Button
          variant={'secondary'}
          label='Crear Directorio'
          margin={'l'}
          onPress={() => {
            nav.navigate('DirectorioTab', { screen: 'CreateDirectorio' })
          }}
        />
      </Box>
    )
  }, [])

  return (
    <List
      renderItem={renderItem}
      data={[]}
      ListEmptyComponent={ListEmptyComponent}
      ItemSeparatorComponent={() => null}
      contentContainerStyle={{ flexGrow: 1, backgroundColor: 'transparent' }}
      style={{ backgroundColor: 'transparent', flexGrow: 1 }}
      scrollEnabled={false}
      showsVerticalScrollIndicator={false}
    />
  )
}
