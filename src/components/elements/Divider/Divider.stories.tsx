import { Meta, StoryObj } from '@storybook/react-native';
import { Divider } from './Divider';
import { Theme } from '@src/theme';
import { BoxProps } from '@shopify/restyle';
import { mockPlaces } from '@src/data';
import { Card } from '../Card';
import React from 'react';

export default {
  title: 'Divider',
  component: Divider,
  args: {
    marginVertical: 's',
  },
} as Meta<BoxProps<Theme>>;

type Story = StoryObj<BoxProps<Theme>>;

export const Basic: Story = {
  render: (args) => (
    <>
      {mockPlaces.map((place, index) => (
        <React.Fragment key={index}>
          <Card
            title={place.title}
            subTitle={place.subTitle}
            subTitleProps={{
              numberOfLines: 2,
            }}
          />
          <Divider {...args} />
        </React.Fragment>
      ))}
    </>
  ),
};
