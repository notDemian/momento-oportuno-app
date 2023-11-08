import { Box, Icon, Image,ListRowItem, Text } from '@src/components'
import { driver } from '@src/data/mock-driver'

const { id, name, avatar, ratings, averageRating } = driver

export const DriverInformation = () => {
  return (
    <ListRowItem
      id={id}
      title={name}
      note="Your driver"
      subTitle="Delivery time 14:04 PM"
      leftElement={<Image source={avatar} width={60} height={60} />}
      rightElement={
        <Box>
          <Box flexDirection="row" alignItems="center" marginBottom="xs">
            <Icon name="star" isPrimary marginRight="xs" />
            <Text color="primary">{averageRating}</Text>
          </Box>
          <Text variant="secondary">{ratings} ratings</Text>
        </Box>
      }
      rightContainerProps={{
        flex: 5,
      }}
    />
  )
}
