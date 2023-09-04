import { memo } from 'react'
import Svg, { Path, type SvgProps } from 'react-native-svg'

type Props = SvgProps

function SvgCheck(props: Props) {
  return (
    <Svg width={12} height={9} viewBox='0 0 12 9' fill='none' {...props}>
      <Path
        d='M10.663 0a.667.667 0 00-.458.202L3.343 7.064 1.148 4.87a.667.667 0 10-.943.942l2.667 2.667a.667.667 0 00.942 0l7.334-7.333A.667.667 0 0010.663 0z'
        fill='#374B5C'
      />
    </Svg>
  )
}

export default memo(SvgCheck)
