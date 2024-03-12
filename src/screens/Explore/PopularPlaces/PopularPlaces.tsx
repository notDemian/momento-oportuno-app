import React from 'react'
import { Dimensions } from 'react-native'
import { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types'

import { State } from '@src/api'
import { Box, Card, Carousel, ContentLoader, Section } from '@src/components'
import { useAppDispatch, useExploreStackNavigation } from '@src/hooks'
import { setState } from '@src/redux'

const images = [
  'https://clicdelsureste.empresarialti.com/wp-content/uploads/assets/portada_qroo.jpeg',
  'https://clicdelsureste.empresarialti.com/wp-content/uploads/assets/portada_campeche.jpeg',
  'https://clicdelsureste.empresarialti.com/wp-content/uploads/assets/portada_yucatan.jpeg',
]

const getImage = (name: string) => {
  switch (name) {
    case 'Quintana Roo':
      return images[0]
    case 'Campeche':
      return images[1]
    case 'Yucatan':
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
          color: 'primary',
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
          data={estados}
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
