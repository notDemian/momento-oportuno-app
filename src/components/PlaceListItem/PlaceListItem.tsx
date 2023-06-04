import React from 'react';
import { Place } from '@src/data';
import { Box, Divider, Image, Text, Touchable } from '../elements';
import { PlaceCardInfo } from '../PlaceCardInfo';
import { useExploreStackNavigation } from '@src/hooks';

type PlaceListItemProps = {
  data: Place;
  hasDivider?: boolean;
  ratingStarBackgroundColor?: string;
};

export const PlaceListItem: React.FC<PlaceListItemProps> = ({
  data,
  hasDivider = true,
  ratingStarBackgroundColor,
}) => {
  const { image, title, subTitle } = data;
  const navigation = useExploreStackNavigation();

  const onPlaceItemPress = () => {
    navigation.navigate('PlaceDetails');
  };

  return (
    <Box>
      <Touchable onPress={onPlaceItemPress}>
        <Box padding="m">
          <Box flexDirection="row">
            <Image
              width={70}
              height={70}
              borderRadius="m"
              marginRight="s"
              source={image}
            />
            <Box flex={1} maxHeight={45}>
              <Box>
                <Text fontWeight="bold" numberOfLines={1}>
                  {title}
                </Text>
                <Text
                  variant="secondary"
                  marginTop="xxs"
                  marginBottom="s"
                  numberOfLines={1}>
                  {subTitle}
                </Text>
              </Box>
              <PlaceCardInfo
                data={data}
                ratingStarBackgroundColor={ratingStarBackgroundColor}
              />
            </Box>
          </Box>
        </Box>
      </Touchable>
      {hasDivider && <Divider />}
    </Box>
  );
};
