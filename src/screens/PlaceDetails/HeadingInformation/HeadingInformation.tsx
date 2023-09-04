import React from 'react'

import styles from './HeadingInformation.style'
import { HeadingInformationProps } from './HeadingInformation.type'

import { Box, Card, Icon,Text } from '@src/components'
import { PlaceCardInfo } from '@src/components'
import { fontSize } from '@src/theme'

export const HeadingInformation: React.FC<HeadingInformationProps> = ({
  data,
}) => {
  const { title, subTitle } = data
  return (
    <Card
      backgroundColor="card"
      coverImageSize="s"
      title={title}
      subTitle={subTitle}
      titleProps={{
        marginBottom: 'xs',
      }}
      marginHorizontal="m"
      style={styles.headingContainer}>
      <PlaceCardInfo data={data} />
      <Box flexDirection="row" marginTop="m">
        <Text variant="secondary" marginRight="m">
          Opening Hours
        </Text>
        <Text variant="secondary" color="text">
          09:30 AM - 10:00 PM
        </Text>
      </Box>
      <Box flexDirection="row" marginTop="s">
        <Text variant="secondary" marginRight="m">
          Coupon Codes
        </Text>
        <Box>
          <Box
            flexDirection="row"
            alignItems="center"
            marginRight="s"
            marginBottom="s">
            <Icon
              name="pricetag"
              size={fontSize.s}
              marginRight="xs"
              isPrimary
            />
            <Text color="primary" variant="secondary">
              35% off for Cheese Burger
            </Text>
          </Box>
          <Box flexDirection="row" alignItems="center" marginRight="s">
            <Icon
              name="pricetag"
              size={fontSize.s}
              marginRight="xs"
              isPrimary
            />
            <Text color="primary" variant="secondary">
              5% off for all items
            </Text>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}
