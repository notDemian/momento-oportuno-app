import { memo } from 'react'
import Svg, { Path, type SvgProps } from 'react-native-svg'

type Props = SvgProps

function SvgComponent(props: Props) {
  return (
    <Svg width={20} height={20} viewBox='0 0 20 20' fill='none' {...props}>
      <Path
        d='M5 2.5v3.75H3.125c-1.03 0-1.875.845-1.875 1.875v5c0 1.03.845 1.875 1.875 1.875H5v2.5h10V15h1.875c1.03 0 1.875-.845 1.875-1.875v-5c0-1.03-.845-1.875-1.875-1.875H15V2.5H5zm1.25 1.25h7.5v2.5h-7.5v-2.5zM3.125 7.5h13.75c.352 0 .625.273.625.625v5a.617.617 0 01-.625.625H15v-2.5H5v2.5H3.125a.617.617 0 01-.625-.625v-5c0-.352.273-.625.625-.625zm1.25 1.25a.623.623 0 00-.625.625c0 .347.278.625.625.625A.623.623 0 005 9.375a.623.623 0 00-.625-.625zM6.25 12.5h7.5v3.75h-7.5V12.5z'
        fill='#2A3946'
      />
    </Svg>
  )
}

export default memo(SvgComponent)
