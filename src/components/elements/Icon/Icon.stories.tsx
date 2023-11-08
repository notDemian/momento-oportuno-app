import { Icon } from './Icon'
import { IconProps } from './Icon.type'

import { Meta, StoryObj } from '@storybook/react-native'

export default {
  title: 'Icon',
  component: Icon,
  args: {
    name: 'logo-react',
    isPrimary: false,
    size: 64,
  },
} as Meta<IconProps>

type Story = StoryObj<IconProps>;

export const Basic: Story = {}

export const Primary: Story = {
  args: {
    isPrimary: true,
  },
}

export const CustomSize: Story = {
  args: {
    size: 128,
  },
}
