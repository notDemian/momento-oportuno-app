import { type FC, useState } from 'react'
import { Animated, KeyboardAvoidingView, Platform } from 'react-native'
import { useWindowDimensions } from 'react-native'
import RenderHtml from 'react-native-render-html'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import styles from './AnuncioDetails.style'
import { AnuncioProps } from './AnuncioDetails.type'
import { BottomButtons } from './BottomButtons'
import { HeadingInformation } from './HeadingInformation'
import { UserInfo } from './UserInfo'

import {
  Box,
  ContentLoader,
  LoadingPageModal,
  RefreshControl,
  Text,
} from '@src/components'
import { useAnuncioByid } from '@src/hooks'
import { useAppTheme } from '@src/theme'
import { IMAGE_URL_FALLBACK } from '@src/utils'

export const AnuncioDetails: FC<AnuncioProps> = ({
  route: { params },
  navigation: nav,
}) => {
  const { data, isLoading, refetch } = useAnuncioByid(params.data.id)

  const [loadingImage, setLoadingImage] = useState(true)

  const scrollY = new Animated.Value(0)
  const { colors } = useAppTheme()
  const { bottom } = useSafeAreaInsets()

  const { width } = useWindowDimensions()

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
                  source={{
                    uri:
                      data.data.media?.[0]?.original_url ?? IMAGE_URL_FALLBACK,
                  }}
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
              <HeadingInformation data={data.data} />
              {data.data.description && (
                <Box paddingHorizontal={'m'} backgroundColor={'card'}>
                  <Text variant={'subHeader'}>Descripción</Text>
                  <RenderHtml
                    contentWidth={width}
                    source={{ html: data.data.description }}
                  />
                </Box>
              )}
              <UserInfo user={data.data.user} />
              <BottomButtons link={data.data.url} id={data.data.id} />
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
              {data.data.title.length ?? 0 > 14 ? (
                data.data.title.slice(0, 14) + '...'
              ) : (
                <>{data.data.title}</>
              )}
            </Text>
          </Animated.View>
        </>
      )}
    </Box>
  )
}
