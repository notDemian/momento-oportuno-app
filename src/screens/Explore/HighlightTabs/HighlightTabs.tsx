import React from 'react';
import { FeaturedTab, NewTab, TrendingTab } from './tabs';
import { Box, TabView, TabViewData } from '@src/components';
import styles from './HighlightTabs.style';

const tabData: TabViewData = [
  { key: '0', title: 'Featured', content: FeaturedTab },
  {
    key: '1',
    title: 'Newest',
    content: NewTab,
  },
  {
    key: '3',
    title: 'Trending',
    content: TrendingTab,
  },
];

export const HighlightTabs = () => {
  return (
    <Box
      backgroundColor="card"
      borderTopRightRadius="xl"
      borderTopLeftRadius="xl"
      height={880}>
      <TabView tabData={tabData} tabBarStyle={styles.tabBarStyle} isFullWidth />
    </Box>
  );
};
