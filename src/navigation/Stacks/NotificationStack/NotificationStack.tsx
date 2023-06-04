import React from 'react';
import { Alert, AlertButton } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  NotificationScreenProps,
  NotificationStackParamList,
} from '@src/navigation/types';
import { Icon } from '@src/components';
import { Notification } from '@src/screens';

const Stack = createNativeStackNavigator<NotificationStackParamList>();

export const NotificationStack: React.FC<NotificationScreenProps> = () => {
  const alertButtons: AlertButton[] = [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    { text: 'OK' },
  ];

  const renderAddAddressHeaderRight = () => {
    return (
      <Icon
        name="trash"
        isPrimary
        onPress={() =>
          Alert.alert(
            'Delete all',
            'Once you delete all messages, you cannot undo it',
            alertButtons,
          )
        }
      />
    );
  };

  return (
    <Stack.Navigator initialRouteName="Notification">
      <Stack.Screen
        options={() => {
          return {
            title: 'Notifications',
            headerRight: renderAddAddressHeaderRight,
          };
        }}
        name="Notification"
        component={Notification}
      />
    </Stack.Navigator>
  );
};
