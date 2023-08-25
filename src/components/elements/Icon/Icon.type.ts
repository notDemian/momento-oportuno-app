import { BoxProps } from '@shopify/restyle'
import type {
  Ionicons,
  MaterialCommunityIcons,
  Fontisto,
  MaterialIcons,
  Feather,
  FontAwesome5,
} from '@expo/vector-icons'
import { Theme } from '@src/theme'

type UnionIcons = React.ComponentPropsWithoutRef<typeof Ionicons> &
  React.ComponentPropsWithoutRef<typeof MaterialCommunityIcons> &
  React.ComponentPropsWithoutRef<typeof Fontisto> &
  React.ComponentPropsWithoutRef<typeof MaterialIcons> &
  React.ComponentPropsWithoutRef<typeof Feather> &
  React.ComponentPropsWithoutRef<typeof FontAwesome5>

export type IconProps = {
  isPrimary?: boolean
  type?:
    | 'Ionicons'
    | 'MaterialCommunityIcons'
    | 'Fontisto'
    | 'MaterialIcons'
    | 'Feather'
    | 'FontAwesome5'
  name: string
} & BoxProps<Theme> &
  Omit<UnionIcons, 'name'> & {
    name: string
  }
