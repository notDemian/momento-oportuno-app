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
import { ModalRadioButton } from '@src/components/ModalRadioButton'
import {
  useAppDispatch,
  useAppSelector,
  useCategorias,
  useEstados,
} from '@src/hooks'
import { FilterState, setFilterParams } from '@src/redux'
import { fontSize } from '@src/theme'
import { wait } from '@src/utils/wait'

export const Filter: React.FC<FilterProps> = ({ navigation }) => {
  const { category, priceMax, priceMin, state, subCategory } = useAppSelector(
    (p) => p.filter,
  )
  const dispatch = useAppDispatch()

  const [showModalEstados, setShowModalEstados] = useState(false)
  const [params, setParams] = useState<FilterState>({
    category: category ?? 0,
    priceMax: priceMax ?? 0,
    priceMin: priceMin ?? 0,
    state: state ?? 0,
    subCategory: subCategory ?? 0,
  })

  const { data, isLoading } = useCategorias()
  const { data: subCategorias } = useCategorias(params.category)
  const { data: estados, isLoading: isLoadingStates } = useEstados()

  const handleValueChange = useCallback((low: number, high: number) => {
    setParams({ ...params, priceMin: low, priceMax: high })
  }, [])

  const handleApplyFilter = async () => {
    dispatch(setFilterParams(params))
    await wait(1000)
    navigation.goBack()
  }

  const onPressCategory = (catId: number) => () => {
    setParams({ ...params, category: catId, subCategory: 0 })
  }

  const onPressSubCategory = (catId: number) => () => {
    setParams({ ...params, subCategory: catId })
  }

  const handleEstado = () => {
    setShowModalEstados(true)
  }

  return (
    <Box flex={1} p={'l'} backgroundColor={'white'}>
      {estados && !isLoadingStates && (
        <ModalRadioButton
          data={estados.map((e) => ({ label: e.name, value: e.id }))}
          isVisible={showModalEstados}
          hideModal={() => setShowModalEstados(false)}
          title='Estados'
          onPressItem={(item) => {
            setParams({
              ...params,
              state:
                typeof item.value === 'string'
                  ? parseInt(item.value)
                  : item.value,
            })
            // setShowModalEstados(false)
          }}
        />
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box paddingVertical={'m'}>
          <Button onPress={handleEstado}>
            {params.state !== 0
              ? estados?.find((e) => e.id === params.state)?.name
              : 'Seleccione un estado'}
          </Button>
        </Box>
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
                    const isSelected = cat.id === params.subCategory
                    return (
                      <Touchable
                        key={index}
                        onPress={onPressSubCategory(cat.id)}
                      >
                        <Box
                          flexDirection='column'
                          alignItems='center'
                          justifyContent={'center'}
                          borderRadius={'xl'}
                          paddingHorizontal='s'
                          paddingBottom={'s'}
                          m={'s'}
                          backgroundColor={isSelected ? 'creamy' : 'white'}
                          borderColor={'creamy'}
                          borderWidth={1}
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
