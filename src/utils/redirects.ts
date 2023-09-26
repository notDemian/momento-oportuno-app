import { Linking } from 'react-native'

export const redirectToWhatsapp = (phone: string) => {
  Linking.openURL(`whatsapp://send?phone=${phone}`)
}

export const callPhone = (phone: string) => {
  const phoneUrl = `tel://${phone.trim()}`
  Linking.openURL(phoneUrl)
}

export const redirectToEmail = (email: string) => {
  Linking.openURL(`mailto:${email}`)
}
