import React from 'react';
import { mockDishDetails, DishSection } from '@src/data';
import { Dimensions } from 'react-native';
import { Box, Carousel, DishItem, Section } from '@src/components';
import { CarouselRenderItemInfo } from 'react-native-reanimated-carousel/lib/typescript/types';

export const DishesAlsoOrdered = () => {
  const renderItem = (props: CarouselRenderItemInfo<DishSection>) => {
    const dishes = props.item.data[0];
    return <DishItem data={dishes} />;
  };

  return (
    <Section title="People also ordered">
      <Box justifyContent="center" backgroundColor="card">
        <Carousel
          data={mockDishDetails.sideDishes || []}
          width={Dimensions.get('window').width}
          height={155}
          numItemsPerSlide={1.2}
          snapEnabled
          renderItem={renderItem}
        />
      </Box>
    </Section>
  );
};
