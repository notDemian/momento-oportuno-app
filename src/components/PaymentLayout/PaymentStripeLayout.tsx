import React, { useEffect, useState } from 'react'
import { type PropsWithChildren } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native'

import { useAppTheme } from '@src/theme'
import { Constants } from '@src/utils'
import { initStripe } from '@stripe/stripe-react-native'

interface Props {
  onInit?(): void
}

const PaymentScreen: React.FC<PropsWithChildren<Props>> = ({
  children,
  onInit,
}) => {
  const [loading, setLoading] = useState(true)

  const {
    colors: { background: backgroundColor },
  } = useAppTheme()

  useEffect(() => {
    async function initialize() {
      const publishableKey = Constants.STRIPE.PUBLISHABLE_KEY
      if (publishableKey) {
        await initStripe({
          publishableKey,
          urlScheme: 'stripe-example',
          setReturnUrlSchemeOnAndroid: true,
        })
        setLoading(false)
        onInit?.()
      }
    }
    initialize()
  }, [])

  return loading ? (
    <ActivityIndicator size='large' style={StyleSheet.absoluteFill} />
  ) : (
    <ScrollView
      accessibilityLabel='payment-screen'
      style={[styles.container, { backgroundColor }]}
      keyboardShouldPersistTaps='always'
    >
      {children}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
})

export default PaymentScreen
