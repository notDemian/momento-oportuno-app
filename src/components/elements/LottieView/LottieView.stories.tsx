import { Meta, StoryObj } from '@storybook/react-native';
import { LottieViewProps } from './LottieView.type';
import { LottieView } from './LottieView';
import { Box } from '../Box';

export default {
  title: 'LottieView',
  component: LottieView,
  decorators: [
    (Story: React.FC) => (
      <Box
        width="100%"
        height={300}
        justifyContent="center"
        alignItems="center">
        <Story />
      </Box>
    ),
  ],
  args: {
    source: require('@src/assets/animations/email-sent.json'),
    autoPlay: true,
    width: 300,
    height: 300,
    loop: false,
    renderMode: 'AUTOMATIC',
    resizeMode: 'contain',
    speed: 1,
  },
  argTypes: {
    source: {
      type: 'function',
    },
    renderMode: {
      control: {
        type: 'select',
      },
      options: ['AUTOMATIC', 'HARDWARE', 'SOFTWARE'],
    },
    resizeMode: {
      control: {
        type: 'select',
      },
      options: ['cover', 'contain', 'center'],
    },
  },
} as Meta<LottieViewProps>;

type Story = StoryObj<LottieViewProps>;

export const Basic: Story = {
  args: {},
};

export const Loop: Story = {
  args: {
    loop: true,
  },
};

export const RenderMode: Story = {
  args: {
    renderMode: 'HARDWARE',
  },
};

export const Speed: Story = {
  args: {
    loop: true,
    speed: 10,
  },
};
