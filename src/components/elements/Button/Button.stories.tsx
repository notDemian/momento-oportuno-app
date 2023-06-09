import { Meta, StoryObj } from '@storybook/react-native';
import { Button } from './Button';
import { ButtonProps } from './Button.type';
import { Icon } from '../Icon';
import { Text } from '../Text';
import { Box } from '../Box';

export default {
  title: 'Button',
  component: Button,
  args: {
    label: 'Button',
    isFullWidth: true,
    buttonSize: 'm',
    variant: 'primary',
    onPress: () => console.log('Button pressed'),
  },
  argTypes: {
    buttonSize: {
      control: {
        type: 'select',
      },
      options: ['s', 'm', 'l'],
    },
    variant: {
      control: {
        type: 'select',
      },
      options: [
        'primary',
        'danger',
        'warning',
        'success',
        'info',
        'outline',
        'transparent',
        'facebook',
        'google',
      ],
    },
  },
} as Meta<ButtonProps>;

type Story = StoryObj<ButtonProps>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    label: 'Primary',
  },
};

export const Danger: Story = {
  args: {
    variant: 'danger',
    label: 'Danger',
  },
};

export const Warning: Story = {
  args: {
    variant: 'warning',
    label: 'Warning',
  },
};

export const Success: Story = {
  args: {
    variant: 'success',
    label: 'Success',
  },
};

export const Info: Story = {
  args: {
    variant: 'info',
    label: 'Info',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    label: 'Outline',
  },
};

export const Transparent: Story = {
  args: {
    variant: 'transparent',
    label: 'Transparent',
  },
};

export const Facebook: Story = {
  args: {
    variant: 'facebook',
    label: 'Facebook',
  },
};

export const Google: Story = {
  args: {
    variant: 'google',
    label: 'Google',
  },
};

export const WithCustomChildren: Story = {
  args: {
    variant: 'primary',
    children: (
      <Box flexDirection="row" justifyContent="center" alignItems="center">
        <Icon name="logo-react" color="white" size={22} marginRight="s" />
        <Text color="white">Custom Text With Icon</Text>
      </Box>
    ),
  },
};
