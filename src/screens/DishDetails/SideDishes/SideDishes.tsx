import React from 'react';
import { View } from 'react-native';
import { Box, Text, CheckBox } from '@src/components';
import { Dish } from '@src/data';
import { formatCurrency } from '@src/utils';

type SideDishesProps = {
  data: Dish;
  addSideDishToBasket: (dish: Dish) => void;
};

export const SideDishes: React.FC<SideDishesProps> = ({
  data: { sideDishes },
  addSideDishToBasket,
}) => {
  const onCheckBoxPress = (selectedDish: Dish) => {
    return () => {
      addSideDishToBasket(selectedDish);
    };
  };

  return (
    <View>
      {sideDishes?.map((section, sectionIndex) => (
        <View key={sectionIndex}>
          <Text padding="m" variant="subHeader">
            {section.title}
          </Text>
          {section.data.map((dish, dishIndex) => (
            <Box
              key={dishIndex}
              backgroundColor="card"
              borderBottomWidth={dishIndex < section.data.length - 1 ? 1 : 0}
              borderBottomColor="border">
              <CheckBox
                label={dish.title}
                onChange={onCheckBoxPress(dish)}
                rightElement={
                  <Text color="primary">
                    {formatCurrency(parseFloat(dish.price))}
                  </Text>
                }
              />
            </Box>
          ))}
        </View>
      ))}
    </View>
  );
};
