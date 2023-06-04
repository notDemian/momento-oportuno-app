import React from 'react';
import { Alert } from 'react-native';
import { TextField, Button } from '@src/components/elements';
import { AuthenticationLayout } from '@src/components';
import { ForgotPasswordProps } from './ForgotPassword.type';
import { EmailSentModal } from './EmailSentModal';

export const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  navigation,
}) => {
  const [email, setEmail] = React.useState('');
  const [sentEmailModalVisible, setSentEmailModalVisible] =
    React.useState(false);

  const onPasswordFieldChange = (value: string) => {
    setEmail(value);
  };

  const onConfirmButtonPress = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email!');
      return;
    }
    setSentEmailModalVisible(true);
  };

  return (
    <AuthenticationLayout
      title="Forgot your password?"
      subtitle="Please enter your email address and we'll send you a link to reset your password"
      footer={
        <Button isFullWidth label="Confirm" onPress={onConfirmButtonPress} />
      }>
      <TextField
        inputProps={{
          autoFocus: true,
          value: email,
          onChangeText: onPasswordFieldChange,
          placeholder: 'Enter your email',
          keyboardType: 'email-address',
        }}
      />
      <EmailSentModal
        isVisible={sentEmailModalVisible}
        setIsVisble={setSentEmailModalVisible}
        navigation={navigation}
      />
    </AuthenticationLayout>
  );
};
