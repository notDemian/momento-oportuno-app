import React from 'react'
import { View } from 'react-native'

import { Anuncio } from '@src/api'

type SideAnuncioesProps = {
  data: Anuncio
  addSideAnuncioToBasket: (anuncio: Anuncio) => void
}

export const SideAnuncioes: React.FC<SideAnuncioesProps> = ({
  data,
  addSideAnuncioToBasket,
}) => {
  const onCheckBoxPress = (selectedAnuncio: Anuncio) => {
    return () => {
      addSideAnuncioToBasket(selectedAnuncio)
    }
  }

  return <View></View>
}
