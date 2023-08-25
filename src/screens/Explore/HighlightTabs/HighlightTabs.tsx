import React from 'react'
import { FeaturedTab, NewTab, TrendingTab } from './tabs'
import { Box, TabView, TabViewData } from '@src/components'
import styles from './HighlightTabs.style'

const tabData: TabViewData = [
  { key: '0', title: 'Mis Avisos', content: FeaturedTab },
  {
    key: '1',
    title: 'Favoritos',
    content: NewTab,
  },
  {
    key: '2',
    title: 'Mensajes',
    content: TrendingTab,
  },
  { key: '3', title: 'Mis ordenes', content: FeaturedTab },
  { key: '4', title: 'Ajustes', content: FeaturedTab },
  { key: '5', title: 'Paquete actual', content: FeaturedTab },
  { key: '6', title: 'Selecciona un paquete', content: FeaturedTab },
]

export const HighlightTabs = () => {
  return (
    <Box
      backgroundColor='card'
      borderTopRightRadius='xl'
      borderTopLeftRadius='xl'
      height={880}
    >
      <TabView tabData={tabData} tabBarStyle={styles.tabBarStyle} isFullWidth />
    </Box>
  )
}
