import { Box, Text } from '@src/components'
import { ExploreStackParamList, ScreenProps } from '@src/navigation'

export {}

type MicrositiosProps = ScreenProps<ExploreStackParamList, 'MicroSitios'>

export const Micrositios: React.FC<MicrositiosProps> = () => {
  return (
    <Box flex={1} justifyContent={'center'} alignItems={'center'}>
      <Text>Micrositios</Text>
    </Box>
  )
}
