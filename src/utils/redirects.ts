import { Linking } from 'react-native'

export const redirectToWhatsapp = (phone: string) => {
  Linking.openURL(`whatsapp://send?phone=${phone}`)
}

export const callPhone = (phone: string) => {
  const phoneUrl = `tel://${phone.trim()}`
  Linking.openURL(phoneUrl)
}

export const redirectToEmail = (params: {
  email: string
  subject?: string
  body?: string
}) => {
  const { email, subject, body } = params
  let query = ''
  if (subject) {
    query = `?subject=${subject}`
  }
  if (body) {
    query += `&body=${body}`
  }
  Linking.openURL(`mailto:${email}${query}`)
}
