import React from 'react';
import { CarouselProps } from './Carousel.type';
import ReanimatedCarousel from 'react-native-reanimated-carousel';

export const Carousel: React.FC<CarouselProps> = ({
  numItemsPerSlide,
  width = 0,
  ...rest
}) => {
  const carouselWidth = numItemsPerSlide ? width / numItemsPerSlide : width;

  return (
    <ReanimatedCarousel
      loop={false}
      width={carouselWidth}
      style={{
        width,
      }}
      panGestureHandlerProps={{
        activeOffsetX: [-10, 10],
      }}
      {...rest}
    />
  );
};
