import { Meta, StoryObj } from '@storybook/react-native';
import { CarouselProps } from './Carousel.type';
import { Carousel } from './Carousel';
import { Dimensions } from 'react-native';
import { mockPlaces } from '@src/data';
import { Card } from '../Card';
import { PlaceCardInfo } from '@src/components';

export default {
  title: 'Carousel',
  component: Carousel,
  args: {
    width: Dimensions.get('window').width,
    height: 255,
    numItemsPerSlide: 1.2,
    data: mockPlaces,
    snapEnabled: true,
    pagingEnabled: true,
  },
} as Meta<CarouselProps>;

type Story = StoryObj<CarouselProps>;

const renderItem = (props) => {
  const { image, title, subTitle } = props.item;
  return (
    <Card
      key={props.index}
      coverImage={image}
      coverImageSize="m"
      title={title}
      subTitle={subTitle}
      marginRight="m"
      titleProps={{
        numberOfLines: 1,
      }}
      subTitleProps={{
        numberOfLines: 2,
      }}>
      <PlaceCardInfo data={props.item} />
    </Card>
  );
};

export const Basic: Story = {
  args: {
    snapEnabled: false,
    pagingEnabled: false,
    renderItem,
  },
};

export const PagingAndSnap: Story = {
  args: {
    renderItem,
  },
};

export const AutoPlay: Story = {
  args: {
    autoPlay: true,
    renderItem,
  },
};

export const Loop: Story = {
  args: {
    loop: true,
    renderItem,
  },
};

export const HorizontalStack: Story = {
  args: {
    loop: true,
    renderItem,
    numItemsPerSlide: 1,
    modeConfig: {
      showLength: 2,
    },
    mode: 'horizontal-stack',
  },
};

export const VerticalStack: Story = {
  args: {
    loop: true,
    renderItem,
    numItemsPerSlide: 1,
    modeConfig: {
      showLength: 2,
    },
    mode: 'vertical-stack',
  },
};
