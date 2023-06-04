import { ForgotPasswordProps } from '../ForgotPassword.type';

export type EmailSentModalProps = {
  isVisible: boolean;
  setIsVisble: (value: React.SetStateAction<boolean>) => void;
  navigation: ForgotPasswordProps['navigation'];
};
