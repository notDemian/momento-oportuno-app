import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  AccountStack,
  ActivityHistoryStack,
  ExploreStack,
  NotificationStack,
} from '../Stacks';
import { Icon, IconProps } from '@src/components';
import { TabParamList } from '../types';
import { fontSize } from '@src/theme';
import styles from './TabNavigation.style';

type TabBarIconProps = {
  focused: boolean;
  color: string;
  size: number;
};
const Tab = createBottomTabNavigator<TabParamList>();
const { Navigator } = Tab;

const renderTabBarIcon = (routeName: keyof TabParamList) => {
  return (props: TabBarIconProps) => {
    const { color } = props;
    let iconName: IconProps['name'] = 'compass';
    switch (routeName) {
      case 'ExploreTab':
        iconName = 'compass';
        break;
      case 'ActivityHistoryTab':
        iconName = 'timer';
        break;
      case 'NotificationTab':
        iconName = 'notifications';
        break;
      case 'AccountTab':
        iconName = 'person-circle';
        break;
      case 'DocumentationTab':
        iconName = 'book';
        break;
      default:
        break;
    }
    return <Icon name={iconName} size={fontSize.xl} color={color} />;
  };
};

const TabNavigation = () => {
  return (
    <Navigator
      initialRouteName="ExploreTab"
      screenOptions={(props) => {
        const {
          route: { name: routeName },
        } = props;
        return {
          headerShown: false,
          tabBarIcon: renderTabBarIcon(routeName),
          tabBarItemStyle: styles.tabItem,
        };
      }}>
      <Tab.Screen
        name="ExploreTab"
        component={ExploreStack}
        options={{
          title: 'Explore',
        }}
      />
      <Tab.Screen
        name="ActivityHistoryTab"
        component={ActivityHistoryStack}
        options={{
          title: 'History',
        }}
      />
      <Tab.Screen
        name="NotificationTab"
        component={NotificationStack}
        options={{
          title: 'Notifications',
        }}
      />
      <Tab.Screen
        name="AccountTab"
        component={AccountStack}
        options={{
          title: 'Accounts',
        }}
      />
    </Navigator>
  );
};

export default TabNavigation;
