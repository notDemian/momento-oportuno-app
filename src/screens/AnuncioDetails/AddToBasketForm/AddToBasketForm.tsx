import React from 'react'

import { Box, Button, Icon,Text } from '@src/components'
import { fontSize } from '@src/theme'

type AddToBasketFormProps = {
  updateTotalDishAmount: (amount: number) => void
}

export const AddToBasketForm: React.FC<AddToBasketFormProps> = ({
  updateTotalDishAmount,
}) => {
  const [totalAmount, setTotalAmount] = React.useState(1)

  const onButtonPress = (amount: number) => {
    return () => {
      if (totalAmount === 1 && amount < 1) {
        return
      }
      const newTotalAmount = totalAmount + amount
      setTotalAmount(newTotalAmount)
      updateTotalDishAmount(newTotalAmount)
    }
  }

  return (
    <Box marginTop='m' padding='m' backgroundColor='card'>
      <Box alignItems='center' marginTop='m' marginBottom='s'>
        <Box
          width={200}
          flexDirection='row'
          justifyContent='space-evenly'
          alignItems='center'
        >
          <Button
            borderRadius='xxxl'
            variant='outline'
            onPress={onButtonPress(-1)}
          >
            <Icon
              name='remove'
              size={fontSize.l}
              width={18}
              height={18}
              isPrimary
            />
          </Button>
          <Text variant='subHeader'>{totalAmount}</Text>
          <Button
            borderRadius='xxxl'
            variant='outline'
            onPress={onButtonPress(1)}
          >
            <Icon
              name='add'
              size={fontSize.l}
              width={18}
              height={18}
              isPrimary
            />
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
