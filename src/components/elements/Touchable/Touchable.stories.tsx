import { Meta, StoryObj } from '@storybook/react-native';
import { Touchable } from './Touchable';
import { TouchableProps } from './Touchable.type';
import { Card } from '../Card';
import { Text } from '../Text';

export default {
  title: 'Touchable',
  component: Touchable,
  args: {
    onPress: () => console.log('Touchable Pressed'),
  },
} as Meta<TouchableProps>;

type Story = StoryObj<TouchableProps>;

export const Basic: Story = {
  args: {},
  render: (props) => (
    <Touchable {...props}>
      <Card title="Touchable Card" subTitle="This is a touchable card">
        <Text>Some Text</Text>
      </Card>
    </Touchable>
  ),
};
