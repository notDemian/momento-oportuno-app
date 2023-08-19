import React from 'react'
import { View } from 'react-native'
import { Box, Text, CheckBox } from '@src/components'
import { Anuncio } from '@src/api'
import { formatCurrency } from '@src/utils'

type SideAnuncioesProps = {
  data: Anuncio
  addSideAnuncioToBasket: (anuncio: Anuncio) => void
}

export const SideAnuncioes: React.FC<SideAnuncioesProps> = ({
  data: {},
  addSideAnuncioToBasket,
}) => {
  const onCheckBoxPress = (selectedAnuncio: Anuncio) => {
    return () => {
      addSideAnuncioToBasket(selectedAnuncio)
    }
  }

  return (
    <View>
      {sideAnuncioes?.map((section, sectionIndex) => (
        <View key={sectionIndex}>
          <Text padding='m' variant='subHeader'>
            {section.title}
          </Text>
          {section.data.map((anuncio, anuncioIndex) => (
            <Box
              key={anuncioIndex}
              backgroundColor='card'
              borderBottomWidth={anuncioIndex < section.data.length - 1 ? 1 : 0}
              borderBottomColor='border'
            >
              <CheckBox
                label={anuncio.title}
                onChange={onCheckBoxPress(anuncio)}
                rightElement={
                  <Text color='primary'>
                    {formatCurrency(parseFloat(anuncio.price))}
                  </Text>
                }
              />
            </Box>
          ))}
        </View>
      ))}
    </View>
  )
}
