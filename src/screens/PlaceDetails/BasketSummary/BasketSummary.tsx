import { Box, Button, Text } from '@src/components'
import { formatCurrency } from '@src/utils'

export const BasketSummary = () => {
  const onViewBasketButtonPress = () => {}

  return (
    <Box
      padding='m'
      backgroundColor='card'
      borderTopWidth={1}
      borderTopColor='border'
    >
      <Button isFullWidth onPress={onViewBasketButtonPress}>
        <Box
          flexDirection='row'
          alignItems='center'
          justifyContent='space-between'
        >
          <Box flexDirection='row' alignItems='center'>
            <Text fontWeight='bold' color='white' padding='xxs' marginRight='s'>
              View Basket
            </Text>
            <Text color='white'>{`${2} items`}</Text>
          </Box>
          <Text fontWeight='bold' color='white'>
            {formatCurrency(0)}
          </Text>
        </Box>
      </Button>
    </Box>
  )
}
