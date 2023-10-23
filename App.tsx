import { StyleSheet } from 'react-native'
import { Text } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'

import { PortalProvider } from '@gorhom/portal'
import { RootNavigation } from '@src/navigation'
import { persistor, store } from '@src/redux'
import { AppThemeProvider } from '@src/theme/AppThemeProvider'
import { AxiosError } from 'axios'
import { PersistGate } from 'redux-persist/integration/react'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

interface TextWithDefaultProps extends Text {
  defaultProps?: { allowFontScaling?: boolean; maxFontSizeMultiplier?: number }
}

;(Text as unknown as TextWithDefaultProps).defaultProps =
  (Text as unknown as TextWithDefaultProps).defaultProps || {}
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
;(Text as unknown as TextWithDefaultProps).defaultProps!.allowFontScaling =
  false
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
;(
  Text as unknown as TextWithDefaultProps
).defaultProps!.maxFontSizeMultiplier = 1

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError(e) {
        if (e instanceof AxiosError) {
          console.log('ERROR ---------------___>')
          console.log('e.response', e.response)
          console.error(e.response?.data)
        }
      },
    },
    mutations: {
      onError(e) {
        if (e instanceof AxiosError) {
          console.log('ERROR ---------------___>')
          console.log('e.response', e.response)
          console.error(e.response?.data)
        }
      },
    },
  },
})

function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <PortalProvider>
        <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <AppThemeProvider>
                  <RootNavigation />
                </AppThemeProvider>
              </PersistGate>
            </Provider>
          </QueryClientProvider>
        </SafeAreaProvider>
      </PortalProvider>
    </GestureHandlerRootView>
  )
}

export default App
