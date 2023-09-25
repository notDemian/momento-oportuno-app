import type { DirectorioMapped } from '@src/api/Directorio/Directorio.type'
import { Box } from '@src/components'
import { getShadowBoxProps } from '@src/theme'
import { CLOG } from '@src/utils'

export const DirectorioItem: React.FC<{
  data: DirectorioMapped
}> = ({ data }) => {
  const {} = data

  CLOG(data)
  return <Box {...getShadowBoxProps()}></Box>
}
