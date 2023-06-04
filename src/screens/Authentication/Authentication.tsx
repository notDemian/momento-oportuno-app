import React from 'react';
import { AuthContext } from '@src/auth';
import { Box, Button, Image, Text } from '@src/components';
import { AuthStackParamList, ScreenProps } from '@src/navigation/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Authentication: React.FC<
  ScreenProps<AuthStackParamList, 'Authentication'>
> = ({ navigation }) => {
  const { signIn } = React.useContext(AuthContext);
  const { bottom } = useSafeAreaInsets();

  const onConnectWithPhoneNumberButtonPress = () => {
    navigation.navigate('AuthenticationWithPhone');
  };
  const onSocialNetworkConnectButtonPress = () => {
    signIn();
  };

  return (
    <Box
      flex={1}
      flexDirection="column"
      justifyContent="space-between"
      backgroundColor="primary">
      <Box flex={1} alignItems="center" justifyContent="center">
        <Image
          source={require('@src/assets/app/app_icon.png')}
          width="55%"
          height="55%"
        />
      </Box>
      <Box
        height={340}
        padding="l"
        borderTopLeftRadius="xxl"
        borderTopRightRadius="xxl"
        backgroundColor="card"
        style={{
          paddingBottom: bottom !== 0 ? bottom : undefined,
        }}>
        <Text fontWeight="bold" variant="header">
          Get food you want.
        </Text>
        <Text marginTop="xs" variant="secondary">
          Satisfy your cravings by getting the food you love from your favourite
          restaurants delivered to you fast. Delivery & takeout from the best
          local restaurants.
        </Text>
        <Box marginTop="l">
          <Button
            label="Connect with Phone Number"
            isFullWidth
            onPress={onConnectWithPhoneNumberButtonPress}
          />
          <Button
            label="Connect with Facebook"
            isFullWidth
            variant="facebook"
            marginTop="s"
            backgroundColor="facebook"
            onPress={onSocialNetworkConnectButtonPress}
          />
          <Button
            label="Connect with Google"
            variant="google"
            marginTop="s"
            isFullWidth
            onPress={onSocialNetworkConnectButtonPress}
          />
        </Box>
      </Box>
    </Box>
  );
};
