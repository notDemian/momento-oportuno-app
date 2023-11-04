import { useCallback } from 'react'
import { ListRenderItem } from 'react-native'

import { PackageItem } from './PackageItem/PackageItem'
import { PackageScreenProps } from './Packages.type'

import { Package } from '@src/api'
import {
  Box,
  Button,
  List,
  LoadingPageModal,
  Section,
  Text,
} from '@src/components'
import { usePaquetes, usePreventNavigationOrPop } from '@src/hooks'
import { useAppTheme } from '@src/theme'

export const Packages: React.FC<PackageScreenProps> = ({
  navigation,
  route: {
    params: { id, type },
  },
}) => {
  const { data: paquetes, isLoading } = usePaquetes({
    resource_id: id,
    type,
  })

  const { colors } = useAppTheme()

  const renderItem = useCallback<ListRenderItem<Package>>(
    ({ item }) => {
      return <PackageItem paquete={item} id={id} type={type} />
    },
    [id, type],
  )

  const ListEmptyComponent = useCallback(() => {
    return (
      <Box flex={1} justifyContent='center' alignItems='center'>
        <Text
          variant='header'
          textAlign='center'
          paddingHorizontal='l'
          marginBottom='m'
        >
          ¡Ups! No hay paquetes disponibles
        </Text>
        <Button
          label='Regresar'
          variant='primary'
          onPress={() => navigation.popToTop()}
        />
      </Box>
    )
  }, [])

  usePreventNavigationOrPop({
    navToPop: navigation,
  })

  if (isLoading || !paquetes) return <LoadingPageModal loading={isLoading} />

  return (
    <Section
      title={paquetes?.data.length !== 0 ? 'Selecciona un paquete' : ''}
      backgroundColor={'background'}
      paddingBottom={'xxl'}
    >
      <List
        data={paquetes.data}
        renderItem={renderItem}
        ItemSeparatorComponent={() => null}
        contentContainerStyle={{ backgroundColor: colors.background }}
        ListEmptyComponent={ListEmptyComponent}
      />
    </Section>
  )
}
