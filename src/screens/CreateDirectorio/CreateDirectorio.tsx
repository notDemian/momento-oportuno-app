import type { FC } from 'react'

import { Box, Text } from '@src/components'
import { DirectorioStackParamList, ScreenProps } from '@src/navigation'

type CreateDirectorioScreenProps = ScreenProps<
  DirectorioStackParamList,
  'CreateDirectorio'
>
export const CreateDirectorioScreen: FC<CreateDirectorioScreenProps> = ({
  navigation: _,
}) => {
  return (
    <Box>
      <Text>CreateDirectorioScreen</Text>
    </Box>
  )
}
