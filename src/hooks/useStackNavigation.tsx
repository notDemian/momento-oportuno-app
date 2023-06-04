import { useNavigation } from '@react-navigation/native';
import {
  ActivityHistoryStackNavigationProp,
  ExploreStackNavigationProp,
} from '@src/navigation';

export const useExploreStackNavigation = () => {
  return useNavigation<ExploreStackNavigationProp>();
};

export const useActivityHistoryStackNavigation = () => {
  return useNavigation<ActivityHistoryStackNavigationProp>();
};
