import { Meta, StoryObj } from '@storybook/react-native';
import { RadioButtonProps, RadioOption } from './RadioButton.type';
import { RadioButton } from './RadioButton';
import { Text } from '../Text';

const data: RadioOption[] = [
  {
    label: 'Option 1',
    value: 'option1',
    rightElement: <Text>$10,00</Text>,
  },
  {
    label: 'Option 2',
    value: 'option2',
    rightElement: <Text>$20,00</Text>,
  },
  {
    label: 'Option 3',
    value: 'option3',
    rightElement: <Text>$30,00</Text>,
  },
];

export default {
  title: 'RadioButton',
  component: RadioButton,
  args: {
    data,
    label: 'My Radio Button',
    containerProps: {
      width: '100%',
      height: '100%',
    },
    onItemPress(option) {
      console.log(option);
    },
  },
} as Meta<RadioButtonProps>;

type Story = StoryObj<RadioButtonProps>;

export const Basic: Story = {
  args: {},
};
