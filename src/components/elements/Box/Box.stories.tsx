import { Meta, StoryObj } from '@storybook/react-native';
import { Box } from './Box';
import { BoxProps } from '@shopify/restyle';
import { Theme } from '@src/theme';
import { Text } from '../Text';

export default {
  title: 'Box',
  component: Box,
  args: {
    width: 150,
    height: 150,
  },
} as Meta<BoxProps<Theme>>;

type Story = StoryObj<BoxProps<Theme>>;

export const Basic: Story = {
  args: {
    backgroundColor: 'primary',
  },
};

export const Flex: Story = {
  render: (args) => (
    <>
      <Box
        {...args}
        flexDirection="row"
        width="100%"
        backgroundColor="primary"
        justifyContent="center"
        alignItems="center">
        <Box
          flex={1}
          justifyContent="center"
          alignItems="center"
          height={150}
          backgroundColor="info">
          <Text>Box 1</Text>
        </Box>
        <Box
          flex={1}
          justifyContent="center"
          alignItems="center"
          height={150}
          backgroundColor="success">
          <Text>Box 2</Text>
        </Box>
      </Box>

      <Box
        {...args}
        width="100%"
        backgroundColor="primary"
        justifyContent="center"
        alignItems="center"
        marginTop="m">
        <Box
          flex={1}
          justifyContent="center"
          alignItems="center"
          width="100%"
          backgroundColor="info">
          <Text>Box 3</Text>
        </Box>
        <Box
          flex={1}
          justifyContent="center"
          alignItems="center"
          width="100%"
          backgroundColor="success">
          <Text>Box 4</Text>
        </Box>
        <Box
          flex={1}
          justifyContent="center"
          alignItems="center"
          width="100%"
          backgroundColor="danger">
          <Text>Box 5</Text>
        </Box>
      </Box>
    </>
  ),
};
