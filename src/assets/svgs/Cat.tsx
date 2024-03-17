import Svg, {
  Defs,
  Image,
  Pattern,
  Rect,
  SvgProps,
  Use,
} from 'react-native-svg'
function CatSvg(props: SvgProps) {
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
          <Use xlinkHref='#image0_1_108' transform='scale(.00081)' />
        </Pattern>
        <Image
          id='image0_1_108'
          width={1230}
          height={1230}
        />
      </Defs>
    </Svg>
  )
}
export default CatSvg