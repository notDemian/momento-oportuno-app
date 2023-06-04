import React from 'react';
import { Image, List, ListRowItem, ListRowItemProps } from '@src/components';
import { activityHistoryList } from '@src/data/mock-activity-history';
import { useActivityHistoryStackNavigation } from '@src/hooks';
import { formatCurrency } from '@src/utils';
import { ListRenderItemInfo } from 'react-native/types';

export const ActivityHistory = () => {
  const navigation = useActivityHistoryStackNavigation();

  const data: ListRowItemProps[] = activityHistoryList.map((item) => {
    const {
      restaurantName,
      date,
      orderDetail: { totalItems, price },
      bookingId,
    } = item;
    return {
      id: bookingId,
      title: restaurantName,
      subTitle: `${totalItems} items | ${formatCurrency(totalItems * price)}`,
      note: date,
      onPress: () => navigation.navigate('ActivityHistoryDetail'),
      leftElement: (
        <Image
          source={require('@src/assets/common/food.png')}
          width={30}
          height={30}
        />
      ),
    };
  });

  const renderItem = (props: ListRenderItemInfo<ListRowItemProps>) => {
    return <ListRowItem key={props.index} {...props.item} />;
  };

  return <List data={data} renderItem={renderItem} />;
};
