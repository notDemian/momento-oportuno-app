import { FC, useCallback } from 'react'

import { AnuncioProps } from './AnuncioItem.type'

import { Box, Icon, Image, Text, Touchable } from '@src/components'
import { useSearchStackNavigation } from '@src/hooks'
import { fontSize } from '@src/theme'
import { getImageUrl, getPriceOrSalary } from '@src/utils'

export const AnuncioItem: FC<AnuncioProps> = (props) => {
  let extraData = <></>
  if (!('isFav' in props)) {
    const { attributes, category, state } = props.data

    const price = getPriceOrSalary({
      attributes,
      formatted: true,
    })
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
            marginTop='xs'
            marginBottom='s'
            fontSize={fontSize.s}
            color={'secondary'}
            numberOfLines={3}
            fontWeight={'bold'}
          >
            {price}
          </Text>
        ) : null}
      </>
    )
  }

  const { title, is_featured } = props.data

  const image = getImageUrl({
    str: props.data.thumbnail,
    media: props.data.media?.[0],
  })

  const navigation = useSearchStackNavigation()

  const onPlaceItemPress = () => {
    if ('isMyAds' in props) {
      if (props.data.status !== 'published') return
      return navigation.jumpTo('SearchTab', {
        screen: 'AnuncioDetailsModal',
        params: { data: { id: props.data.id } },
        initial: false,
      })
    }
    if ('isFav' in props) {
      navigation.jumpTo('SearchTab', {
        screen: 'AnuncioDetailsModal',
        params: { data: { id: props.data.id } },
        initial: false,
      })
      return
    }
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
        borderWidth={is_featured ? 1 : 0}
        elevation={3}
        borderColor={is_featured ? 'secondary' : 'white'}
        borderRadius='m'
        margin='s'
      >
        {is_featured ? (
          <Icon
            name='badge'
            type='SimpleLineIcons'
            position={'absolute'}
            top={5}
            right={5}
          />
        ) : null}
        <Image
          width={120}
          height={120}
          borderRadius='m'
          marginRight='m'
          source={image}
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

  return (
    <Touchable onPress={onPlaceItemPress} activeOpacity={0.5}>
      {renderContent()}
    </Touchable>
  )
}
