import { useCallback } from 'react'
import { ListRenderItem } from 'react-native'

import { MicrositioItem } from './MicrositioItem'

import { Micrositio } from '@src/api'
import { Box, List, LoadingPageModal, RefreshControl } from '@src/components'
import { useMicrositios } from '@src/hooks'
import { MicrositiosStackParamList, ScreenProps } from '@src/navigation'
import { keyExtractor } from '@src/utils/keyExtractor'

type MicrositiosProps = ScreenProps<MicrositiosStackParamList, 'Micrositios'>

export const Micrositios: React.FC<MicrositiosProps> = () => {
  const { data, isLoading, refetch: refresh } = useMicrositios()

  const renderItem = useCallback<ListRenderItem<Micrositio>>(({ item }) => {
    return <MicrositioItem data={item} />
  }, [])
  return (
    <Box flex={1}>
      {!data || isLoading ? (
        <LoadingPageModal loading />
      ) : (
        <List<Micrositio>
          renderItem={renderItem}
          data={data}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={() => null}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refresh} />
          }
          contentContainerStyle={{ padding: '6%' }}
        />
      )}
    </Box>
  )
}
