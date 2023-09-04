import { ScrollView } from 'react-native-gesture-handler'

import { Box, Divider, Icon, ListRowItem,Section } from '@src/components'
import { favoriteAddresses } from '@src/data/mock-address'
import { useExploreStackNavigation } from '@src/hooks'

export const SavedAddresses = () => {
  const navigation = useExploreStackNavigation()

  const addAddressItemPress = () => {
    navigation.navigate('AddAddress')
  }

  return (
    <ScrollView>
      <Section title="Favorites" hasDivider={false}>
        <Box>
          {favoriteAddresses.map((item, index) => {
            const { id, name, description, isHome, isWork } = item
            let leftElement
            if (isHome) {
              leftElement = <Icon name="home" />
            } else if (isWork) {
              leftElement = <Icon name="briefcase" />
            }
            return (
              <Box key={index}>
                <ListRowItem
                  id={id}
                  title={name}
                  subTitle={description}
                  leftElement={leftElement}
                />
                <Divider />
              </Box>
            )
          })}
          <ListRowItem
            title="Add an Address"
            subTitle="Save your favourite places"
            onPress={addAddressItemPress}
          />
        </Box>
      </Section>
    </ScrollView>
  )
}
