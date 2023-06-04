import React from 'react';
import { Animated } from 'react-native';
import {
  Box,
  Text,
  Button,
  BottomSheetModal,
  LottieView,
} from '@src/components';
import styles from './SuccessOrderModal.style';
import { CartContext } from '@src/cart';
import { useExploreStackNavigation } from '@src/hooks';

type OrderSuccessModalProps = {
  isVisible: boolean;
  setIsVisble: (value: React.SetStateAction<boolean>) => void;
};

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  isVisible,
  setIsVisble,
}) => {
  const navigation = useExploreStackNavigation();
  const fadeIn = React.useRef(new Animated.Value(0)).current;
  const fadeOut = React.useRef(new Animated.Value(1)).current;
  const [isAnimationFinished, setIsAnimationFinished] = React.useState(false);
  React.useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: isAnimationFinished ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
    Animated.timing(fadeOut, {
      toValue: isAnimationFinished ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isAnimationFinished, fadeIn, fadeOut]);
  const { clearCart } = React.useContext(CartContext);

  const onAnimationFinish = () => {
    setIsAnimationFinished(true);
  };

  const onBackdropPress = () => {
    setIsVisble(false);
    setIsAnimationFinished(false);
  };

  const onOrderSomethingElseButtonPress = () => {
    clearCart();
    setIsVisble(false);
    navigation.navigate('Explore');
  };

  const onTrackOrderButtonPress = () => {
    clearCart();
    setIsVisble(false);
    navigation.replace('TrackOrder');
  };

  return (
    <BottomSheetModal
      isOpened={isVisible}
      snapPoints={['50%']}
      onClose={onBackdropPress}>
      <Box flex={1} justifyContent="center" alignItems="center">
        <Box width="100%" alignItems="center">
          <LottieView
            source={require('@src/assets/animations/order-success.json')}
            autoPlay
            loop={false}
            onAnimationFinish={onAnimationFinish}
            height={120}
          />
          {!isAnimationFinished && (
            <Animated.View
              style={[styles.processingOrderContainer, { opacity: fadeOut }]}>
              <Text fontWeight="bold">Processing Your Order...</Text>
            </Animated.View>
          )}
          <Animated.View
            style={[styles.successMessageContainer, { opacity: fadeIn }]}>
            <Text variant="header" fontWeight="bold" color="primary">
              Thank you for your order.
            </Text>
            <Text textAlign="center" marginTop="s">
              You can track the delivery in the "Orders" section.
            </Text>
          </Animated.View>
        </Box>
        <Animated.View
          style={[styles.footerButtonContainer, { opacity: fadeIn }]}>
          <Button
            label="Track My Order"
            isFullWidth
            onPress={onTrackOrderButtonPress}
          />
          <Button
            label="Order Something Else"
            isFullWidth
            variant="transparent"
            marginTop="s"
            onPress={onOrderSomethingElseButtonPress}
          />
        </Animated.View>
      </Box>
    </BottomSheetModal>
  );
};
