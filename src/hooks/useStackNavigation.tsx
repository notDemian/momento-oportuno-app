import { useNavigation } from '@react-navigation/native'
import {
  ActivityHistoryStackNavigationProp,
  ExploreStackNavigationProp,
  SearchStackNavigationProp,
  AuthStackNavigationProp,
  NewAnuncioStackNavigationProp,
  AccountStackNavigationProp,
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

export const useAuthStackNavigation = () => {
  return useNavigation<AuthStackNavigationProp>()
}

export const useNewAdStackNavigation = () => {
  return useNavigation<NewAnuncioStackNavigationProp>()
}

export const useAccountStackNavigation = () => {
  return useNavigation<AccountStackNavigationProp>()
}
