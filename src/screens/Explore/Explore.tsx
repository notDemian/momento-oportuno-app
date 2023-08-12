import React from 'react'
import { ScrollView } from 'react-native'
import { useSafeAreaScrollViewStyles } from '@src/hooks'
import { SearchHeader } from './SearchHeader'
import { PopularCategories } from './PopularCategories/PopularCategories'
import { PopularPlaces } from './PopularPlaces'
import { MerchantCampaigns } from './MerchantCampaigns'
import { RecommendedPlaces } from './RecommendedPlaces'
import { HotDeals } from './HotDeals'
import { Divider, Image } from '@src/components'
import { HighlightTabs } from './HighlightTabs'
import { ExploreProps } from './Explore.type'
import { useScrollToTop } from '@react-navigation/native'
import { Images } from '@src/assets'
import { StepsFor } from './StepsFor'
import { RecommendedByState } from './RecommendedByState'

export const Explore: React.FC<ExploreProps> = ({ navigation }) => {
  const ref = React.useRef(null)
  useScrollToTop(ref)
  const styles = useSafeAreaScrollViewStyles(false)

  return (
    <ScrollView ref={ref} contentContainerStyle={styles.contentContainer}>
      <Image source={Images.main_logo} height={200} />
      <SearchHeader />
      <PopularCategories navigation={navigation} />
      <PopularPlaces navigation={navigation} />
      <Image source={Images.opcionesPasos} height={200} />
      {/* <StepsFor /> */}
      <RecommendedByState navigation={navigation} state='Campeche' />
      <RecommendedByState navigation={navigation} state='Quintana Roo' />
      <RecommendedByState navigation={navigation} state='Yucatán' />
    </ScrollView>
  )
}
