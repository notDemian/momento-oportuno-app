import { FC } from 'react'

import { AnuncioProps } from './AnuncioItem.type'

import { Box, Image, Text, Touchable } from '@src/components'
import { useSearchStackNavigation } from '@src/hooks'
import { fontSize } from '@src/theme'
import { OldMappedAnuncio } from '@src/utils'

export const AnuncioItem: FC<AnuncioProps> = ({ data, isFav }) => {
  const {
    image,
    defaultPrice,
    pricesAsSalary,
    Categories: Categories,
    estados,
    title,
  } = data
  const navigation = useSearchStackNavigation()

  const onPlaceItemPress = () => {
    if (isFav) {
      navigation.jumpTo('SearchTab', {
        screen: 'AnuncioDetailsModal',
        params: { data: { id: data.id } },
      })
      return
    }
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
        {image && (
          <Image
            width={120}
            height={120}
            borderRadius='m'
            marginRight='m'
            source={image}
          />
        )}
        <Box flex={1} justifyContent={'center'}>
          <Box>
            <Text
              fontWeight='bold'
              fontSize={fontSize.m}
              color={'primary'}
              style={{ color: '#1a1a1a' }}
            >
              {title}
            </Text>
            <Text
              variant='secondary'
              marginTop='xs'
              marginBottom='s'
              fontSize={fontSize.s}
              numberOfLines={3}
            >
              {estados.map((e) => e.name).join()}
            </Text>
            <Box flexDirection={'row'} gap={'s'}>
              {Categories.map((cat) => {
                return (
                  <Box
                    key={cat.id.toString()}
                    backgroundColor={'secondary'}
                    borderRadius={'s'}
                    paddingHorizontal={'s'}
                    overflow={'hidden'}
                    style={{ backgroundColor: '#C01034' }}
                  >
                    <Text fontWeight='bold' color='white' fontSize={10}>
                      {cat.name}
                    </Text>
                  </Box>
                )
              })}
            </Box>
            <Text fontWeight='normal' color='black' fontSize={fontSize.s}>
              {defaultPrice ?? pricesAsSalary}
            </Text>
          </Box>
        </Box>
      </Box>
    </Touchable>
  )
}

export const OldAnuncioItem: FC<{ data: OldMappedAnuncio }> = ({ data }) => {
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
    navigation.jumpTo('SearchTab', {
      screen: 'AnuncioDetailsModal',
      params: { data: { id: data.id } },
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
            <Text
              fontWeight='bold'
              fontSize={fontSize.m}
              color={'primary'}
              style={{ color: '#1a1a1a' }}
            >
              {rendered}
            </Text>
            <Text
              variant='secondary'
              marginTop='xs'
              marginBottom='s'
              fontSize={fontSize.s}
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
                    style={{ backgroundColor: '#C01034' }}
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
