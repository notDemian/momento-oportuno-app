import React from 'react';
import { ScrollView } from 'react-native';
import { profile } from '@src/data';
import { HeadingInformation } from './HeadingInformation';
import { ContactInformationForm } from './ContactInformationForm';
import { LinkedAccounts } from './LinkedAccounts';

export const EditProfile = () => {
  return (
    <ScrollView>
      <HeadingInformation profile={profile} />
      <ContactInformationForm profile={profile} />
      <LinkedAccounts />
    </ScrollView>
  );
};
