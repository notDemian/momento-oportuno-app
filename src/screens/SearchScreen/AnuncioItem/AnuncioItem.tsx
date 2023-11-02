import { FC, useCallback } from 'react'

import { AnuncioProps } from './AnuncioItem.type'

import { Box, Image, Text, Touchable } from '@src/components'
import { useSearchStackNavigation } from '@src/hooks'
import { fontSize } from '@src/theme'
import { Constants, IMAGE_URL_FALLBACK } from '@src/utils'

export const AnuncioItem: FC<AnuncioProps> = (props) => {
  let extraData = <></>
  if (!('isFav' in props)) {
    const { attributes, category, state } = props.data

    const price = attributes
      .find((a) => a.id === Constants.IDS.price)
      ?.value.toString()

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
          {/**FIXME: this should give me the actual subcategory */}
          {category.children.slice(0, 1).map((cat) => {
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
        {price ? (
          <Text
            variant='secondary'
            marginTop='xs'
            marginBottom='s'
            fontSize={fontSize.s}
            numberOfLines={3}
          >
            {price}
          </Text>
        ) : null}
      </>
    )
  }

  const { title, is_featured } = props.data
  const image = props.data.media?.[0]?.original_url
  const navigation = useSearchStackNavigation()

  const onPlaceItemPress = () => {
    if ('isFav' in props) return
    navigation.navigate('AnuncioDetailsModal', {
      data: {
        id: props.data.id,
      },
    })
  }

  const renderContent = useCallback(
    () => (
      <Box
        flexDirection='row'
        padding='s'
        backgroundColor='card'
        borderWidth={is_featured ? 3 : 1}
        elevation={3}
        borderColor={is_featured ? 'secondary' : 'white'}
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
          </Box>
        </Box>
      </Box>
    ),
    [extraData, image, is_featured, title],
  )

  return !('isFav' in props) ? (
    <Touchable onPress={onPlaceItemPress} activeOpacity={0.5}>
      {renderContent()}
    </Touchable>
  ) : (
    <>{renderContent()}</>
  )
}
