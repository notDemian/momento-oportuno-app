import React, { useCallback } from 'react'
import { Dimensions } from 'react-native'
import { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types'
import { fontSize, getShadowBoxProps } from '../../../theme/theme.util'

import CarSvg from '@src/assets/svgs/Car'
import CatSvg from '@src/assets/svgs/Cat'
import FishingSvg from '@src/assets/svgs/Fishing'
import HouseSvg from '@src/assets/svgs/House'
import PersonSvg from '@src/assets/svgs/Person'
import {
  Box,
  Carousel,
  LoadingPageModal,
  Text,
  Touchable,
} from '@src/components'
import { mockCategories, mockCategoriesIcons } from '@src/data'
import {
  useAppDispatch,
  useCategorias,
  useExploreStackNavigation,
} from '@src/hooks'
import { setCategory } from '@src/redux'

export const PopularCategories: React.FC = () => {
  const nav = useExploreStackNavigation()
  const dispatch = useAppDispatch()

  const { data, isLoading } = useCategorias()
  const filteredBymockCategoriesJointWithMocks = data?.data
    ?.filter((categoria) =>
      mockCategories.some(
        (mockCategory) =>
          mockCategory.name.toLowerCase() === categoria.name.toLowerCase(),
      ),
    )
    .map((categoria) => {
      const mockCategory = mockCategories.find(
        (mockCategory) =>
          mockCategory.name.toLowerCase() === categoria.name.toLowerCase(),
      )

      return {
        ...categoria,
        icon: mockCategory?.icon ?? 'directions-car',
      }
    })

  const onCategoryItemPress = useCallback(
    (id: number) => () => {
      dispatch(setCategory(id))
      nav.navigate('SearchTab', { screen: 'Search' })
    },
    [],
  )

  const CustomIcon = useCallback((icon: mockCategoriesIcons) => {
    switch (icon) {
      case 'house':
        return () => <HouseSvg />

      case 'directions-car':
        return () => <CarSvg />

      case 'pets':
        return () => <CatSvg />

      case 'work':
        return () => <PersonSvg />

      case 'fishing':
        return () => <FishingSvg />

      default:
        return () => <></>
    }
  }, [])

  const renderItem = useCallback(
    ({
      item,
    }: CarouselRenderItemInfo<
      NonNullable<typeof filteredBymockCategoriesJointWithMocks>[number]
    >) => {
      const { id, icon, name } = item

      const Icon = CustomIcon(icon)

      return (
        <Box {...getShadowBoxProps()} marginHorizontal={'m'} flex={1}>
          <Box
            flexDirection='column'
            alignItems='center'
            justifyContent={'space-around'}
            borderRadius={'xxl'}
            padding='s'
            flex={1}
          >
            <Box flex={1} justifyContent={'center'} alignItems={'center'}>
              <Icon />
            </Box>
            <Box>
              <Text fontSize={fontSize.m} marginVertical='s' fontWeight='bold'>
                {name}
              </Text>
            </Box>
            <Box
              flexDirection='row'
              alignItems='center'
              justifyContent='center'
              marginTop='s'
              paddingHorizontal={'s'}
              backgroundColor={'primary'}
              borderRadius={'xl'}
              height={40}
              width={'100%'}
            >
              <Touchable onPress={onCategoryItemPress(id)}>
                <Text
                  fontSize={fontSize.m}
                  marginTop='s'
                  fontWeight='bold'
                  color={'white'}
                >
                  Ver Más
                </Text>
              </Touchable>
            </Box>
          </Box>
        </Box>
      )
    },
    [],
  )

  return (
    <Box backgroundColor={'primary'} paddingVertical={'l'}>
      <Text
        fontSize={fontSize.l}
        fontWeight='bold'
        color={'white'}
        marginBottom='m'
        textAlign={'center'}
      >
        Categorías
      </Text>
      {isLoading ? <LoadingPageModal loading={isLoading} /> : null}

      <Carousel
        data={filteredBymockCategoriesJointWithMocks ?? []}
        numItemsPerSlide={1.4}
        renderItem={renderItem}
        width={Dimensions.get('window').width}
        height={300}
      />
    </Box>
  )
}
