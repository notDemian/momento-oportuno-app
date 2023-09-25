import { Box, Text } from '@src/components'
import { MicrositiosStackParamList, ScreenProps } from '@src/navigation'

type MicrositiosProps = ScreenProps<MicrositiosStackParamList, 'Micrositios'>

export const Micrositios: React.FC<MicrositiosProps> = () => {
  return (
    <Box flex={1} justifyContent={'center'} alignItems={'center'}>
      <Text>Micrositios</Text>
    </Box>
  )
}
