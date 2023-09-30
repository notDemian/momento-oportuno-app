import React, { useCallback } from 'react'
import { Dimensions } from 'react-native'

import { Images } from '@src/assets'
import { Box, Image, Text, Touchable } from '@src/components'
import { mockCategories, mockCategoriesIcons } from '@src/data'
import { useExploreStackNavigation } from '@src/hooks'

export const PopularCategories: React.FC = () => {
  const itemsPerRow = 3

  const nav = useExploreStackNavigation()

  const onCategoryItemPress = () => {
    nav.navigate('SearchTab', { screen: 'Search' })
  }

  const CustomIcon = useCallback((icon: mockCategoriesIcons) => {
    switch (icon) {
      case 'house':
        return () => (
          <Image source={Images.iconsRojos.inmueble} width={60} height={60} />
        )

      case 'directions-car':
        return () => (
          <Image source={Images.iconsRojos.autos} width={60} height={60} />
        )

      case 'pets':
        return () => (
          <Image source={Images.iconsRojos.mascota} width={60} height={60} />
        )

      case 'work':
        return () => (
          <Image source={Images.iconsRojos.empleo} width={60} height={60} />
        )

      case 'fishing':
        return () => (
          <Image source={Images.iconsRojos.pesca} width={60} height={60} />
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
      {mockCategories.map((category) => {
        const { id, icon, name } = category

        const Icon = CustomIcon(icon)

        return (
          <Touchable key={id} onPress={onCategoryItemPress}>
            <Box
              flexDirection='column'
              alignItems='center'
              width={Dimensions.get('window').width / itemsPerRow}
              borderRadius={'xxl'}
              padding='s'
            >
              <Box width={60} height={60}>
                <Icon />
              </Box>
              <Box>
                <Text fontSize={12} marginTop='s' fontWeight='bold'>
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
