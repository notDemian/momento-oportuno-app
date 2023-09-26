import type {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs'
import {
  type CompositeNavigationProp,
  type CompositeScreenProps,
  type NavigatorScreenParams,
  type ParamListBase,
  useNavigation,
} from '@react-navigation/native'
import type {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'
import type { Anuncio, Categoria, Paquete } from '@src/api'

// Stack Param List
export type RootStackParamList = {
  MainStacks: undefined
  AuthenticationStacks: undefined
}

export type AuthStackParamList = {
  Authentication: undefined
  AuthenticationWithPhone: undefined
  AuthenticationCodeVerification: undefined
  Login: undefined
  Register: undefined
  ForgotPassword: undefined
}

export type ExploreStackParamList = {
  Explore: undefined
  PlaceDetails: undefined
  PlaceList: {
    title?: string
  }

  ChangeAddress: undefined
  SavedAddresses: undefined
  AddAddress: undefined
  SelectLocation: undefined
  TrackOrder: undefined
}

export type ActivityHistoryStackParamList = {
  ActivityHistory: undefined
  ActivityHistoryDetail: undefined
}

export type SearchStackParamList = {
  Search: undefined
  Filter: undefined
  AnuncioDetailsModal: {
    data: Anuncio | Pick<Anuncio, 'id'>
  }
}

export type AccountStackParamList = {
  Account: undefined
  EditProfile: undefined
  SavedAddresses: undefined
  AddAddress: undefined
  SelectLocation: undefined
  Settings: undefined
  SupportCenter: undefined

  NewAnuncioForm: undefined
  NewAnuncioFormByCat: Categoria

  Checkout: Paquete
  PaymentMethod: undefined
  Promotion: undefined
  MyPackages: undefined
  Package: undefined
}

export type MicrositiosStackParamList = {
  Micrositios: undefined
  MicrositioById: {
    id: number
  }
}
export type DirectorioStackParamList = {
  Directorio: undefined
}

export type TabParamList = {
  ExploreTab: NavigatorScreenParams<ExploreStackParamList>
  ActivityHistoryTab: NavigatorScreenParams<ActivityHistoryStackParamList>
  SearchTab: NavigatorScreenParams<SearchStackParamList>
  // NotificationTab: NavigatorScreenParams<NotificationStackParamList>
  MicrositiosTab: NavigatorScreenParams<MicrositiosStackParamList>
  DirectorioTab: NavigatorScreenParams<DirectorioStackParamList>
  AccountTab: NavigatorScreenParams<AccountStackParamList>
  NoTab404: NavigatorScreenParams<undefined>
}

// Screen Props
export type ExploreScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'ExploreTab'>,
  CompositeScreenProps<
    NativeStackScreenProps<ExploreStackParamList>,
    NativeStackScreenProps<RootStackParamList>
  >
>

export type ActivityHistoryScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'ActivityHistoryTab'>,
  CompositeScreenProps<
    NativeStackScreenProps<ActivityHistoryStackParamList>,
    NativeStackScreenProps<RootStackParamList>
  >
>

export type SearchScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'SearchTab'>,
  CompositeScreenProps<
    NativeStackScreenProps<SearchStackParamList>,
    NativeStackScreenProps<RootStackParamList>
  >
>

export type DirectorioScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'DirectorioTab'>,
  CompositeScreenProps<
    NativeStackScreenProps<DirectorioStackParamList>,
    NativeStackScreenProps<RootStackParamList>
  >
>

export type AccountScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'AccountTab'>,
  CompositeScreenProps<
    NativeStackScreenProps<AccountStackParamList>,
    NativeStackScreenProps<RootStackParamList>
  >
>

export type MicrositiosScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'MicrositiosTab'>,
  CompositeScreenProps<
    NativeStackScreenProps<MicrositiosStackParamList>,
    NativeStackScreenProps<RootStackParamList>
  >
>

export type ScreenProps<
  T extends ParamListBase,
  K extends keyof T,
> = NativeStackScreenProps<T, K>

// Navigation Props
export type ExploreStackNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'ExploreTab'>,
  NativeStackNavigationProp<RootStackParamList & ExploreStackParamList>
>

export type SearchStackNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'SearchTab'>,
  NativeStackNavigationProp<RootStackParamList & SearchStackParamList>
>

export type ActivityHistoryStackNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'ActivityHistoryTab'>,
  NativeStackNavigationProp<RootStackParamList & ActivityHistoryStackParamList>
>

export type AccountStackNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'AccountTab'>,
  NativeStackNavigationProp<RootStackParamList & AccountStackParamList>
>

export type AuthStackNavigationProp = NativeStackNavigationProp<
  RootStackParamList & AuthStackParamList
>

export type DirectorioStackNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'DirectorioTab'>,
  NativeStackNavigationProp<RootStackParamList & DirectorioStackParamList>
>

export type MicrositiosStackNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'MicrositiosTab'>,
  NativeStackNavigationProp<RootStackParamList & MicrositiosStackParamList>
>

export const useGlobalNavigation = () => {
  return useNavigation<
    CompositeNavigationProp<
      BottomTabNavigationProp<TabParamList>,
      NativeStackNavigationProp<RootStackParamList>
    >
  >()
}
