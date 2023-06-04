import React from 'react';
import { Alert } from 'react-native';
import {
  AuthenticationLayout,
  BottomSheetModal,
  Box,
  Button,
  Text,
  TextField,
} from '@src/components';
import { fontSize } from '@src/theme';
import { AuthenticationWithPhoneProps } from './AuthenticationWithPhone.type';

export const AuthenticationWithPhone: React.FC<
  AuthenticationWithPhoneProps
> = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [isModalOpened, setIsModalOpened] = React.useState(false);

  const onPhoneNumberFieldChange = (value: string) => {
    setPhoneNumber(value);
  };

  const hideModal = () => {
    setIsModalOpened(false);
  };

  const onNextButtonPress = () => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter your phone number!');
      return;
    }
    setIsModalOpened(true);
  };

  const onConfirmButtonPress = () => {
    navigation.navigate('AuthenticationCodeVerification');
    hideModal();
  };

  return (
    <Box flex={1}>
      <AuthenticationLayout
        title="Enter your phone number"
        subtitle="Please enter your phone number to use our services"
        footer={
          <Button isFullWidth label="Next" onPress={onNextButtonPress} />
        }>
        <TextField
          inputProps={{
            value: phoneNumber,
            onChangeText: onPhoneNumberFieldChange,
            placeholder: 'Enter your phone number',
            keyboardType: 'phone-pad',
            autoFocus: true,
          }}
        />
      </AuthenticationLayout>
      <BottomSheetModal
        isOpened={isModalOpened}
        snapPoints={['40%']}
        onClose={hideModal}>
        <Box flex={1} alignItems="center" justifyContent="center">
          <Text textAlign="center" variant="header">
            Login with phone number
          </Text>
          <Text
            variant="primary"
            textAlign="center"
            fontWeight="bold"
            fontSize={fontSize.l}
            marginVertical="m">
            {phoneNumber}
          </Text>
          <Text textAlign="center">
            We will send the authentication code to the phone number you
            entered.
          </Text>
          <Text textAlign="center" marginTop="s">
            Do you want to continue?
          </Text>
          <Button
            marginTop="m"
            isFullWidth
            onPress={onConfirmButtonPress}
            label="Confirm"
          />
          <Button
            isFullWidth
            variant="transparent"
            onPress={hideModal}
            label="Cancel"
          />
        </Box>
      </BottomSheetModal>
    </Box>
  );
};
