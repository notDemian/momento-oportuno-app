import { useRef } from 'react'
import { ScrollView } from 'react-native'

import { PopularCategories } from './PopularCategories/PopularCategories'
import { ExploreProps } from './Explore.type'
import { PopularPlaces } from './PopularPlaces'
import { RecommendedByState } from './RecommendedByState'
import { SearchHeader } from './SearchHeader'

import { useScrollToTop } from '@react-navigation/native'
import { Images } from '@src/assets'
import { Box, Image, Text } from '@src/components'
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
      <Image source={Images.main_logo} height={'5%'} contentFit='scale-down' />
      <SearchHeader />
      {/**FIXME: */}
      <Text>CAMBIO PROBANDO WORKFLOW, NO VOY A HACER NADA, CAMBIO 2</Text>
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
      <Box height={100} />
    </ScrollView>
  )
}
