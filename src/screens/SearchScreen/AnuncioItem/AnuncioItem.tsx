import React from 'react'

import { AnuncioProps } from './AnuncioItem.type'

import { Box, Image, Text, Touchable } from '@src/components'
import { useSearchStackNavigation } from '@src/hooks'
import { fontSize } from '@src/theme'

export const AnuncioItem: React.FC<AnuncioProps> = ({ data }) => {
  const {
    defaultImages,
    defaultPrices,
    pricesAsSalary,
    Categories: Categories,
    estados,
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
    <Touchable onPress={onPlaceItemPress} activeOpacity={0.5}>
      <Box
        flexDirection='row'
        padding='s'
        backgroundColor='card'
        borderWidth={1}
        elevation={3}
        borderColor='card'
        borderRadius='m'
        margin='s'
      >
        {defaultImages && defaultImages[0] && (
          <Image
            width={120}
            height={120}
            borderRadius='m'
            marginRight='m'
            source={defaultImages[0]}
          />
        )}
        <Box flex={1} justifyContent={'center'}>
          <Box>
            <Text fontWeight='bold' fontSize={fontSize.s} color={'primary'}>
              {rendered}
            </Text>
            <Text
              variant='secondary'
              marginTop='xs'
              marginBottom='s'
              numberOfLines={3}
            >
              {estados.join(', ')}
            </Text>
            <Box flexDirection={'row'} gap={'s'}>
              {Categories.map((cat) => {
                return (
                  <Box
                    key={cat.toString()}
                    backgroundColor={'secondary'}
                    borderRadius={'s'}
                    paddingHorizontal={'s'}
                    overflow={'hidden'}
                  >
                    <Text fontWeight='bold' color='white' fontSize={10}>
                      {cat}
                    </Text>
                  </Box>
                )
              })}
            </Box>
            <Text fontWeight='normal' color='black' fontSize={fontSize.s}>
              {defaultPrices[0] ?? pricesAsSalary[0]}
            </Text>
          </Box>
        </Box>
      </Box>
    </Touchable>
  )
}
