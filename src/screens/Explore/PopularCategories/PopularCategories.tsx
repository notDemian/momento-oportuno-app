import React from 'react';
import { Dimensions } from 'react-native';
import { mockCategories } from '@src/data';
import { Box, Image, Text, Touchable } from '@src/components';
import { PopularCategoriesProps } from './PopularCategories.type';

export const PopularCategories: React.FC<PopularCategoriesProps> = ({
  navigation,
}) => {
  const itemsPerRow = mockCategories.length / 2;

  const onCategoryItemPress = (name: string) => {
    return () => {
      navigation.navigate('PlaceList', { title: name });
    };
  };

  return (
    <Box backgroundColor="card" flexDirection="row" flexWrap="wrap">
      {mockCategories.map((category, index) => {
        const { id, image, name } = category;
        return (
          <Touchable key={id} onPress={onCategoryItemPress(name)}>
            <Box
              flexDirection="column"
              alignItems="center"
              width={Dimensions.get('window').width / itemsPerRow}
              borderColor="border"
              borderWidth={0.2}
              borderLeftWidth={0}
              borderRightWidth={
                index === itemsPerRow - 1 || index === mockCategories.length - 1
                  ? 0
                  : 0.2
              }
              padding="s">
              <Box>
                <Image height={50} width={50} source={image} />
              </Box>
              <Box>
                <Text fontSize={12} marginTop="s" fontWeight="bold">
                  {name}
                </Text>
              </Box>
            </Box>
          </Touchable>
        );
      })}
    </Box>
  );
};
