import React from 'react'
import { Carousel, Section, Card, PlaceCardInfo } from '@src/components'
import { Dimensions } from 'react-native'
import { mockPlaces, Place } from '@src/data'
import { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types'
import { useSearchStackNavigation } from '@src/hooks'

export const PopularDishes = () => {
  const navigation = useSearchStackNavigation()

  const onButtonActionPress = () => {
    navigation.navigate('ExploreTab', { screen: 'PlaceDetails' })
  }

  const onPlaceItemPress = (id: number) => () => {
    navigation.navigate('SearchTab', {
      screen: 'AnuncioDetailsModal',
      params: { data: { id } },
    })
  }

  const renderItem = (props: CarouselRenderItemInfo<Place>) => {
    const { image, title, subTitle } = props.item
    return (
      <Card
        key={props.index}
        coverImage={image}
        coverImageSize='m'
        title={title}
        subTitle={subTitle}
        marginLeft='m'
        titleProps={{
          numberOfLines: 1,
        }}
        subTitleProps={{
          numberOfLines: 2,
        }}
        onPress={onPlaceItemPress(+props.item.id)}
      >
        <PlaceCardInfo data={props.item} />
      </Card>
    )
  }

  return (
    <Section
      title="What's Popular Here"
      actionButtonText='View more'
      onButtonActionPress={onButtonActionPress}
    >
      <Carousel
        width={Dimensions.get('window').width}
        height={255}
        numItemsPerSlide={1.2}
        data={mockPlaces}
        snapEnabled
        renderItem={renderItem}
      />
    </Section>
  )
}
