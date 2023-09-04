import { RatingView } from './RatingView'
import { RatingViewProps } from './RatingView.type'

import { Meta, StoryObj } from '@storybook/react-native'

export default {
  title: 'RatingView',
  component: RatingView,
  args: {
    value: 3,
    itemSize: 24,
    ratingStarBackgroundColor: 'black',
    readonly: false,
  },
} as Meta<RatingViewProps>

type Story = StoryObj<RatingViewProps>;

export const Basic: Story = {
  args: {},
}

export const ReadOnly: Story = {
  args: {
    readonly: true,
  },
}
