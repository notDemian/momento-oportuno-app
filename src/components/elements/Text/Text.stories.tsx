import { Meta, StoryObj } from '@storybook/react-native';
import { Text } from './Text';
import { TextProps } from '@shopify/restyle';
import { Theme } from '@src/theme';

export default {
  title: 'Text',
  component: Text,
  args: {
    children: 'This is a text',
  },
} as Meta<TextProps<Theme>>;

type Story = StoryObj<TextProps<Theme>>;

export const Basic: Story = {
  args: {},
};

export const Header: Story = {
  args: {
    variant: 'header',
  },
};

export const LargeHeader: Story = {
  args: {
    variant: 'largeHeader',
  },
};

export const SubHeader: Story = {
  args: {
    variant: 'subHeader',
  },
};

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
};
