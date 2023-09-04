import { useEffect, useRef, useState } from 'react'
import { Animated, LayoutAnimation, Pressable,View } from 'react-native'
import { Icon } from '../Icon'

import type { AccordionItemProps } from './AccordionItem.type'
import { styles } from './AccordionItemStyle'

import { toggleAnimation } from '@src/animations'
import { useAppTheme } from '@src/theme'

const AccordionItem = ({
  customBody,
  customTitle,
  customIcon = undefined,
  containerStyle = {},
  animationDuration = 300,
  isOpen = false,
  onPress = undefined,
}: AccordionItemProps) => {
  const [showContent, setShowContent] = useState(isOpen)
  const animationController = useRef(new Animated.Value(isOpen ? 1 : 0)).current

  useEffect(() => {
    if (showContent && !isOpen) {
      toggleListItem()
    }
  }, [isOpen])
  const toggleListItem = () => {
    const config = {
      duration: animationDuration,
      toValue: showContent ? 0 : 1,
      useNativeDriver: true,
    }
    Animated.timing(animationController, config).start()
    LayoutAnimation.configureNext(toggleAnimation(animationDuration))
    if (onPress) onPress(!showContent)
    setShowContent(!showContent)
  }
  const arrowTransform = animationController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-90deg'],
  })
  const { colors } = useAppTheme()
  return (
    <View style={[styles.container, containerStyle]}>
      <Pressable onPress={() => toggleListItem()}>
        <View style={styles.titleContainer}>
          {customTitle()}
          <Animated.View style={{ transform: [{ rotateZ: arrowTransform }] }}>
            {!customIcon ? (
              <Icon
                name='arrow-left-circle-outline'
                type='MaterialCommunityIcons'
                size={30}
                color={colors.primary}
              />
            ) : (
              customIcon()
            )}
          </Animated.View>
        </View>
      </Pressable>
      {showContent && customBody()}
    </View>
  )
}
export default AccordionItem
