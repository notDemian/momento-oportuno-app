import { Ionicons } from '@expo/vector-icons';
import { createBox } from '@shopify/restyle';
import { Theme, fontSize, useAppTheme } from '@src/theme';
import { IconProps } from './Icon.type';

const InnerIcon = createBox<Theme>(Ionicons);

export const Icon: React.FC<IconProps> = ({ isPrimary, ...rest }) => {
  const { colors } = useAppTheme();
  return (
    <InnerIcon
      color={isPrimary ? colors.primary : colors.secondary}
      size={fontSize.l}
      {...rest}
    />
  );
};
