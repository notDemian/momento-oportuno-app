import { ContentLoader, List, LoadingPageModal, Section } from '@src/components'
import { usePaquetes } from '@src/hooks'
import { CLOG } from '@src/utils'
import { PackageItem } from './PackageItem/PackageItem'
import { PackageScreenProps } from './Packages.type'
import { useCallback } from 'react'
import { useAppTheme } from '@src/theme'
import { ListRenderItem } from 'react-native'
import { FAKE_PAQUETES, PackageFakeData } from './mocks/package.type'

export const Packages: React.FC<PackageScreenProps> = ({ navigation: _ }) => {
  // const {
  //   data: paquetes,
  //   // refetch,
  //   isLoading,
  //   fetchNextPage,
  //   hasNextPage,
  // } = usePaquetes()

  const { colors } = useAppTheme()

  // const fecthMore = useCallback(() => {
  //   if (hasNextPage) {
  //     fetchNextPage()
  //   }
  // }, [hasNextPage, fetchNextPage])

  // if (isLoading || !paquetes) return <LoadingPageModal loading={isLoading} />

  // const flattenData = paquetes.pages.flatMap((page) => page.data)

  const renderItem: ListRenderItem<PackageFakeData> = ({ item }) => {
    return (
      <PackageItem
        paquete={item}
        onPress={() => {
          // TODO: navigate to payment screen
        }}
      />
    )
  }

  return (
    <Section
      title='Selecciona un paquete'
      backgroundColor={'background'}
      paddingBottom={'xxl'}
    >
      <List
        data={FAKE_PAQUETES}
        renderItem={renderItem}
        ItemSeparatorComponent={() => null}
        // onEndReached={fecthMore}
        contentContainerStyle={{ backgroundColor: colors.background }}
      />
    </Section>
  )
}
