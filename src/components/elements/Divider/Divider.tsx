import { Box } from '../Box'

import { BoxProps } from '@shopify/restyle'
import { Theme } from '@src/theme'

export const Divider: React.FC<BoxProps<Theme>> = (props) => {
  return <Box height={1} backgroundColor="border" {...props} />
}
