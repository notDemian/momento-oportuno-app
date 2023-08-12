import {
  Ionicons,
  MaterialCommunityIcons,
  Fontisto,
  MaterialIcons,
} from '@expo/vector-icons'
import { createBox } from '@shopify/restyle'
import { Theme, fontSize, useAppTheme } from '@src/theme'
import { IconProps } from './Icon.type'

const InnerDefaultIcon = createBox<Theme>(Ionicons)

const MaCommunityIcons = createBox<Theme>(MaterialCommunityIcons)

const FontistoIcons = createBox<Theme>(Fontisto)

const MaterialIconsIcons = createBox<Theme>(MaterialIcons)

export const Icon: React.FC<IconProps> = ({
  isPrimary,
  type = 'Ionicons',
  // size = fontSize.l,
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

    default:
      break
  }

  return (
    <ICon
      color={isPrimary ? colors.primary : colors.secondary}
      size={rest.size || fontSize.l}
      {...rest}
    />
  )
}
