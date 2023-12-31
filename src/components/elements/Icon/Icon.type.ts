import type {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome5,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
} from '@expo/vector-icons'
import { BoxProps } from '@shopify/restyle'
import { Theme } from '@src/theme'

type UnionIcons = React.ComponentPropsWithoutRef<typeof Ionicons> &
  React.ComponentPropsWithoutRef<typeof MaterialCommunityIcons> &
  React.ComponentPropsWithoutRef<typeof Fontisto> &
  React.ComponentPropsWithoutRef<typeof MaterialIcons> &
  React.ComponentPropsWithoutRef<typeof Feather> &
  React.ComponentPropsWithoutRef<typeof FontAwesome5> &
  React.ComponentPropsWithoutRef<typeof SimpleLineIcons> &
  React.ComponentPropsWithoutRef<typeof Entypo> &
  React.ComponentPropsWithoutRef<typeof AntDesign>

export type IconProps = {
  isPrimary?: boolean
  type?:
    | 'Ionicons'
    | 'MaterialCommunityIcons'
    | 'Fontisto'
    | 'MaterialIcons'
    | 'Feather'
    | 'FontAwesome5'
    | 'SimpleLineIcons'
    | 'Entypo'
    | 'AntDesign'
  color?: string
  name: string
} & BoxProps<Theme> &
  Omit<UnionIcons, 'name'> & {
    name: string
  }
