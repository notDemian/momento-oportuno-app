import { ContentLoader, List, Section } from '@src/components'
import { usePaquetes } from '@src/hooks'
import { CLOG } from '@src/utils'
import { PackageItem } from './PackageItem/PackageItem'
import { PackageScreenProps } from './Packages.type'

export const Packages: React.FC<PackageScreenProps> = ({ navigation: _ }) => {
  const { data: paquetes, refetch: _refetch, isLoading } = usePaquetes()

  CLOG(paquetes?.[1])

  if (isLoading) return <ContentLoader />

  return (
    <Section title='Selecciona un paquete'>
      <List
        data={paquetes}
        renderItem={({ item: paquete }) => {
          return (
            <PackageItem
              paquete={paquete}
              onPress={() => {
                // TODO: navigate to payment screen
              }}
            />
          )
        }}
        ItemSeparatorComponent={() => null}
      />
    </Section>
  )
}
