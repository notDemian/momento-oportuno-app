import React from 'react';
import { Box, Icon, Text } from '../elements';
import { fontSize } from '@src/theme';

export const ExploreHeaderTitle = () => {
  return (
    <Box flexDirection="row" alignItems="center">
      <Icon name="location" size={fontSize.m} isPrimary />
      <Text marginLeft="s" fontWeight="bold">
        588 Blanda Square - Virginia
      </Text>
    </Box>
  );
};
