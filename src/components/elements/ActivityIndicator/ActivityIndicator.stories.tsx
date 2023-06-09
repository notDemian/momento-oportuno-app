import { Meta, StoryObj } from '@storybook/react-native';
import { ActivityIndicator } from './ActivityIndicator';
import { ActivityIndicatorProps } from './ActivityIndicator.type';

export default {
  title: 'ActivityIndicator',
  component: ActivityIndicator,
  args: {
    size: 'small',
    color: 'red',
  },
  argTypes: {
    size: {
      control: {
        type: 'select',
      },
      options: ['small', 'large'],
    },
  },
} as Meta<ActivityIndicatorProps>;

type Story = StoryObj<ActivityIndicatorProps>;

export const Basic: Story = {
  args: {
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    size: 'large',
  },
};

export const CustomColor: Story = {
  args: {
    size: 'large',
    color: 'green',
  },
};
