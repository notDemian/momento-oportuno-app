import React, { useCallback, useMemo } from 'react'
import { Dimensions } from 'react-native'
import { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types'

import { RecommendedByStateProps } from './RecommendedByState.type'

import { ContentLoader } from '@src/components'
import { Card, Carousel, Section } from '@src/components/elements'
import { RecommendedCardInfo } from '@src/components/RecommendedCardInfo'
import { useAnunciosByState, useSearchStackNavigation } from '@src/hooks'
import { MappedAnuncio } from '@src/utils'

export const RecommendedByState: React.FC<RecommendedByStateProps> = ({
  state,
}) => {
  const nav = useSearchStackNavigation()
  const renderItem = useCallback(
    (props: CarouselRenderItemInfo<MappedAnuncio>) => {
      const { id, defaultImages } = props.item

      return (
        <Card
          key={id}
          coverImage={defaultImages[0]}
          coverImageSize='l'
          title={props.item.title}
          marginLeft='m'
          titleProps={{
            numberOfLines: 1,
          }}
          subTitleProps={{
            numberOfLines: 2,
          }}
          onPress={() => {
            nav.jumpTo('SearchTab', {
              screen: 'AnuncioDetailsModal',
              params: { data: { id } },
            })
          }}
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

  const { data: anuncios, isLoading } = useAnunciosByState({ state: state.id })

  const flattenData = useMemo(
    () => anuncios?.pages.flatMap((page) => page.data),
    [anuncios],
  )

  return (
    <Section
      title={`Recomendados ${state.name}`}
      actionButtonText='Ver más'
      onButtonActionPress={onButtonActionPress}
    >
      {isLoading || !flattenData ? (
        <Carousel
          numItemsPerSlide={1.4}
          data={new Array(10).fill(null)}
          width={Dimensions.get('window').width}
          renderItem={() => <ContentLoader />}
          height={250}
        />
      ) : (
        <Carousel
          numItemsPerSlide={1.4}
          data={flattenData}
          width={Dimensions.get('window').width}
          renderItem={renderItem}
          height={250}
        />
      )}
    </Section>
  )
}
