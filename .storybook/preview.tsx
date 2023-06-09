import React from 'react';
import { Box, StorybookDecorator } from "@src/components";
import { AppThemeProvider } from "@src/theme/AppThemeProvider";


export const decorators = [
  (Story) => {
    return (
      <AppThemeProvider>
        <StorybookDecorator>
          <Story />
        </StorybookDecorator>
      </AppThemeProvider>
    )
  },
];
