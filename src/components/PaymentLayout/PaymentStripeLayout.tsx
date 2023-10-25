import React, { useEffect, useState } from 'react'
import { type PropsWithChildren } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native'

import { Constants } from '@src/utils'
import { initStripe } from '@stripe/stripe-react-native'

interface Props {
  paymentMethod?: string
  onInit?(): void
}

const PaymentScreen: React.FC<PropsWithChildren<Props>> = ({
  paymentMethod,
  children,
  onInit,
}) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function initialize() {
      const publishableKey = Constants
      if (publishableKey) {
        await initStripe({
          publishableKey,
          merchantIdentifier: 'merchant.com.stripe.react.native',
          urlScheme: 'stripe-example',
          setReturnUrlSchemeOnAndroid: true,
        })
        setLoading(false)
        onInit?.()
      }
    }
    initialize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return loading ? (
    <ActivityIndicator size='large' style={StyleSheet.absoluteFill} />
  ) : (
    <ScrollView
      accessibilityLabel='payment-screen'
      style={styles.container}
      keyboardShouldPersistTaps='always'
    >
      {children}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
})

export default PaymentScreen
