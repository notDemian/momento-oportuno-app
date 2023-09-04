import { useRef } from 'react'
import { ScrollView } from 'react-native'

import { PopularCategories } from './PopularCategories/PopularCategories'
import { ExploreProps } from './Explore.type'
import { PopularPlaces } from './PopularPlaces'
import { RecommendedByState } from './RecommendedByState'
import { SearchHeader } from './SearchHeader'

import { useScrollToTop } from '@react-navigation/native'
import { Images } from '@src/assets'
import { Image } from '@src/components'
import { useSafeAreaScrollViewStyles } from '@src/hooks'

export const Explore: React.FC<ExploreProps> = ({ navigation }) => {
  const ref = useRef(null)
  useScrollToTop(ref)
  const styles = useSafeAreaScrollViewStyles(false)

  return (
    <ScrollView ref={ref} contentContainerStyle={styles.contentContainer}>
      <Image source={Images.main_logo} height={200} />
      <SearchHeader />
      <PopularCategories />
      <PopularPlaces />
      <Image source={Images.opcionesPasos} height={200} />
      <RecommendedByState navigation={navigation} state='Campeche' />
      <RecommendedByState navigation={navigation} state='Quintana Roo' />
      <RecommendedByState navigation={navigation} state='Yucatán' />
    </ScrollView>
  )
}
