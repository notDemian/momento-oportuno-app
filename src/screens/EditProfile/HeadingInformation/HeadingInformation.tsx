import React from 'react'

import styles from './HeadingInformation.style'
import { HeadingInformationProps } from './HeadingInformation.type'

import { Box,Image, Text } from '@src/components'

export const HeadingInformation: React.FC<HeadingInformationProps> = ({
  profile,
}) => {
  return (
    <Box>
      <Image
        source={profile.coverPhoto}
        width="100%"
        resizeMode="cover"
        height={150}
      />
      <Box
        justifyContent="center"
        alignItems="center"
        style={styles.informationContainer}>
        <Image source={profile.avatar} width={80} height={80} />
        <Box justifyContent="center" alignItems="center" paddingVertical="m">
          <Text variant="subHeader" marginTop="xs">
            {profile.name}
          </Text>
          <Text marginTop="xs">73 Points | Gold Member</Text>
        </Box>
      </Box>
    </Box>
  )
}
