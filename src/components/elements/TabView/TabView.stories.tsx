import { Meta, StoryObj } from '@storybook/react-native';
import { TabViewProps } from './TabView.type';
import { TabView } from './TabView';
import { Box } from '../Box';
import { Text } from '../Text';

const Tab1 = () => {
  return (
    <Text paddingVertical="l" textAlign="center">
      Tab 1
    </Text>
  );
};
const Tab2 = () => {
  return (
    <Text paddingVertical="l" textAlign="center">
      Tab 2
    </Text>
  );
};
const Tab3 = () => {
  return (
    <Text paddingVertical="l" textAlign="center">
      Tab 3
    </Text>
  );
};

export default {
  title: 'TabView',
  component: TabView,
  args: {
    tabData: [
      { key: '0', title: 'Tab 1', content: Tab1 },
      {
        key: '1',
        title: 'Tab 2',
        content: Tab2,
      },
      {
        key: '3',
        title: 'Tab 3',
        content: Tab3,
      },
    ],
  },
  decorators: [
    (Story: React.FC) => (
      <Box height={700}>
        <Story />
      </Box>
    ),
  ],
} as Meta<TabViewProps>;

type Story = StoryObj<TabViewProps>;

export const Basic: Story = {
  args: {},
};
