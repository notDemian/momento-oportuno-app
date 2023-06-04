import React from 'react';
import { Box, Text } from '@src/components/elements';
import { HeadingInformationProps } from './HeadingInformation.type';
import { formatCurrency } from '@src/utils';

export const HeadingInformation: React.FC<HeadingInformationProps> = ({
  data,
}) => {
  const { title, price, description } = data;
  return (
    <Box backgroundColor="card" padding="m">
      <Box flexDirection="row" justifyContent="space-between">
        <Box width="80%" paddingRight="s">
          <Text variant="subHeader" numberOfLines={2}>
            {title}
          </Text>
        </Box>
        <Text variant="subHeader" color="primary">
          {formatCurrency(parseFloat(price))}
        </Text>
      </Box>
      <Text marginTop="m">{description}</Text>
    </Box>
  );
};
