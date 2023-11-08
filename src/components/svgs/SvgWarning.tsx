import { memo } from 'react'
import Svg, { Path, type SvgProps } from 'react-native-svg'

import { palette } from '@src/theme'

type Props = SvgProps

function SvgComponent(props: Props) {
  return (
    <Svg width={20} height={20} viewBox='0 0 20 20' fill='none' {...props}>
      <Path
        d='M9.918 0a2.661 2.661 0 00-1.881.793L.762 8.187a2.68 2.68 0 00.031 3.776l7.394 7.274a2.68 2.68 0 003.776-.03l7.275-7.394a2.682 2.682 0 00-.031-3.777L11.812.762A2.662 2.662 0 009.918 0zm.012 1.42c.316-.003.633.118.88.361l7.395 7.274c.494.487.5 1.261.014 1.756l-7.275 7.394a1.23 1.23 0 01-1.755.014l-7.394-7.275a1.23 1.23 0 01-.014-1.755l7.274-7.394c.244-.247.56-.372.875-.375zm.059 3.33a.715.715 0 00-.704.723v5.717a.715.715 0 101.43 0V5.473a.715.715 0 00-.726-.724zm.01 8.584A.953.953 0 1010 15.239a.953.953 0 000-1.905z'
        fill={palette.rojoMomento}
      />
    </Svg>
  )
}

export default memo(SvgComponent)
