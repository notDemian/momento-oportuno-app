import { useCallback, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'

import { FilterProps } from './Filter.type'

import {
  ActivityIndicator,
  Box,
  Button,
  LoadingPageModal,
  Text,
  Touchable,
} from '@src/components'
import { useAppDispatch, useCategorias } from '@src/hooks'
import { fontSize } from '@src/theme'

export const Filter: React.FC<FilterProps> = ({ navigation }) => {
  const [params, setParams] = useState<{
    category: number
    priceMax: number
    priceMin: number
    state: string
  }>({
    category: 0,
    priceMax: 0,
    priceMin: 0,
    state: '',
  })
  // const { category, priceMax, priceMin, state } = useAppSelector(
  //   (p) => p.filter,
  // )
  const dispatch = useAppDispatch()

  const { data, isLoading } = useCategorias()
  const { data: subCategorias } = useCategorias(params.category)

  const handleValueChange = useCallback((low: number, high: number) => {
    setParams({ ...params, priceMin: low, priceMax: high })
  }, [])

  const handleApplyFilter = () => {
    navigation.goBack()
  }

  const onPressCategory = (catId: number) => () => {
    setParams({ ...params, category: catId })
  }

  return (
    <Box flex={1} p={'l'} backgroundColor={'white'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box>
          <Text variant='subHeader' mb={'l'}>
            Categorías
          </Text>
          <Box
            backgroundColor='transparent'
            flexDirection='row'
            flexWrap='wrap'
          >
            {isLoading || !data ? (
              <LoadingPageModal loading />
            ) : (
              data.map((cat, index) => {
                const isSelected = cat.id === params.category
                return (
                  <Touchable key={index} onPress={onPressCategory(cat.id)}>
                    <Box
                      flexDirection='column'
                      alignItems='center'
                      justifyContent={'center'}
                      borderRadius={'xl'}
                      paddingHorizontal='s'
                      paddingBottom={'s'}
                      m={'s'}
                      backgroundColor={isSelected ? 'secondary' : 'white'}
                      borderColor={'secondary'}
                      borderWidth={1}
                    >
                      <Box>
                        <Text
                          fontSize={fontSize.s}
                          marginTop='s'
                          fontWeight='bold'
                          color={isSelected ? 'white' : 'secondary'}
                        >
                          {cat.name}
                        </Text>
                      </Box>
                    </Box>
                  </Touchable>
                )
              })
            )}
          </Box>
        </Box>
        {params.category !== 0 ? (
          <Box>
            <Text variant='subHeader' mb={'l'}>
              Subcategoría
            </Text>
            {subCategorias && subCategorias.length > 0 ? (
              <Box
                backgroundColor='transparent'
                flexDirection='row'
                flexWrap='wrap'
              >
                {isLoading || !data ? (
                  <LoadingPageModal loading />
                ) : (
                  subCategorias.map((cat, index) => {
                    const isSelected = cat.id === params.category
                    return (
                      <Touchable key={index} onPress={onPressCategory(cat.id)}>
                        <Box
                          flexDirection='column'
                          alignItems='center'
                          justifyContent={'center'}
                          borderRadius={'xl'}
                          paddingHorizontal='s'
                          paddingBottom={'s'}
                          m={'s'}
                          backgroundColor={isSelected ? 'secondary' : 'white'}
                          borderColor={'secondary'}
                          borderWidth={1}
                          opacity={0.6}
                        >
                          <Box>
                            <Text
                              fontSize={fontSize.s}
                              marginTop='s'
                              fontWeight='bold'
                            >
                              {cat.name}
                            </Text>
                          </Box>
                        </Box>
                      </Touchable>
                    )
                  })
                )}
              </Box>
            ) : (
              <ActivityIndicator />
            )}
          </Box>
        ) : null}
        {/* <Box height={120} mt={'l'}>
          <Text variant='subHeader' mb={'l'}>
            Rango de precio: {params.priceMin} - {params.priceMax}
          </Text>
          <RangeSlide handleValueChange={handleValueChange} step={100} />
        </Box> */}
      </ScrollView>
      <Box
        paddingHorizontal='m'
        paddingVertical='s'
        alignItems='center'
        justifyContent='center'
        backgroundColor={'transparent'}
      >
        <Button
          isFullWidth
          label={'Aplicar filtro'}
          onPress={handleApplyFilter}
        />
      </Box>
    </Box>
  )
}
