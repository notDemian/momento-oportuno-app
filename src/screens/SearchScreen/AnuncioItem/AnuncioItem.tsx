import React from 'react'
import { AnuncioProps } from './AnuncioItem.type'
import { Box, Text, Touchable, Image } from '@src/components'

import { useSearchStackNavigation } from '@src/hooks'
import { fontSize } from '@src/theme'

export const AnuncioItem: React.FC<AnuncioProps> = ({ data }) => {
  const {
    listivo_145,
    listivo_130,
    listivo_2863,
    title: { rendered },
  } = data
  const navigation = useSearchStackNavigation()

  const onPlaceItemPress = () => {
    navigation.navigate('AnuncioDetailsModal', {
      data: {
        id: data.id,
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
        {listivo_145 && listivo_145[0] && (
          <Image
            width={70}
            height={70}
            borderRadius='m'
            marginRight='m'
            source={listivo_145[0]}
          />
        )}
        <Box flex={1}>
          <Box>
            <Text fontWeight='bold' fontSize={fontSize.s}>
              {rendered}
            </Text>
            <Text
              variant='secondary'
              marginTop='xs'
              marginBottom='s'
              numberOfLines={3}
            >
              {listivo_2863[0]}
            </Text>
            <Text fontWeight='bold' color='primary'>
              {listivo_130[0]}
            </Text>
          </Box>
        </Box>
      </Box>
    </Touchable>
  )
}
