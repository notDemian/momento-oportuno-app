import { Icon } from '../Icon'

import { CheckBox } from './CheckBox'
import { CheckBoxProps } from './CheckBox.type'

import { Meta, StoryObj } from '@storybook/react-native'

export default {
  title: 'CheckBox',
  component: CheckBox,
  args: {
    label: 'My CheckBox',
    onChange: () => console.log('checked'),
  },
} as Meta<CheckBoxProps>

type Story = StoryObj<CheckBoxProps>;

export const Basic: Story = {
  args: {},
}

export const WithRightElement: Story = {
  args: {
    rightElement: <Icon name="logo-react" isPrimary />,
  },
}
