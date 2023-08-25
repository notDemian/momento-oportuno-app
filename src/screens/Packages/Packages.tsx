import { ContentLoader, List, LoadingPageModal, Section } from '@src/components'
import { usePaquetes } from '@src/hooks'
import { CLOG } from '@src/utils'
import { PackageItem } from './PackageItem/PackageItem'
import { PackageScreenProps } from './Packages.type'
import { useCallback } from 'react'
import { useAppTheme } from '@src/theme'

export const Packages: React.FC<PackageScreenProps> = ({ navigation: _ }) => {
  const {
    data: paquetes,
    refetch: _refetch,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = usePaquetes()

  const { colors } = useAppTheme()

  const fecthMore = useCallback(() => {
    if (hasNextPage) {
      fetchNextPage()
    }
  }, [hasNextPage, fetchNextPage])

  if (isLoading || !paquetes) return <LoadingPageModal loading={isLoading} />

  const flattenData = paquetes.pages.flatMap((page) => page.data)

  return (
    <Section title='Selecciona un paquete' backgroundColor={'background'}>
      <List
        data={flattenData}
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
        onEndReached={fecthMore}
        contentContainerStyle={{ backgroundColor: colors.background }}
      />
    </Section>
  )
}
