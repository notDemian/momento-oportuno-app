import type {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs'
import {
  useNavigation,
  type CompositeNavigationProp,
  type CompositeScreenProps,
  type NavigatorScreenParams,
  type ParamListBase,
} from '@react-navigation/native'
import type {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'
import type { Anuncio } from '@src/api'
import { NewAnuncioCategorias } from '@src/data'

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
  Checkout: undefined
  PlaceList: {
    title?: string
  }
  ChangeAddress: undefined
  SavedAddresses: undefined
  AddAddress: undefined
  SelectLocation: undefined
  PaymentMethod: undefined
  Promotion: undefined
  TrackOrder: undefined
}

export type NewAnuncioStackParamList = {
  NewAnuncioForm: undefined
  NewAnuncioFormByCat: {
    categoria: NewAnuncioCategorias
  }

  NewAnuncioDetails: undefined
  NewAnuncioLocation: undefined
  NewAnuncioPayment: undefined
  NewAnuncioConfirmation: undefined
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

export type NotificationStackParamList = {
  Notification: undefined
}

export type AccountStackParamList = {
  Account: undefined
  EditProfile: undefined
  SavedAddresses: undefined
  AddAddress: undefined
  SelectLocation: undefined
  Settings: undefined
  SupportCenter: undefined

  MyPackages: undefined
  Package: undefined
}

export type TabParamList = {
  ExploreTab: NavigatorScreenParams<ExploreStackParamList>
  ActivityHistoryTab: NavigatorScreenParams<ActivityHistoryStackParamList>
  SearchTab: NavigatorScreenParams<SearchStackParamList>
  NotificationTab: NavigatorScreenParams<NotificationStackParamList>
  AccountTab: NavigatorScreenParams<AccountStackParamList>
  DocumentationTab: NavigatorScreenParams<unknown>
  NewAnuncioTab: NavigatorScreenParams<NewAnuncioStackParamList>
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

export type NotificationScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'NotificationTab'>,
  CompositeScreenProps<
    NativeStackScreenProps<NotificationStackParamList>,
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

export type NewAnuncioScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabParamList, 'NewAnuncioTab'>,
  CompositeScreenProps<
    NativeStackScreenProps<NewAnuncioStackParamList>,
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

export type NewAnuncioStackNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'NewAnuncioTab'>,
  NativeStackNavigationProp<RootStackParamList & NewAnuncioStackParamList>
>

export type AuthStackNavigationProp = NativeStackNavigationProp<
  RootStackParamList & AuthStackParamList
>

export type NotificationStackNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<TabParamList, 'NotificationTab'>,
  NativeStackNavigationProp<RootStackParamList & NotificationStackParamList>
>

export const useGlobalNavigation = () => {
  return useNavigation<
    CompositeNavigationProp<
      BottomTabNavigationProp<TabParamList>,
      NativeStackNavigationProp<RootStackParamList>
    >
  >()
}
