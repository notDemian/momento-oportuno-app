import React from 'react'
import {
  BlurView,
  Box,
  Button,
  DishItem,
  Icon,
  SectionList,
  Text,
  TextField,
} from '@src/components'
import { mockPlaceDetails } from '@src/data'
import { isIos } from '@src/utils'
import { useSearchStackNavigation } from '@src/hooks'
import { useFilterContext } from '@src/filterContext/filter'

export const SearchDishes = () => {
  const [searchTerm, setSearchTerm] = React.useState('')
  const navigation = useSearchStackNavigation()

  const onFilter = () => {
    navigation.navigate('Filter')
  }

  const onSearch = (e: string) => {
    setSearchTerm(e)
  }

  const filterContext = useFilterContext()

  const [showEmpty, setShowEmpty] = React.useState(false)

  return (
    <Box flex={1}>
      <Box
        paddingHorizontal='m'
        paddingVertical='s'
        alignItems='center'
        justifyContent='center'
      >
        <Button
          isFullWidth
          label={'Mostrar vacío'}
          onPress={() => {
            setShowEmpty((p) => !p)
          }}
        />
      </Box>
      <SectionList
        sections={!showEmpty ? mockPlaceDetails.dishSection || [] : []}
        keyExtractor={(item) => item.title}
        ItemSeparatorComponent={() => null}
        ListHeaderComponent={
          <Box
            backgroundColor='card'
            flexDirection='row'
            alignItems='center'
            padding='m'
          >
            <TextField
              leftIcon='search'
              flex={1}
              inputProps={{
                value: searchTerm,
                placeholder: '¿Buscas algo?',
                onChangeText: onSearch,
              }}
            />
            <Box
              width={70}
              alignItems='flex-end'
              ml={'l'}
              flexDirection={'row'}
            >
              <Icon name='filter' />
              <Button
                variant='transparent'
                buttonSize='xs'
                label='Filtro'
                onPress={onFilter}
              />
            </Box>
          </Box>
        }
        renderItem={({ item }) => {
          return <DishItem data={item} />
        }}
      />
    </Box>
  )
}
