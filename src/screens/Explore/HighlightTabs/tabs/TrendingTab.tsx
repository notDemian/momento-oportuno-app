import { Box, PlaceListItem } from '@src/components'
import { mockRemarkablePlace,Place } from '@src/data'

export const TrendingTab = () => {
  return (
    <Box backgroundColor='card' padding='s' paddingTop='none'>
      {mockRemarkablePlace.trending.map((item: Place) => {
        return <PlaceListItem key={item.id} data={item} />
      })}
    </Box>
  )
}
