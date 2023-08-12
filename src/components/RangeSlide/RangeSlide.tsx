import { FC, ReactNode, useCallback } from 'react'
import RangeSlider from 'rn-range-slider'
import Thumb from './Thumb'
import Rail from './Rail'
import RailSelected from './RailSelected'
import Label from './Label'
import Notch from './Notch'
import { StyleSheet, ViewProps } from 'react-native'

type RangeSlideProps = {
  handleValueChange: (low: number, high: number) => void
  style?: ViewProps['style']
  step?: number
}
const MAX_PRICE = 9_999
const MIN_PRICE = 0

export const RangeSlide: FC<RangeSlideProps> = ({
  handleValueChange,
  style,
  step = 1,
}) => {
  const renderThumb = useCallback(() => <Thumb />, [])
  const renderRail = useCallback(() => <Rail />, [])
  const renderRailSelected = useCallback(() => <RailSelected />, [])
  const renderLabel = useCallback(
    (value: number): ReactNode => <Label text={value} />,
    [],
  )
  const renderNotch = useCallback(() => <Notch />, [])
  return (
    <RangeSlider
      style={[styles.slider, style]}
      min={MIN_PRICE}
      max={MAX_PRICE}
      step={step}
      floatingLabel
      renderThumb={renderThumb}
      renderRail={renderRail}
      renderRailSelected={renderRailSelected}
      renderLabel={renderLabel}
      // renderNotch={renderNotch}
      onValueChanged={handleValueChange}
    />
  )
}

const styles = StyleSheet.create({
  slider: {
    flex: 1,
  },
})
