import React, { useCallback } from 'react'
import { Dimensions } from 'react-native'
import { mockCategories, mockCategoriesIcons } from '@src/data'
import { Box, Icon, Image, Text, Touchable } from '@src/components'
import { useExploreStackNavigation } from '@src/hooks'
import {
  SvgAutosIcon,
  SvgInmuebleIcon,
  SvgMascotasIcon,
  SvgNiñosIcon,
  SvgEmpleosIcon,
} from '@src/components/svgs'

export const PopularCategories: React.FC = () => {
  const itemsPerRow = 3

  const nav = useExploreStackNavigation()

  const onCategoryItemPress = () => {
    nav.navigate('SearchTab', { screen: 'Search' })
  }

  const CustomIcon = useCallback((icon: mockCategoriesIcons) => {
    switch (icon) {
      case 'house':
        return () => <SvgInmuebleIcon scale={0.4} />

      case 'directions-car':
        return () => <SvgAutosIcon scale={0.4} />

      case 'pets':
        return () => <SvgMascotasIcon scale={0.4} />

      case 'work':
        return () => <SvgEmpleosIcon scale={0.4} />

      case 'computer':
        return () => <SvgNiñosIcon scale={0.4} />

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
              <Box width={40} height={40}>
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
