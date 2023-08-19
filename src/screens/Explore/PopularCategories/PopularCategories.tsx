import React from 'react'
import { Dimensions } from 'react-native'
import { mockCategories } from '@src/data'
import { Box, Icon, Image, Text, Touchable } from '@src/components'
import { PopularCategoriesProps } from './PopularCategories.type'

export const PopularCategories: React.FC<PopularCategoriesProps> = ({
  navigation,
}) => {
  const itemsPerRow = 3
  console.log({
    itemsPerRow,
  })

  const onCategoryItemPress = (name: string) => {
    return () => {
      navigation.navigate('PlaceList', { title: name })
    }
  }

  return (
    <Box backgroundColor='transparent' flexDirection='row' flexWrap='wrap'>
      {mockCategories.map((category) => {
        const { id, icon, name } = category
        return (
          <Touchable key={id} onPress={onCategoryItemPress(name)}>
            <Box
              flexDirection='column'
              alignItems='center'
              width={Dimensions.get('window').width / itemsPerRow}
              borderRadius={'xxl'}
              padding='s'
            >
              <Box>
                <Icon name={icon as any} type='MaterialIcons' />
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
