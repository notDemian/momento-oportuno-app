import { ScrollView } from 'react-native'

import { ContactInformationForm } from './ContactInformationForm'
import { HeadingInformation } from './HeadingInformation'
import { LinkedAccounts } from './LinkedAccounts'

import { profile } from '@src/data'

export const EditProfile = () => {
  return (
    <ScrollView>
      <HeadingInformation profile={profile} />
      <ContactInformationForm profile={profile} />
      <LinkedAccounts />
    </ScrollView>
  )
}
