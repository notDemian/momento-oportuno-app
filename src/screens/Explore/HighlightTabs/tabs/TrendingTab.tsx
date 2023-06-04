import React from 'react';
import { Place, mockRemarkablePlace } from '@src/data';
import { Box, PlaceListItem } from '@src/components';

export const TrendingTab = () => {
  return (
    <Box backgroundColor="card" padding="s" paddingTop="none">
      {mockRemarkablePlace.trending.map((item: Place) => {
        return <PlaceListItem key={item.id} data={item} />;
      })}
    </Box>
  );
};
