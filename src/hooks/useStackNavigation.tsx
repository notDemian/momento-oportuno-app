import { useNavigation } from '@react-navigation/native'
import {
  AccountStackNavigationProp,
  ActivityHistoryStackNavigationProp,
  AuthStackNavigationProp,
  DirectorioStackNavigationProp,
  ExploreStackNavigationProp,
  MicrositiosStackNavigationProp,
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

export const useAuthStackNavigation = () => {
  return useNavigation<AuthStackNavigationProp>()
}

export const useAccountStackNavigation = () => {
  return useNavigation<AccountStackNavigationProp>()
}

export const useMicrositiosStackNavigation = () => {
  return useNavigation<MicrositiosStackNavigationProp>()
}

export const useDirectorioStackNavigation = () => {
  return useNavigation<DirectorioStackNavigationProp>()
}
