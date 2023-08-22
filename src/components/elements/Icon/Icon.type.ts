import { BoxProps } from '@shopify/restyle'
import type {
  Ionicons,
  MaterialCommunityIcons,
  Fontisto,
  MaterialIcons,
} from '@expo/vector-icons'
import { Theme } from '@src/theme'

type UnionIcons = React.ComponentPropsWithoutRef<typeof Ionicons> &
  React.ComponentPropsWithoutRef<typeof MaterialCommunityIcons> &
  React.ComponentPropsWithoutRef<typeof Fontisto> &
  React.ComponentPropsWithoutRef<typeof MaterialIcons>

export type IconProps = {
  isPrimary?: boolean
  type?: 'Ionicons' | 'MaterialCommunityIcons' | 'Fontisto' | 'MaterialIcons'
  name: string
} & BoxProps<Theme> &
  Omit<UnionIcons, 'name'> & {
    name: string
  }
