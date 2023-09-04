import { TextProps } from './Text.type'

import { createText } from '@shopify/restyle'
import { Theme } from '@src/theme'

const InnerText = createText<Theme>()

export const Text: React.FC<TextProps> = (props) => {
  return <InnerText {...props} />
}
