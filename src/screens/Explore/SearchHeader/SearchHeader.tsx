import { Box, TextField } from '@src/components';
import React from 'react';

export const SearchHeader = () => {
  return (
    <Box backgroundColor="card" padding="s">
      <TextField
        backgroundColor="background"
        leftElement="search"
        borderWidth={0}
        inputProps={{
          placeholder: 'Find places, dishes, restaurants, etc.',
        }}
      />
    </Box>
  );
};
