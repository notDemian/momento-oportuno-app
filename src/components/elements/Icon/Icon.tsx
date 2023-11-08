import { IconProps } from './Icon.type'

import {
  Entypo,
  Feather,
  FontAwesome5,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
  SimpleLineIcons,
} from '@expo/vector-icons'
import { createBox } from '@shopify/restyle'
import { fontSize, Theme, useAppTheme } from '@src/theme'

const InnerDefaultIcon = createBox<Theme>(Ionicons)

const MaCommunityIcons = createBox<Theme>(MaterialCommunityIcons)

const FontistoIcons = createBox<Theme>(Fontisto)

const MaterialIconsIcons = createBox<Theme>(MaterialIcons)

const FeatherIcons = createBox<Theme>(Feather)

const FontAwesome5Icons = createBox<Theme>(FontAwesome5)

const SimpleLineIconsIcons = createBox<Theme>(SimpleLineIcons)

const EntypoIcons = createBox<Theme>(Entypo)

export const Icon: React.FC<IconProps> = ({
  isPrimary,
  type = 'Ionicons',
  color,
  ...rest
}) => {
  const { colors } = useAppTheme()

  let ICon = InnerDefaultIcon
  switch (type) {
    case 'MaterialCommunityIcons':
      ICon = MaCommunityIcons
      break
    case 'Fontisto':
      ICon = FontistoIcons
      break

    case 'MaterialIcons':
      ICon = MaterialIconsIcons
      break

    case 'Feather':
      ICon = FeatherIcons
      break

    case 'FontAwesome5':
      ICon = FontAwesome5Icons
      break

    case 'SimpleLineIcons':
      ICon = SimpleLineIconsIcons
      break

    case 'Entypo':
      ICon = EntypoIcons
      break

    default:
      break
  }

  return (
    <ICon
      color={color ?? (isPrimary ? colors.primary : colors.secondary)}
      size={rest.size || fontSize.l}
      {...rest}
    />
  )
}
