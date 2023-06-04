import { Theme } from '@src/theme';
import { Box } from '../Box';
import { BoxProps } from '@shopify/restyle';

export const Divider: React.FC<BoxProps<Theme>> = (props) => {
  return <Box height={1} backgroundColor="border" {...props} />;
};
