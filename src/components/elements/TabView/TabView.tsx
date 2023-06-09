import React from 'react';
import { Dimensions } from 'react-native';
import { TabView as RNTabView, TabBar, SceneMap } from 'react-native-tab-view';
import { useStyles } from './TabView.style';
import { Cenes, TabViewProps } from './TabView.type';
import { Icon } from '../Icon';
import { useAppTheme } from '@src/theme';

export const TabView: React.FC<TabViewProps> = ({
  tabData,
  onTabIndexChange,
  isFullWidth,
  tabBarStyle,
}) => {
  const {
    colors: { card, primary, text },
  } = useAppTheme();
  const [navigationStateIndex, setNavigationStateIndex] = React.useState(0);
  const styles = useStyles();

  const renderIcon = (props: any) => {
    const { route } = props;
    if (route.icon) {
      return <Icon name={route.icon} size={20} color="white" />;
    }
    return null;
  };

  const onIndexChange = (index: number) => {
    setNavigationStateIndex(index);
    if (onTabIndexChange) {
      onTabIndexChange(index);
    }
  };

  const tabViewRoutes = tabData.map((item) => {
    return {
      key: item.key,
      title: item.title,
      icon: item.icon,
    };
  });

  const navigationState = {
    index: navigationStateIndex,
    routes: tabViewRoutes,
  };

  const scenes: Cenes = {};
  tabData.forEach((item) => {
    scenes[item.key] = item.content;
  });

  return (
    <RNTabView
      navigationState={navigationState}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          renderIcon={renderIcon}
          style={[{ backgroundColor: card }, tabBarStyle]}
          labelStyle={styles.tabBarLabel}
          activeColor={primary}
          inactiveColor={text}
          tabStyle={[
            styles.tabBar,
            {
              width: isFullWidth
                ? Dimensions.get('window').width / tabData.length
                : undefined,
            },
          ]}
          indicatorStyle={{
            backgroundColor: primary,
          }}
          scrollEnabled={true}
        />
      )}
      renderScene={SceneMap(scenes)}
      onIndexChange={onIndexChange}
      initialLayout={{ width: Dimensions.get('window').width, height: 0 }}
    />
  );
};
