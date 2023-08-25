import { Anuncio } from '@src/api'
import {
  AccordionItem,
  Box,
  Button,
  List,
  Text,
  AccordionList,
} from '@src/components'
import { SvgEmptyBox } from '@src/components/svgs'
import { useNewAdStackNavigation } from '@src/hooks'
import { memo, useCallback } from 'react'
import { type ListRenderItem } from 'react-native'

const Ajustes = () => {
  const nav = useNewAdStackNavigation()

  const renderItem = useCallback<ListRenderItem<Anuncio>>((anuncio) => {
    return <Text>{anuncio.item.content.rendered}</Text>
  }, [])

  const ListEmptyComponent = useCallback(() => {
    return (
      <Box
        flex={1}
        justifyContent='center'
        alignItems='center'
        backgroundColor={'background'}
      ></Box>
    )
  }, [])

  return (
    <Box flex={1} backgroundColor={'background'}>
      <AccordionItem
        customBody={() => {
          return <Text>body</Text>
        }}
        customTitle={() => {
          return <Text>title</Text>
        }}
      />
      <AccordionItem
        customBody={() => {
          return <Text>body</Text>
        }}
        customTitle={() => {
          return <Text>title</Text>
        }}
      />
      {/* <AccordionList data={} /> */}
    </Box>
  )
}

export default memo(Ajustes)
