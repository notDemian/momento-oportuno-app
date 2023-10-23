import { FC, useCallback } from 'react'

import { AnuncioProps } from './AnuncioItem.type'

import { Box, Image, Text, Touchable } from '@src/components'
import { useSearchStackNavigation } from '@src/hooks'
import { fontSize } from '@src/theme'
import { IMAGE_URL_FALLBACK } from '@src/utils'

export const AnuncioItem: FC<AnuncioProps> = (props) => {
  let extraData = <></>
  if (!('isFav' in props)) {
    const { attributes, category, state } = props.data
    extraData = (
      <>
        <Text
          variant='secondary'
          marginTop='xs'
          marginBottom='s'
          fontSize={fontSize.s}
          numberOfLines={3}
        >
          {state.name}
        </Text>
        <Box flexDirection={'row'} gap={'s'}>
          <Text fontWeight='bold' color='black' fontSize={fontSize.s}>
            {category.name}
          </Text>
          {category.children.map((cat) => {
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
      </>
    )
  }

  const { image, title, is_featured } = props.data
  const navigation = useSearchStackNavigation()

  const onPlaceItemPress = () => {
    if ('isFav' in props) return
    navigation.navigate('AnuncioDetailsModal', {
      data: {
        id: props.data.id,
      },
    })
  }

  const Content = useCallback(
    () => (
      <Box
        flexDirection='row'
        padding='s'
        backgroundColor='card'
        borderWidth={is_featured ? 3 : 1}
        elevation={3}
        borderColor={is_featured ? 'secondary' : 'card'}
        borderRadius='m'
        margin='s'
      >
        <Image
          width={120}
          height={120}
          borderRadius='m'
          marginRight='m'
          source={image ?? IMAGE_URL_FALLBACK}
        />

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
            {extraData}
            <Text fontWeight='normal' color='black' fontSize={fontSize.s}>
              {/* {attributes?.price ?? attributes?.salary} */}$ price
            </Text>
          </Box>
        </Box>
      </Box>
    ),
    [
      extraData,
      image,
      is_featured,
      title,
      // attributes?.price,
      // attributes?.salary,
    ],
  )

  return 'isFav' in props ? (
    <Touchable onPress={onPlaceItemPress} activeOpacity={0.5}>
      <Content />
    </Touchable>
  ) : (
    <Content />
  )
}
