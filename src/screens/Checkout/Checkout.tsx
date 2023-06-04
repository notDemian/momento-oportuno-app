import React from 'react';
import { ScrollView } from 'react-native';
import { DeliveryInformation } from './DeliveryInformation';
import { OrderSummary } from './OrderSummary';
import { PaymentMethod } from './PaymentMethod';
import { PlaceOrder } from './PlaceOrder';
import { DishesAlsoOrdered } from './DishesAlsoOrdered';
import { CartContext } from '@src/cart';
import { Box } from '@src/components';

const SHIPPING_FEE = 5;

export const Checkout = () => {
  const { cartItems, totalPrice } = React.useContext(CartContext);
  return (
    <Box flex={1}>
      <ScrollView>
        <DeliveryInformation />
        <OrderSummary
          cartItems={cartItems}
          totalPrice={totalPrice}
          shippingFee={SHIPPING_FEE}
        />
        <DishesAlsoOrdered />
        <PaymentMethod />
      </ScrollView>
      <PlaceOrder totalPrice={totalPrice} shippingFee={SHIPPING_FEE} />
    </Box>
  );
};
