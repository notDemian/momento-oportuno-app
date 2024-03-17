import Svg, {
  Defs,
  Image,
  Pattern,
  Rect,
  SvgProps,
  Use,
} from 'react-native-svg'
function HouseSvg(props: SvgProps) {
  return (
    <Svg width={160} height={161} viewBox='0 0 160 161' fill='none' {...props}>
      <Rect y={0.5} width={160} height={160} rx={80} fill='url(#pattern0)' />
      <Defs>
        <Pattern
          id='pattern0'
          patternContentUnits='objectBoundingBox'
          width={1}
          height={1}
        >
          <Use xlinkHref='#image0_1_114' transform='scale(.00049)' />
        </Pattern>
        <Image
          id='image0_1_114'
          width={2048}
          height={2048}
        />
      </Defs>
    </Svg>
  )
}
export default HouseSvg