import React from 'react'
import { Animated, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  processingOrderContainer: {
    marginTop: 10,
  },
  successMessageContainer: {
    alignItems: 'center',
  },
  footerButtonContainer: {
    width: '100%',
    paddingVertical: 16,
  },
})

import { BottomSheetModal, Box, Button, LottieView, Text } from '../elements'

import {
  useAccountStackNavigation,
  useAppDispatch,
  useAppSelector,
} from '@src/hooks'
import { resetCart } from '@src/redux'
import { T } from '@src/utils'

type OrderSuccessModalProps = {
  isVisible: boolean
  setIsVisble: (value: React.SetStateAction<boolean>) => void
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isVisible,
  setIsVisble,
}) => {
  const navigation = useAccountStackNavigation()
  const fadeIn = React.useRef(new Animated.Value(0)).current
  const fadeOut = React.useRef(new Animated.Value(1)).current
  const [isAnimationFinished, setIsAnimationFinished] = React.useState(false)
  React.useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: isAnimationFinished ? 1 : 0,
      duration: 400,
      useNativeDriver: true,
    }).start()
    Animated.timing(fadeOut, {
      toValue: isAnimationFinished ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [isAnimationFinished, fadeIn, fadeOut])

  const orderId = useAppSelector((p) => p.cart.orderConfirmationId)
  const dispatch = useAppDispatch()

  const onAnimationFinish = () => {
    setIsAnimationFinished(true)
  }

  const onBackdropPress = () => {
    setIsVisble(false)
    setIsAnimationFinished(false)
    redirect()
  }

  const redirect = () => {
    if (!orderId) {
      T.error('No se pudo obtener el id de la orden')
      return navigation.navigate('Account')
    }

    //navigation.replace('PaymentConfirmation', { id: orderId })
    dispatch(resetCart())
    navigation.popToTop()
  }

  const onTrackOrderButtonPress = () => {
    setIsVisble(false)
    redirect()
  }

  return (
    <BottomSheetModal
      isOpened={isVisible}
      snapPoints={['50%']}
      onClose={onBackdropPress}
    >
      <Box flex={1} justifyContent='center' alignItems='center'>
        <Box width='100%' alignItems='center'>
          <LottieView
            source={require('@src/assets/animations/order-success.json')}
            autoPlay
            loop={false}
            onAnimationFinish={onAnimationFinish}
            height={120}
          />
          {!isAnimationFinished && (
            <Animated.View
              style={[styles.processingOrderContainer, { opacity: fadeOut }]}
            >
              <Text fontWeight='bold'>Procesando Órden</Text>
            </Animated.View>
          )}
          <Animated.View
            style={[styles.successMessageContainer, { opacity: fadeIn }]}
          >
            <Text variant='header' fontWeight='bold' color='primary'>
              Gracias por tu compra
            </Text>
            <Text textAlign='center' marginTop='s'>
              Tu orden ha sido procesada exitosamente
            </Text>
          </Animated.View>
        </Box>
        <Animated.View
          style={[styles.footerButtonContainer, { opacity: fadeIn }]}
        >
          <Button
            // label='Ver confirmación'
            label='Ir a inicio'
            isFullWidth
            onPress={onTrackOrderButtonPress}
          />
        </Animated.View>
      </Box>
    </BottomSheetModal>
  )
}
