import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaScrollViewStyles } from '@src/hooks';
import { SearchHeader } from './SearchHeader';
import { PopularCategories } from './PopularCategories/PopularCategories';
import { PopularPlaces } from './PopularPlaces';
import { MerchantCampaigns } from './MerchantCampaigns';
import { RecommendedPlaces } from './RecommendedPlaces';
import { HotDeals } from './HotDeals';
import { Divider } from '@src/components';
import { HighlightTabs } from './HighlightTabs';
import { ExploreProps } from './Explore.type';
import { useScrollToTop } from '@react-navigation/native';

export const Explore: React.FC<ExploreProps> = ({ navigation }) => {
  const ref = React.useRef(null);
  useScrollToTop(ref);
  const styles = useSafeAreaScrollViewStyles(false);

  return (
    <ScrollView
      ref={ref}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderHiddenOnScroll
      stickyHeaderIndices={[0]}>
      <SearchHeader />
      <PopularCategories navigation={navigation} />
      <PopularPlaces navigation={navigation} />
      <Divider backgroundColor="background" marginVertical="s" />
      <MerchantCampaigns />
      <RecommendedPlaces navigation={navigation} />
      <HotDeals navigation={navigation} />
      <Divider backgroundColor="background" marginVertical="s" />
      <HighlightTabs />
    </ScrollView>
  );
};
