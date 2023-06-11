import { Meta, StoryObj } from '@storybook/react-native';
import { TabSectionList, TabSectionListProps } from './TabSectionList';
import { mockPlaceDetails } from '@src/data';
import { Box, DishItem, Text } from '@src/components';

export default {
  title: 'TabSectionList',
  component: TabSectionList,
  args: {
    sections: mockPlaceDetails.dishSection,
    stickySectionHeadersEnabled: false,
    tabBarStyle: {
      width: '100%',
      position: 'absolute',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    contentContainerStyle: {
      paddingTop: 50,
    },
  },
} as Meta<TabSectionListProps>;

type Story = StoryObj<TabSectionListProps>;

export const Basic: Story = {
  args: {
    renderTab: ({ title, isActive }) => {
      const borderBottomWidth = isActive ? 2 : 0;
      return (
        <Box borderBottomWidth={borderBottomWidth} borderColor="primary">
          <Text
            color={isActive ? 'primary' : 'text'}
            padding="m"
            fontWeight="500">
            {title}
          </Text>
        </Box>
      );
    },
    renderItem: ({ item }) => {
      return <DishItem data={item} />;
    },
  },
};
