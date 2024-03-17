import React from 'react'
import { Dimensions } from 'react-native'
import { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types'

import { State } from '@src/api'
import { Images } from '@src/assets'
import { Box, Card, Carousel, ContentLoader, Section } from '@src/components'
import { useAppDispatch, useExploreStackNavigation } from '@src/hooks'
import { setState } from '@src/redux'

const images = [
  Images.places.qroo,
  Images.places.campeche,
  Images.places.yucatan,
]

const FILTERED_STATES = {
  'Quintana Roo': 'Quintana Roo',
  Campeche: 'Campeche',
  Yucatan: 'Yucatan',
}

const getImage = (name: string) => {
  switch (name) {
    case FILTERED_STATES['Quintana Roo']:
      return images[0]
    case FILTERED_STATES.Campeche:
      return images[1]
    case FILTERED_STATES.Yucatan:
      return images[2]
    default:
      return images[0]
  }
}

export const PopularPlaces: React.FC<{
  estados: State[] | null | undefined
}> = ({ estados }) => {
  const dispatch = useAppDispatch()
  const renderItem = (props: CarouselRenderItemInfo<State>) => {
    const { id, name } = props.item

    return (
      <Card
        key={id}
        coverImage={getImage(name)}
        coverImageSize='m'
        title={name}
        titleProps={{
          color: 'white',
        }}
        marginLeft='m'
        onPress={onPlaceItemPress(id)}
        shouldFillCoverImage
      />
    )
  }

  const nav = useExploreStackNavigation()

  const onPlaceItemPress = (state: number) => () => {
    dispatch(setState(state))
    nav.navigate('SearchTab', { screen: 'Search' })
  }

  const onDirectory = () => {
    nav.navigate('DirectorioTab', { screen: 'Directorio' })
  }

  return (
    <Section
      title='Lugares'
      actionButtonText='Ir a Directorio'
      onButtonActionPress={onDirectory}
    >
      {estados ? (
        <Carousel
          width={Dimensions.get('window').width}
          height={300}
          numItemsPerSlide={2.6}
          data={estados.filter((_, i) =>
            Object.values(FILTERED_STATES).includes(estados[i]?.name as any),
          )}
          snapEnabled
          renderItem={renderItem}
        />
      ) : (
        <Carousel
          width={Dimensions.get('window').width}
          height={300}
          numItemsPerSlide={2.6}
          data={new Array(4).fill(null)}
          snapEnabled
          renderItem={() => {
            return (
              <Box p={'10%'}>
                <ContentLoader />
              </Box>
            )
          }}
        />
      )}
    </Section>
  )
}
