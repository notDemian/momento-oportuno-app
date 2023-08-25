import type { Anuncio } from '@src/api/Anuncios/Anuncios.type'
import {
  Box,
  Button,
  Icon,
  List,
  LoadingPageModal,
  Text,
  TextField,
} from '@src/components'
import { useFilterContext } from '@src/filterContext/filter'
import { useSearchStackNavigation } from '@src/hooks'
import { useAnuncios } from '@src/hooks'
import { keyExtractor } from '@src/utils/keyExtractor'
import React, { useCallback } from 'react'
import { AnuncioItem } from './AnuncioItem/AnuncioItem'
import { useAppTheme } from '@src/theme'

export const SearchScreen = () => {
  const [_searchTerm, setSearchTerm] = React.useState('')
  const navigation = useSearchStackNavigation()

  const onFilter = () => {
    navigation.navigate('Filter')
  }

  const _filterContext = useFilterContext()

  const { isLoading, isSuccess, data } = useAnuncios()

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
              console.log(e)
              setSearchTerm(e)
            },
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
  }, [])

  const { colors } = useAppTheme()

  return (
    <Box flex={1}>
      <ListHeaderComponent />
      {isLoading && <LoadingPageModal loading />}
      {isSuccess ? (
        <List<Anuncio>
          data={data}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={() => null}
          renderItem={({ item }) => {
            return <AnuncioItem data={item} />
          }}
          contentContainerStyle={{ backgroundColor: colors.background }}
        />
      ) : null}
    </Box>
  )
}
