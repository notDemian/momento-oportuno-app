import { memo, useCallback } from 'react'
import { ListRenderItem } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { Box, Icon, List, Text } from '@src/components'
import { SvgEmptyBox } from '@src/components/svgs'
import { useAccountStackNavigation } from '@src/hooks'
import { getShadowBoxProps } from '@src/theme'
import dayjs from 'dayjs'

const MisOrdenes = () => {
  const nav = useAccountStackNavigation()

  // const { data: orders, isLoading, refetch } = useMyOrders()

  const renderItem = useCallback<ListRenderItem<any>>(({ item }) => {
    return (
      <Box
        {...getShadowBoxProps()}
        width={'100%'}
        minHeight={120}
        flexDirection={'row'}
        borderBottomColor={'orangy'}
        p={'m'}
        m={'s'}
      >
        <Box
          width={'75%'}
          justifyContent={'center'}
          backgroundColor={'transparent'}
          paddingLeft={'s'}
        >
          <Text fontWeight={'bold'}>
            {item.line_items[0].name}{' '}
            <Text color={'orangy'} fontWeight={'normal'}>
              #{`${item.id + 1}`}
            </Text>
          </Text>
          <Text>
            Creado: {dayjs(item.date_created).format('DD [de] MMMM YYYY')}
          </Text>
          <Text fontWeight={'bold'}>
            {item.currency_symbol}
            {item.total}
            <Text fontWeight={'normal'}> via {item.payment_method_title}</Text>
          </Text>
        </Box>
        <Box
          width={'25%'}
          justifyContent={'center'}
          alignItems={'center'}
          borderLeftColor={'orangy'}
          borderLeftWidth={1}
          p={'s'}
        >
          {item.status === 'completed' ? (
            <Icon type='Feather' name='check' color='green' size={30} />
          ) : item.status === 'pending' ? (
            <Icon type='MaterialIcons' name='pending' color='red' size={30} />
          ) : (
            <Icon type='Ionicons' name='close' color='red' size={30} />
          )}
        </Box>
      </Box>
    )
  }, [])

  const ListEmptyComponent = useCallback(() => {
    return (
      <Box flex={1} justifyContent='center' alignItems='center'>
        <Text variant='header' textAlign={'center'} m={'l'}>
          Aún no tienes ningún pedido
        </Text>
        <SvgEmptyBox />
        {/* <Button
          variant={'secondary'}
          label='Comprar paquete'
          margin={'l'}
          onPress={() => {
            nav.navigate('NewAnuncioForm')
          }}
        /> */}
      </Box>
    )
  }, [])

  return (
    <ScrollView>
      <List
        renderItem={renderItem}
        data={[]}
        ListEmptyComponent={ListEmptyComponent}
        ItemSeparatorComponent={() => null}
        contentContainerStyle={{ flexGrow: 1, backgroundColor: 'transparent' }}
        style={{ backgroundColor: 'transparent' }}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        // refreshControl={
        //   <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        // }
      />
    </ScrollView>
  )
}

export default memo(MisOrdenes)
