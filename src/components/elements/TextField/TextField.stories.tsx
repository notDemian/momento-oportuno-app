import { Meta, StoryObj } from '@storybook/react-native';
import { TextField } from './TextField';
import { TextFieldProps } from './TextField.type';

export default {
  title: 'TextField',
  component: TextField,

  args: {
    inputProps: {
      placeholder: 'Please enter text',
    },
  },
} as Meta<TextFieldProps>;

type Story = StoryObj<TextFieldProps>;

export const Basic: Story = {
  args: {},
};

export const WithLeftIcon: Story = {
  args: {
    leftIcon: 'search',
    inputProps: {
      placeholder: 'Search',
    },
  },
};
