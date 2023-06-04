import React from 'react';
import { ScrollView } from 'react-native';
import {
  Section,
  ListRowItem,
  Text,
  Button,
  Divider,
  Box,
  Card,
  LottieView,
} from '@src/components';

export const SupportCenter = () => {
  return (
    <ScrollView>
      <Card borderRadius="m" marginTop="m" marginHorizontal="m">
        <Box flexDirection="row">
          <Box flex={1} justifyContent="center">
            <Text variant="subHeader" color="primary">
              Live chat with our support team
            </Text>
            <Button label="Start" width={100} marginTop="s" buttonSize="s" />
          </Box>
          <Box width={120} justifyContent="center" alignItems="center">
            <LottieView
              source={require('@src/assets/animations/support-center.json')}
              autoPlay
              width="100%"
            />
          </Box>
        </Box>
      </Card>
      <Section title="Frequently Asked Questions">
        <ListRowItem title="My order didn't delivered" hasChevron />
        <Divider />
        <ListRowItem title="My orders came with missing items" hasChevron />
        <Divider />
        <ListRowItem title="How to change my delivery addresses?" hasChevron />
        <Divider />
        <ListRowItem title="How to setup my payment pethods?" hasChevron />
        <Divider />
        <ListRowItem title="Where can I change my password?" hasChevron />
        <Divider />
        <ListRowItem title="How to request a refund?" hasChevron />
        <Divider />
        <ListRowItem title="How can I contact with my drivers" hasChevron />
      </Section>
    </ScrollView>
  );
};
