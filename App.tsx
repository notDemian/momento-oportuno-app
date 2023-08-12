import { RootNavigation } from '@src/navigation'
import { AppThemeProvider } from '@src/theme/AppThemeProvider'
import { StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { PortalProvider } from '@gorhom/portal'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { AuthProvider } from '@src/auth'
import { CartProvider } from '@src/cart'
import { FilterProvider } from '@src/filterContext'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <PortalProvider>
        <SafeAreaProvider>
          <AppThemeProvider>
            <AuthProvider>
              <CartProvider>
                <FilterProvider>
                  <RootNavigation />
                </FilterProvider>
              </CartProvider>
            </AuthProvider>
          </AppThemeProvider>
        </SafeAreaProvider>
      </PortalProvider>
    </GestureHandlerRootView>
  )
}
