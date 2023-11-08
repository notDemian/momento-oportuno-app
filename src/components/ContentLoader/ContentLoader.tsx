import { useEffect, useMemo, useRef } from 'react'
import {
  Animated,
  Platform,
  type StyleProp,
  useWindowDimensions,
  View,
} from 'react-native'

import styles from './ContentLoader.style'

import { Opacity, useAppTheme } from '@src/theme'
import { LinearGradient } from 'expo-linear-gradient'

interface Props {
  style?: StyleProp<any>
}

const Index = ({ style }: Props) => {
  const { width } = useWindowDimensions()
  const { colors } = useAppTheme()
  const beginShimmerPosition = useRef(new Animated.Value(-1)).current

  const shimmerColors = [
    colors.border + Opacity['25'],
    colors.border + Opacity['50'],
    colors.border,
  ]
  const location = [0.3, 0.5, 0.7]
  const linearTranslate = beginShimmerPosition.interpolate({
    inputRange: [-1, 1],
    outputRange: [0, width],
  })
  const animatedValue = useMemo(() => {
    return Animated.loop(
      Animated.timing(beginShimmerPosition, {
        toValue: 1,
        delay: 0,
        duration: 1000,
        useNativeDriver: Platform.OS !== 'web',
      }),
    )
  }, [beginShimmerPosition])

  useEffect(() => {
    animatedValue.start()
    return () => {
      animatedValue.stop()
    }
  }, [animatedValue])

  return (
    <View style={[styles.container, style]}>
      <View style={{ flex: 1, backgroundColor: shimmerColors[0] }}>
        <Animated.View
          style={{ flex: 1, transform: [{ translateX: linearTranslate }] }}
        >
          <LinearGradient
            colors={shimmerColors}
            style={{ flex: 1, width: width }}
            start={{
              x: -1,
              y: 0.5,
            }}
            end={{
              x: 2,
              y: 0.5,
            }}
            locations={location}
          />
        </Animated.View>
      </View>
    </View>
  )
}

export default Index
