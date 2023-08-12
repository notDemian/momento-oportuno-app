import React, { useMemo } from 'react'
import { Carousel, Section, Card } from '@src/components/elements'
import { Dimensions } from 'react-native'
import { mockRecommendedByState, type RemarkablePlace } from '@src/data'
import { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types'
import { PlaceCardInfo } from '@src/components'
import { RecommendedByStateProps } from './RecommendedByState.type'
import { RecommendedCardInfo } from '@src/components/RecommendedCardInfo'

export const RecommendedByState: React.FC<RecommendedByStateProps> = ({
  navigation,
  state,
}) => {
  const data = useMemo(() => {
    switch (state) {
      case 'Campeche':
        return [...mockRecommendedByState].splice(0, 4)
      case 'Quintana Roo':
        return [...mockRecommendedByState].splice(4, 4)
      case 'Yucatán':
        return [...mockRecommendedByState].splice(8, 4)

      default:
        return [...mockRecommendedByState].splice(0, 4)
    }
  }, [state])

  const renderItem = (props: CarouselRenderItemInfo<RemarkablePlace>) => {
    const { image, title, id } = props.item
    return (
      <Card
        key={id}
        coverImage={image}
        coverImageSize='l'
        title={title}
        marginLeft='m'
        titleProps={{
          numberOfLines: 1,
        }}
        subTitleProps={{
          numberOfLines: 2,
        }}
        onPress={onPlaceItemPress}
      >
        <RecommendedCardInfo data={props.item} />
      </Card>
    )
  }

  const onButtonActionPress = () => {
    navigation.navigate('PlaceList', { title: state })
  }

  const onPlaceItemPress = () => {
    navigation.navigate('PlaceDetails')
  }

  return (
    <Section
      title={`Recomendados ${state}`}
      actionButtonText='Ver más'
      onButtonActionPress={onButtonActionPress}
    >
      <Carousel
        numItemsPerSlide={1.4}
        data={data}
        width={Dimensions.get('window').width}
        renderItem={renderItem}
        height={250}
      />
    </Section>
  )
}
