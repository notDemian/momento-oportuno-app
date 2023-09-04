import React, { useCallback, useMemo } from 'react'
import { Dimensions } from 'react-native'
import { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types'

import { RecommendedByStateProps } from './RecommendedByState.type'

import { Card,Carousel, Section } from '@src/components/elements'
import { RecommendedCardInfo } from '@src/components/RecommendedCardInfo'
import { mockRecommendedByState, type RemarkablePlace } from '@src/data'

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

  const renderItem = useCallback(
    (props: CarouselRenderItemInfo<RemarkablePlace>) => {
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
    },
    [],
  )

  const onButtonActionPress = useCallback(() => {
    // navigation.navigate('PlaceList', { title: state })
  }, [state])

  const onPlaceItemPress = useCallback(() => {
    // navigation.navigate('PlaceDetails')
  }, [])

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
