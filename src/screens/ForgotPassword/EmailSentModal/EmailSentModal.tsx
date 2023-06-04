import React from 'react';
import { EmailSentModalProps } from './EmailSentModal.type';
import {
  BottomSheetModal,
  Box,
  Button,
  LottieView,
  Text,
} from '@src/components';
import Animated, { FadeInUp } from 'react-native-reanimated';

export const EmailSentModal: React.FC<EmailSentModalProps> = ({
  isVisible,
  setIsVisble,
  navigation,
}) => {
  const [isAnimationFinished, setIsAnimationFinished] = React.useState(false);

  const onAnimationFinish = () => {
    setIsAnimationFinished(true);
  };

  const onBackToLoginButtonPress = () => {
    setIsVisble(false);
    navigation.pop(1);
  };

  const hideModal = () => {
    setIsVisble(false);
  };

  return (
    <BottomSheetModal
      isOpened={isVisible}
      snapPoints={['40%']}
      onClose={hideModal}>
      <Box backgroundColor="card" justifyContent="center" alignItems="center">
        <Box width="100%" alignItems="center">
          <LottieView
            source={require('@src/assets/animations/email-sent.json')}
            autoPlay
            duration={6000}
            loop={false}
            onAnimationFinish={onAnimationFinish}
            width="30%"
          />
          {!isAnimationFinished ? (
            <>
              <Animated.View entering={FadeInUp.duration(500)}>
                <Box marginTop="s">
                  <Text fontWeight="bold">Sending an email to you...</Text>
                </Box>
              </Animated.View>
            </>
          ) : (
            <>
              <Animated.View entering={FadeInUp}>
                <Box alignItems="center">
                  <Text variant="header" fontWeight="bold" color="primary">
                    Check in your email!
                  </Text>
                  <Text textAlign="center" marginTop="s">
                    We've just emailed you with the instructions to reset your
                    password.
                  </Text>
                </Box>
              </Animated.View>
              <Animated.View entering={FadeInUp}>
                <Box width="100%" padding="m">
                  <Button
                    variant="transparent"
                    label="Back to Login"
                    isFullWidth
                    onPress={onBackToLoginButtonPress}
                  />
                </Box>
              </Animated.View>
            </>
          )}
        </Box>
      </Box>
    </BottomSheetModal>
  );
};
