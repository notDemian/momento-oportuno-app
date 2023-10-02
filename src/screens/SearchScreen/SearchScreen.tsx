import React, { FC, useCallback } from 'react'

import { AnuncioItem } from './AnuncioItem/AnuncioItem'

import {
  ActivityIndicator,
  Box,
  Button,
  Icon,
  List,
  LoadingPageModal,
  RefreshControl,
  Text,
  TextField,
} from '@src/components'
import {
  useAppSelector,
  useDebounce,
  useSearchStackNavigation,
} from '@src/hooks'
import { useAnuncios } from '@src/hooks'
import { ScreenProps, SearchStackParamList } from '@src/navigation'
import { useAppTheme } from '@src/theme'
import { MappedAnuncio } from '@src/utils'

type SearchScreenProps = ScreenProps<SearchStackParamList, 'Search'>

export const SearchScreen: FC<SearchScreenProps> = ({
  route: { params: { isSearching } = {} },
}) => {
  const { category, state, subCategory } = useAppSelector((p) => p.filter)
  const [searchTerm, setSearchTerm] = React.useState('')
  const navigation = useSearchStackNavigation()

  const onFilter = () => {
    navigation.navigate('Filter')
  }
  const deboncedSearch = useDebounce(searchTerm, 500)

  const {
    isLoading,
    isSuccess,
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch: refresh,
  } = useAnuncios({
    category:
      subCategory && subCategory !== 0 && subCategory !== -1
        ? subCategory
        : category,
    state,
    query: deboncedSearch,
  })

  const fetchMore = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, fetchNextPage])

  const flattenData = data?.pages.flatMap((page) => page.data) ?? []

  const ListHeaderComponent = useCallback(() => {
    return (
      <Box
        backgroundColor='primary'
        flexDirection='row'
        alignItems='center'
        padding='m'
      >
        <TextField
          leftIcon='search'
          flex={1}
          inputProps={{
            // value: searchTerm,
            placeholder: '¿Buscas algo?',
            onChangeText: (e) => {
              setSearchTerm(e)
            },
            autoFocus: isSearching,
          }}
        />
        <Box width={70} alignItems='flex-end' ml={'l'} flexDirection={'row'}>
          <Icon name='filter' color={colors.yellow} />
          <Button variant='transparent' buttonSize='xs' onPress={onFilter}>
            <Text color={'white'}>Filtro</Text>
          </Button>
        </Box>
      </Box>
    )
  }, [isSearching])

  const { colors } = useAppTheme()

  return (
    <Box flex={1}>
      <ListHeaderComponent />
      {isLoading && <LoadingPageModal loading />}
      {isSuccess ? (
        <List<MappedAnuncio>
          data={flattenData}
          // keyExtractor={keyExtractor}

          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refresh} />
          }
          ItemSeparatorComponent={() => null}
          renderItem={({ item, index }) => {
            return <AnuncioItem data={item} key={index} />
          }}
          contentContainerStyle={{ backgroundColor: colors.background }}
          onEndReached={fetchMore}
        />
      ) : null}
      {isFetchingNextPage && <ActivityIndicator />}
    </Box>
  )
}
