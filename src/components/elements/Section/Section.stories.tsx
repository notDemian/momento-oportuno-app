import { Box } from '../Box'
import { Text } from '../Text'

import { Section } from './Section'
import { SectionProps } from './Section.type'

import { Meta, StoryObj } from '@storybook/react-native'

export default {
  title: 'Section',
  component: Section,
  args: {
    title: 'Section Title',
    actionButtonText: 'Action',
    hasDivider: true,
  },
  decorators: [
    (Story: React.FC) => (
      <Box backgroundColor="card" padding="m" borderRadius="m">
        <Story />
      </Box>
    ),
  ],
} as Meta<SectionProps>

type Story = StoryObj<SectionProps>;

export const Basic: Story = {
  args: {},
  render: (props) => {
    return (
      <>
        <Section {...props} hasDivider={false}>
          <Box paddingHorizontal="m">
            <Text>This is the description</Text>
          </Box>
        </Section>
        <Section {...props}>
          <Box paddingHorizontal="m">
            <Text>This is the description</Text>
          </Box>
        </Section>
      </>
    )
  },
}
