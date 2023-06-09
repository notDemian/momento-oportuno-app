import React from 'react';
import { Box, Text } from '@src/components';
import { I18nManager } from 'react-native';
import StoryBook from '../../../.storybook';

export const Documentation = () => {
  return (
    <Box flex={1}>
      {I18nManager.isRTL && (
        <Text variant="header">
          Sorry, we haven't supported RTL layout for this page yet. Please
          disable RTL layout in the Settings screen and check again.
        </Text>
      )}
      <StoryBook />
    </Box>
  );
};
