import { FC, ReactNode, useCallback } from 'react'
import { StyleSheet, ViewProps } from 'react-native'

import Label from './Label'
import Notch from './Notch'
import Rail from './Rail'
import RailSelected from './RailSelected'
import Thumb from './Thumb'

import RangeSlider from 'rn-range-slider'

type RangeSlideProps = {
  handleValueChange: (low: number, high: number) => void
  style?: ViewProps['style']
  step?: number
  high?: number
  low?: number
}
const MAX_PRICE = 9_999
const MIN_PRICE = 0

export const RangeSlide: FC<RangeSlideProps> = ({
  handleValueChange,
  style,
  step = 1,
  ...rest
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
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  slider: {
    flex: 1,
  },
})
