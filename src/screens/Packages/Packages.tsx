import { useCallback } from 'react'
import { ListRenderItem } from 'react-native'

import { PackageItem } from './PackageItem/PackageItem'
import { PackageScreenProps } from './Packages.type'

import { Paquete } from '@src/api'
import { List, LoadingPageModal, Section } from '@src/components'
import { usePaquetes } from '@src/hooks'
import { useAppTheme } from '@src/theme'

export const Packages: React.FC<PackageScreenProps> = ({ navigation: _ }) => {
  const { data: paquetes, isLoading } = usePaquetes()

  const { colors } = useAppTheme()

  const renderItem = useCallback<ListRenderItem<Paquete>>(({ item }) => {
    return <PackageItem paquete={item} />
  }, [])
  if (isLoading || !paquetes) return <LoadingPageModal loading={isLoading} />

  return (
    <Section
      title='Selecciona un paquete'
      backgroundColor={'background'}
      paddingBottom={'xxl'}
    >
      <List
        data={paquetes}
        renderItem={renderItem}
        ItemSeparatorComponent={() => null}
        contentContainerStyle={{ backgroundColor: colors.background }}
      />
    </Section>
  )
}
