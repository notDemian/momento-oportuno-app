import { Box, Text } from '@src/components'
import { ExploreStackParamList, ScreenProps } from '@src/navigation'

export {}

type MicrositiosProps = ScreenProps<ExploreStackParamList, 'MicroSitios'>

export const Micrositios: React.FC<MicrositiosProps> = ({ navigation }) => {
  return (
    <Box>
      <Text>Micrositios</Text>
    </Box>
  )
}
