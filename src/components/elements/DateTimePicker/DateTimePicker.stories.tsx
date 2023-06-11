import { Meta, StoryObj } from '@storybook/react-native';
import { DateTimePickerProps } from './DateTimePicker.type';
import { DateTimePicker } from './DateTimePicker';
import React from 'react';
import { Box } from '../Box';
import { Button } from '../Button';
import { isIos } from '@src/utils';

export default {
  title: 'DateTimePicker',
  component: DateTimePicker,
  args: {
    value: new Date(),
    mode: 'date',
    display: 'default',
  },
  argTypes: {
    mode: {
      control: {
        type: 'select',
      },
      options: ['date', 'time'],
    },
    display: {
      control: {
        type: 'select',
      },
      options: ['default', 'spinner'],
    },
  },
} as Meta<DateTimePickerProps>;

type Story = StoryObj<DateTimePickerProps>;

const DateTimePickerComponent: React.FC<DateTimePickerProps> = (props) => {
  const [visible, setVisible] = React.useState(false);

  const onChange = (e) => {
    console.log(e.nativeEvent.timestamp);
    setVisible(false);
  };

  if (isIos) {
    return <DateTimePicker {...props} onChange={onChange} />;
  }

  return (
    <Box>
      <Button
        label="Toggle DateTimePicker"
        onPress={() => setVisible(!visible)}
      />
      {visible && <DateTimePicker {...props} onChange={onChange} />}
    </Box>
  );
};

export const Basic: Story = {
  args: {},
  render: (props) => <DateTimePickerComponent {...props} />,
};

export const DateMode: Story = {
  args: {
    mode: 'date',
  },
  render: (props) => <DateTimePickerComponent {...props} />,
};

export const TimeMode: Story = {
  args: {
    mode: 'time',
  },
  render: (props) => <DateTimePickerComponent {...props} />,
};

export const SpinnerDisplay: Story = {
  args: {
    display: 'spinner',
  },
  render: (props) => <DateTimePickerComponent {...props} />,
};
