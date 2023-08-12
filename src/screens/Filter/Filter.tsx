import { useCallback, useState } from 'react'
import {
  BlurView,
  Box,
  Button,
  DishItem,
  Icon,
  SectionList,
  Text,
  TextField,
  Touchable,
} from '@src/components'
import { useFilterContext } from '@src/filterContext/filter'
import { FilterProps } from './Filter.type'

import { RangeSlide } from '@src/components/RangeSlide/RangeSlide'
import { FilterCategories, FilterSizes, FilterStyles } from './Filter.mock'
import { fontSize } from '@src/theme'
import { ScrollView } from 'react-native-gesture-handler'

export const Filter: React.FC<FilterProps> = ({ navigation }) => {
  const [low, setLow] = useState(0)
  const [high, setHigh] = useState(100)
  const filterContext = useFilterContext()

  const handleValueChange = useCallback((low: number, high: number) => {
    setLow(low)
    setHigh(high)
  }, [])

  const handleOnSize = (size: (typeof FilterSizes)[number]) => {
    return () => {
      filterContext.toggleSize(size)
    }
  }

  const handleApplyFilter = () => {
    navigation.goBack()
  }

  return (
    <Box flex={1} p={'l'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box height={120} mt={'l'}>
          <Text variant='subHeader' mb={'l'}>
            Rango de precio: {low} - {high}
          </Text>
          <RangeSlide handleValueChange={handleValueChange} step={100} />
        </Box>
        <Box>
          <Text variant='subHeader' mb={'l'}>
            Tamaño
          </Text>
          <Box
            backgroundColor='transparent'
            flexDirection='row'
            flexWrap='wrap'
          >
            {FilterSizes.map((size, index) => {
              return (
                <Touchable key={index} onPress={handleOnSize(size)}>
                  <Box
                    flexDirection='column'
                    alignItems='center'
                    justifyContent={'center'}
                    width={60}
                    height={60}
                    borderRadius={'xxl'}
                    padding='s'
                    paddingBottom={'m'}
                    m={'s'}
                    backgroundColor={'secondary'}
                    opacity={filterContext.sizes.includes(size) ? 0.6 : 0.25}
                  >
                    <Box>
                      <Text
                        fontSize={fontSize.xl}
                        marginTop='s'
                        fontWeight='bold'
                      >
                        {size}
                      </Text>
                    </Box>
                  </Box>
                </Touchable>
              )
            })}
          </Box>
        </Box>
        <Box>
          <Text variant='subHeader' mb={'l'}>
            Color
          </Text>
          <Box
            backgroundColor='transparent'
            flexDirection='row'
            flexWrap='wrap'
          >
            {FilterStyles.map((style, index) => {
              return (
                <Touchable key={index}>
                  <Box
                    flexDirection='column'
                    alignItems='center'
                    justifyContent={'center'}
                    width={60}
                    height={60}
                    borderRadius={'xxl'}
                    padding='s'
                    paddingBottom={'m'}
                    m={'s'}
                    // backgroundColor={style}
                    style={{ backgroundColor: style }}
                    // opacity={filterContext.sizes.includes(size) ? 0.6 : 0.25}
                    opacity={0.6}
                  />
                </Touchable>
              )
            })}
          </Box>
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
            {FilterCategories.map((cat, index) => {
              return (
                <Touchable key={index}>
                  <Box
                    flexDirection='column'
                    alignItems='center'
                    justifyContent={'center'}
                    borderRadius={'xl'}
                    paddingHorizontal='s'
                    paddingBottom={'s'}
                    m={'s'}
                    backgroundColor={'transparent'}
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
                        {cat}
                      </Text>
                    </Box>
                  </Box>
                </Touchable>
              )
            })}
          </Box>
        </Box>
      </ScrollView>
      <Box
        paddingHorizontal='m'
        paddingVertical='s'
        alignItems='center'
        justifyContent='center'
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
