import React from 'react';
import { savedAddresses } from '@src/data';
import {
  List,
  ListRowItemProps,
  ListRowItem,
  Icon,
  Divider,
} from '@src/components';
import { I18nManager, ListRenderItemInfo } from 'react-native';
import { useExploreStackNavigation } from '@src/hooks';

const chevronIconName = I18nManager.isRTL ? 'chevron-back' : 'chevron-forward';

const savedPlaceListItem: ListRowItemProps = {
  id: '1',
  title: 'Saved Places',
  subTitle: 'Select a delivery address easily',
  leftElement: <Icon name="bookmark" />,
  rightElement: <Icon name={chevronIconName} />,
};

const useCurrentLocationListItem: ListRowItemProps = {
  id: '1',
  title: 'Use Current Location',
  subTitle: '588 Blanda Square - Virginia',
  leftElement: <Icon name="location" />,
};

export const ChangeAddress = () => {
  const navigation = useExploreStackNavigation();

  const data = savedAddresses.map((item) => {
    const { id, description, name } = item;
    return {
      id,
      title: name,
      subTitle: description,
      rightElement: <Icon name="bookmark" />,
    };
  });

  const savedPlaceListItemPress = () => {
    navigation.navigate('SavedAddresses');
  };

  const renderItem = (props: ListRenderItemInfo<ListRowItemProps>) => {
    return <ListRowItem key={props.index} {...props.item} />;
  };

  const renderListHeader = () => {
    return (
      <>
        <ListRowItem
          {...savedPlaceListItem}
          onPress={savedPlaceListItemPress}
        />
        <Divider />
        <ListRowItem {...useCurrentLocationListItem} />
        <Divider />
      </>
    );
  };

  return (
    <List
      data={data}
      ListHeaderComponent={renderListHeader()}
      renderItem={renderItem}
    />
  );
};
