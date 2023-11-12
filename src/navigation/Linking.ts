import { RootStackParamList } from './types'

import { LinkingOptions } from '@react-navigation/native'
import { Constants } from '@src/utils'
import * as Linking from 'expo-linking'

const appPrefix = Linking.createURL('/')

const webPrefix = Constants.FRONT_URL.str

const config: LinkingOptions<RootStackParamList>['config'] = {
  screens: {
    MainStacks: {
      screens: {
        SearchTab: {
          // seems like LinkingOptions cant properly read the initialRouteName's type so we have to override it
          // its needed to redirect in the correct order
          initialRouteName: 'Search' as any,
          screens: {
            AnuncioDetailsModal: {
              path: 'ad/:id',
              parse: {
                id: Number,
              },
            },
          },
        },
      },
    },
  },
}

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [appPrefix, webPrefix],
  config,
}

export { linking }
