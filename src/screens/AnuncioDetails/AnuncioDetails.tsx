import { type FC, useState } from 'react'
import { Animated, KeyboardAvoidingView, Platform } from 'react-native'
import { useWindowDimensions } from 'react-native'
import RenderHtml from 'react-native-render-html'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import styles from './AnuncioDetails.style'
import { AnuncioProps } from './AnuncioDetails.type'
import { HeadingInformation } from './HeadingInformation'

import {
  Box,
  ContentLoader,
  LoadingPageModal,
  RefreshControl,
  Text,
} from '@src/components'
import { useAnuncio } from '@src/hooks'
import { useAppTheme } from '@src/theme'

export const AnuncioDetails: FC<AnuncioProps> = ({
  route: { params },
  navigation: _nav,
}) => {
  const { data, isLoading, refetch } = useAnuncio(params.data.id)

  const [loadingImage, setLoadingImage] = useState(true)

  const scrollY = new Animated.Value(0)
  const { colors } = useAppTheme()
  const { bottom } = useSafeAreaInsets()

  // TODO: IMPLEMENT addToCart

  const coverTranslateY = scrollY.interpolate({
    inputRange: [-4, 0, 10],
    outputRange: [-2, 0, 3],
  })

  const coverScale = scrollY.interpolate({
    inputRange: [-200, 0],
    outputRange: [2, 1],
    extrapolateRight: 'clamp',
  })

  const headerOpacity = scrollY.interpolate({
    inputRange: [150, 250],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  })

  const { width } = useWindowDimensions()

  return (
    <Box
      flex={1}
      style={{
        paddingBottom: bottom,
      }}
    >
      {!data ? (
        <LoadingPageModal loading={isLoading} />
      ) : (
        <>
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === 'ios' ? 'position' : 'height'}
            enabled
          >
            <Animated.ScrollView
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: {
                        y: scrollY,
                      },
                    },
                  },
                ],
                {
                  useNativeDriver: true,
                },
              )}
              refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={refetch} />
              }
            >
              <Animated.View
                style={[
                  styles.coverPhotoContainer,
                  {
                    transform: [
                      {
                        translateY: coverTranslateY,
                      },
                    ],
                  },
                ]}
              >
                <Animated.Image
                  source={{ uri: data.defaultImages[0] }}
                  style={[
                    styles.coverPhoto,
                    {
                      transform: [
                        {
                          scale: coverScale,
                        },
                      ],
                    },
                    {
                      opacity: loadingImage ? 0 : 1,
                    },
                  ]}
                  onLoadStart={() => {
                    setLoadingImage(true)
                  }}
                  onLoadEnd={async () => {
                    setLoadingImage(false)
                  }}
                />
                {loadingImage && (
                  <ContentLoader
                    style={{
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    }}
                  />
                )}
              </Animated.View>
              <HeadingInformation data={data} />
              <Box paddingHorizontal={'m'} backgroundColor={'card'}>
                <RenderHtml
                  contentWidth={width}
                  source={{ html: data.content.rendered }}
                />
              </Box>
            </Animated.ScrollView>
          </KeyboardAvoidingView>

          <Animated.View
            style={[
              styles.header,
              {
                opacity: headerOpacity,
                backgroundColor: colors.card,
              },
            ]}
          >
            <Text variant='subHeader' numberOfLines={1} paddingHorizontal='l'>
              {data.title.rendered.length ?? 0 > 14 ? (
                data.title.rendered.slice(0, 14) + '...'
              ) : (
                <>{data.title.rendered}</>
              )}
            </Text>
          </Animated.View>
        </>
      )}
    </Box>
  )
}
