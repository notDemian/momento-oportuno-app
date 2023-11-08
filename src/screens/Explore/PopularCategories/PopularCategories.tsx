import React, { useCallback } from 'react'
import { Dimensions } from 'react-native'
import { fontSize } from '../../../theme/theme.util'

import { Images } from '@src/assets'
import { Box, Image, LoadingPageModal, Text, Touchable } from '@src/components'
import { mockCategories, mockCategoriesIcons } from '@src/data'
import {
  useAppDispatch,
  useCategorias,
  useExploreStackNavigation,
} from '@src/hooks'
import { setCategory } from '@src/redux'

export const PopularCategories: React.FC = () => {
  const itemsPerRow = 3

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
        return () => (
          <Image source={Images.iconsRojos.inmueble} width={80} height={80} />
        )

      case 'directions-car':
        return () => (
          <Image source={Images.iconsRojos.autos} width={80} height={80} />
        )

      case 'pets':
        return () => (
          <Image source={Images.iconsRojos.mascota} width={80} height={80} />
        )

      case 'work':
        return () => (
          <Image source={Images.iconsRojos.empleo} width={80} height={80} />
        )

      case 'fishing':
        return () => (
          <Image source={Images.iconsRojos.pesca} width={80} height={80} />
        )

      default:
        return () => <></>
    }
  }, [])

  return (
    <Box
      backgroundColor='transparent'
      flexDirection='row'
      flexWrap='wrap'
      justifyContent={'center'}
      marginTop={'l'}
    >
      {isLoading ? <LoadingPageModal loading={isLoading} /> : null}
      {filteredBymockCategoriesJointWithMocks &&
        filteredBymockCategoriesJointWithMocks?.map((category) => {
          const { id, icon, name } = category

          const Icon = CustomIcon(icon)

          return (
            <Touchable key={id} onPress={onCategoryItemPress(id)}>
              <Box
                flexDirection='column'
                alignItems='center'
                width={Dimensions.get('window').width / itemsPerRow}
                borderRadius={'xxl'}
                padding='s'
              >
                <Box width={80} height={80}>
                  <Icon />
                </Box>
                <Box>
                  <Text fontSize={fontSize.m} marginTop='s' fontWeight='bold'>
                    {name}
                  </Text>
                </Box>
              </Box>
            </Touchable>
          )
        })}
    </Box>
  )
}
