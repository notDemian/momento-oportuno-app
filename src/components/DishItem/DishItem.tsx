import React from 'react'
import { Box, Image,Text, Touchable } from '../elements'

import { DishItemProps } from './DishItem.type'

import { useSearchStackNavigation } from '@src/hooks'
import { fontSize } from '@src/theme'
import { formatCurrency } from '@src/utils'

export const DishItem: React.FC<DishItemProps> = ({ data }) => {
  const { price, title, image, views } = data
  const navigation = useSearchStackNavigation()

  const onPlaceItemPress = () => {
    navigation.navigate('AnuncioDetailsModal', {
      data: {
        id: +data.id,
      },
    })
  }

  return (
    <Touchable onPress={onPlaceItemPress} activeOpacity={0.5} borderWidth={0}>
      <Box
        flexDirection='row'
        padding='m'
        backgroundColor='card'
        borderWidth={0}
      >
        {image && (
          <Image
            width={70}
            height={70}
            borderRadius='m'
            marginRight='m'
            source={image}
          />
        )}
        <Box flex={1}>
          <Box>
            <Text fontWeight='bold' fontSize={fontSize.s}>
              {title}
            </Text>
            <Text
              variant='secondary'
              marginTop='xs'
              marginBottom='s'
              numberOfLines={3}
            >
              {views}
            </Text>
            <Text fontWeight='bold' color='primary'>
              {formatCurrency(price)}
            </Text>
          </Box>
        </Box>
      </Box>
    </Touchable>
  )
}
