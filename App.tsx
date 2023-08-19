import { RootNavigation } from '@src/navigation'
import { AppThemeProvider } from '@src/theme/AppThemeProvider'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PortalProvider } from '@gorhom/portal'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { CartProvider } from '@src/cart'
import { FilterProvider } from '@src/filterContext'
import { Text } from 'react-native'

import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from '@src/redux'

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

const queryClient = new QueryClient()

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <PortalProvider>
        <SafeAreaProvider>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <PersistGate loading={null} persistor={persistor}>
                <AppThemeProvider>
                  <CartProvider>
                    <FilterProvider>
                      <RootNavigation />
                    </FilterProvider>
                  </CartProvider>
                </AppThemeProvider>
              </PersistGate>
            </Provider>
          </QueryClientProvider>
        </SafeAreaProvider>
      </PortalProvider>
    </GestureHandlerRootView>
  )
}
