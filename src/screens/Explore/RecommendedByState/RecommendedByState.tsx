import React, { useCallback, useMemo } from 'react'
import { Dimensions } from 'react-native'
import { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types'

import { RecommendedByStateProps } from './RecommendedByState.type'

import { Ad } from '@src/api'
import { ContentLoader, SvgEmptyBox } from '@src/components'
import { Box, Card, Carousel, Section, Text } from '@src/components/elements'
import { RecommendedCardInfo } from '@src/components/RecommendedCardInfo'
import {
  useAnuncios,
  useAppDispatch,
  useExploreStackNavigation,
} from '@src/hooks'
import { setState } from '@src/redux'
import { getShadowBoxProps } from '@src/theme'
import { getImageUrl } from '@src/utils'

export const RecommendedByState: React.FC<RecommendedByStateProps> = ({
  state,
}) => {
  const nav = useExploreStackNavigation()
  const renderItem = useCallback((props: CarouselRenderItemInfo<Ad>) => {
    const { id, thumbnail, media } = props.item

    return (
      <Card
        key={id}
        coverImage={getImageUrl({ str: thumbnail, media: media?.[0] })}
        coverImageSize='m'
        title={props.item.title}
        marginLeft='m'
        titleProps={{
          numberOfLines: 1,
        }}
        onPress={() => {
          nav.jumpTo('SearchTab', {
            screen: 'AnuncioDetailsModal',
            params: { id },
            initial: false,
          })
        }}
        backgroundColor={'white'}
      >
        <RecommendedCardInfo data={props.item} />
      </Card>
    )
  }, [])

  const dispatch = useAppDispatch()

  const onButtonActionPress = useCallback(() => {
    dispatch(setState(state.id))
    nav.navigate('SearchTab', { screen: 'Search' })
  }, [state])

  const { data: anuncios, isLoading } = useAnuncios({ state: state.id })

  const flattenData = useMemo(
    () => anuncios?.pages.flatMap((page) => page.data),
    [anuncios],
  )

  return (
    <Section
      title={
        <Text>
          Recomendados <Text color={'orangy'}>{state.name}</Text>
        </Text>
      }
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
      ) : flattenData.length > 0 ? (
        <Carousel
          numItemsPerSlide={1.4}
          data={flattenData}
          width={Dimensions.get('window').width}
          renderItem={renderItem}
          height={250}
        />
      ) : (
        <Box
          {...getShadowBoxProps()}
          margin={'s'}
          padding={'m'}
          justifyContent='center'
          alignItems='center'
        >
          <Text>No hay recomendaciones para {state.name} en este momento</Text>
          <SvgEmptyBox />
        </Box>
      )}
    </Section>
  )
}
