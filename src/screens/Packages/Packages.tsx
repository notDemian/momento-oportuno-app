import { useCallback } from 'react'
import { ListRenderItem } from 'react-native'

import { PackageItem } from './PackageItem/PackageItem'
import { PackageScreenProps } from './Packages.type'

import { Package } from '@src/api'
import { List, LoadingPageModal, Section } from '@src/components'
import { usePaquetes } from '@src/hooks'
import { useAppTheme } from '@src/theme'
import { CLOG } from '@src/utils'

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
  CLOG({
    id,
  })

  const { colors } = useAppTheme()

  const renderItem = useCallback<ListRenderItem<Package>>(
    ({ item }) => {
      return <PackageItem paquete={item} id={id} type={type} />
    },
    [id, type],
  )
  if (isLoading || !paquetes) return <LoadingPageModal loading={isLoading} />

  return (
    <Section
      title='Selecciona un paquete'
      backgroundColor={'background'}
      paddingBottom={'xxl'}
    >
      <List
        data={paquetes.data}
        renderItem={renderItem}
        ItemSeparatorComponent={() => null}
        contentContainerStyle={{ backgroundColor: colors.background }}
      />
    </Section>
  )
}
