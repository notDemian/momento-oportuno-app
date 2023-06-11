import { SectionListProps } from 'react-native';
import { Meta, StoryObj } from '@storybook/react-native';
import { SectionList } from './SectionList';
import { mockPlaceDetails } from '@src/data';
import { BlurView, DishItem, Text } from '@src/components';
import { isIos } from '@src/utils';

export default {
  title: 'SectionList',
  component: SectionList,
  args: {
    sections: mockPlaceDetails.dishSection,
    stickySectionHeadersEnabled: true,
  },
} as Meta<SectionListProps<any>>;

type Story = StoryObj<SectionListProps<any>>;

export const Basic: Story = {
  args: {
    renderItem: ({ item }) => {
      return <DishItem data={item} />;
    },
    renderSectionHeader: ({ section }) => (
      <BlurView intensity={isIos ? 80 : 120}>
        <Text variant="subHeader" textAlign="left" padding="m">
          {section.title}
        </Text>
      </BlurView>
    ),
  },
};
