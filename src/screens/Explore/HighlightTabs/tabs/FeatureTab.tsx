import { Box, PlaceListItem } from '@src/components'
import { mockRemarkablePlace,Place } from '@src/data'

export const FeaturedTab = () => {
  return (
    <Box backgroundColor='card' paddingTop='none'>
      {mockRemarkablePlace.featured.map((item: Place) => {
        return <PlaceListItem key={item.id} data={item} />
      })}
    </Box>
  )
}
