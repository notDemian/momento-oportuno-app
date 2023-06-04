import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
  ActivityHistoryScreenProps,
  ActivityHistoryStackParamList,
} from '@src/navigation/types';
import { ActivityHistory, ActivityHistoryDetail } from '@src/screens';

const Stack = createNativeStackNavigator<ActivityHistoryStackParamList>();

export const ActivityHistoryStack: React.FC<
  ActivityHistoryScreenProps
> = () => {
  return (
    <Stack.Navigator initialRouteName="ActivityHistory">
      <Stack.Screen
        options={() => {
          return {
            title: 'Activity History',
          };
        }}
        name="ActivityHistory"
        component={ActivityHistory}
      />
      <Stack.Screen
        options={() => {
          return {
            title: 'Details',
          };
        }}
        name="ActivityHistoryDetail"
        component={ActivityHistoryDetail}
      />
    </Stack.Navigator>
  );
};
