import { Meta, StoryObj } from '@storybook/react-native';
import { BlurViewProps } from './BlurView.type';
import { BlurView } from './BlurView';
import { Box } from '../Box';
import { Image } from '../Image';

export default {
  title: 'BlurView',
  component: BlurView,
  decorators: [
    (Story: React.FC) => (
      <Box
        backgroundColor="primary"
        width="100%"
        height={300}
        justifyContent="center"
        alignItems="center">
        <Image
          width={250}
          height={250}
          position="absolute"
          source={require('../../../assets/app/app_icon.png')}
        />
        <Story />
      </Box>
    ),
  ],
  args: {
    tin: 'small',
    intensity: 20,
    width: '100%',
    height: '100%',
  },
  argTypes: {
    tint: {
      control: {
        type: 'select',
      },
      options: ['light', 'dark'],
    },
  },
} as Meta<BlurViewProps>;

type Story = StoryObj<BlurViewProps>;

export const LightTint: Story = {
  args: {
    tint: 'light',
  },
};

export const DarkTint: Story = {
  args: {
    tint: 'dark',
  },
};

export const BlurIntensity: Story = {
  args: {
    intensity: 80,
  },
};
