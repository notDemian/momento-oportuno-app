import React from 'react'
import { Dimensions } from 'react-native'
import { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types'

import { RecommendedPlacesProps } from './RecommendedPlaces.type'

import { PlaceCardInfo } from '@src/components'
import { Card,Carousel, Section } from '@src/components/elements'
import { mockPlaces, Place } from '@src/data'

export const RecommendedPlaces: React.FC<RecommendedPlacesProps> = ({
  navigation,
}) => {
  const renderItem = (props: CarouselRenderItemInfo<Place>) => {
    const { image, title, subTitle } = props.item
    return (
      <Card
        key={props.index}
        coverImage={image}
        coverImageSize='s'
        title={title}
        subTitle={subTitle}
        marginLeft='m'
        titleProps={{
          numberOfLines: 1,
        }}
        subTitleProps={{
          numberOfLines: 2,
        }}
        onPress={onPlaceItemPress}
      >
        <PlaceCardInfo data={props.item} />
      </Card>
    )
  }

  const onButtonActionPress = () => {
    navigation.navigate('PlaceList', { title: 'Recommended' })
  }

  const onPlaceItemPress = () => {
    navigation.navigate('PlaceDetails')
  }

  return (
    <Section
      title='Recommended'
      actionButtonText='View more'
      onButtonActionPress={onButtonActionPress}
    >
      <Carousel
        numItemsPerSlide={1.8}
        data={mockPlaces}
        width={Dimensions.get('window').width}
        renderItem={renderItem}
        height={250}
      />
    </Section>
  )
}
