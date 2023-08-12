import { useNavigation } from '@react-navigation/native'
import {
  ActivityHistoryStackNavigationProp,
  ExploreStackNavigationProp,
  SearchStackNavigationProp,
} from '@src/navigation'

export const useExploreStackNavigation = () => {
  return useNavigation<ExploreStackNavigationProp>()
}

export const useSearchStackNavigation = () => {
  return useNavigation<SearchStackNavigationProp>()
}

export const useActivityHistoryStackNavigation = () => {
  return useNavigation<ActivityHistoryStackNavigationProp>()
}
