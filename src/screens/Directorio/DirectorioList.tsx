import { useCallback } from 'react'
import { ListRenderItem } from 'react-native'

import { DirectorioItem } from './DirectorioItem'

import { Directorio } from '@src/api'
import { Box, List, LoadingPageModal, RefreshControl } from '@src/components'
import { useDirectorios } from '@src/hooks'
import { DirectorioStackParamList, ScreenProps } from '@src/navigation'
import { keyExtractor } from '@src/utils/keyExtractor'

type MicrositiosProps = ScreenProps<DirectorioStackParamList, 'Directorio'>

export const DirectorioList: React.FC<MicrositiosProps> = () => {
  const { data, isLoading, refetch: refresh } = useDirectorios()

  const renderItem = useCallback<ListRenderItem<Directorio>>(({ item }) => {
    return <DirectorioItem data={item} />
  }, [])
  return (
    <Box flex={1}>
      {!data || isLoading ? (
        <LoadingPageModal loading />
      ) : (
        <List<Directorio>
          renderItem={renderItem}
          data={data.data.reverse()}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={() => null}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refresh} />
          }
          contentContainerStyle={{ padding: '5%' }}
        />
      )}
    </Box>
  )
}
