import { useRef } from 'react'
import { ScrollView } from 'react-native'

import HowItWorks from './HowItWorks/HowItWorks'
import { PopularCategories } from './PopularCategories/PopularCategories'
import AboutUs from './AboutUs'
import { ExploreProps } from './Explore.type'
import { PopularPlaces } from './PopularPlaces'
import { RecommendedByState } from './RecommendedByState'
import { SearchHeader } from './SearchHeader'

import { useScrollToTop } from '@react-navigation/native'
import { Images } from '@src/assets'
import { Box, Image } from '@src/components'
import { useEstados, useSafeAreaScrollViewStyles } from '@src/hooks'

export const Explore: React.FC<ExploreProps> = ({ navigation }) => {
  const ref = useRef(null)
  useScrollToTop(ref)

  const styles = useSafeAreaScrollViewStyles(false)
  const { data, isLoading } = useEstados()

  return (
    <ScrollView
      ref={ref}
      contentContainerStyle={styles.contentContainer}
      stickyHeaderIndices={[1]}
    >
      <Image source={Images.main_logo} height={'2%'} contentFit='scale-down' />
      <SearchHeader />
      <Image
        source={Images.mainLogoCat}
        height={250}
        contentFit='cover'
        contentPosition={'left center'}
      />
      <PopularCategories />
      <PopularPlaces estados={data?.data} />
      <Image source={Images.opcionesPasos} height={200} />
      {isLoading || !data
        ? null
        : data.data.map((estado) => (
            <RecommendedByState
              key={estado.id}
              navigation={navigation}
              state={estado}
            />
          ))}
      <HowItWorks />
      <AboutUs />
      <Box height={300} />
    </ScrollView>
  )
}
