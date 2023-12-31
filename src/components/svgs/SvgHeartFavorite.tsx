import { memo } from 'react'
import Svg, { Path, type SvgProps } from 'react-native-svg'

type Props = SvgProps

function SvgHeartFavorite(props: Props) {
  return (
    <Svg width={20} height={18} viewBox='0 0 20 18' {...props}>
      <Path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M0 5.658C0 2.542 2.471 0 5.5 0 7.238 0 8.752.96 10 2.591c1.248-1.63 2.762-2.59 4.5-2.59C17.529 0 20 2.541 20 5.657c0 2.106-1.544 4.09-3.426 6.124-1.08 1.167-2.303 2.343-3.498 3.492-.888.854-1.76 1.692-2.546 2.5a.735.735 0 01-1.06 0 108.403 108.403 0 00-2.546-2.5c-1.195-1.149-2.418-2.325-3.498-3.492C1.544 9.748 0 7.764 0 5.658zM9.366 4.27C8.183 2.345 6.964 1.543 5.5 1.543c-2.218 0-4 1.833-4 4.115 0 1.236 1.206 3.11 3.012 5.061 1.03 1.113 2.215 2.257 3.398 3.398.71.684 1.417 1.367 2.09 2.041.673-.674 1.38-1.357 2.09-2.04 1.183-1.142 2.369-2.286 3.398-3.399C17.294 8.768 18.5 6.894 18.5 5.658c0-2.282-1.782-4.115-4-4.115-1.464 0-2.683.802-3.866 2.727a.745.745 0 01-.634.358.745.745 0 01-.634-.358z'
        fill={props.fill ?? '#2A3946'}
      />
    </Svg>
  )
}

export default memo(SvgHeartFavorite)
