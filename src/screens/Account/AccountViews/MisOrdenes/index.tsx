import { memo, useCallback, useMemo } from 'react'
import { ListRenderItem } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { Order } from '@src/api'
import {
  Box,
  Icon,
  List,
  LoadingPageModal,
  RefreshControl,
  Text,
  Touchable,
} from '@src/components'
import { SvgEmptyBox } from '@src/components/svgs'
import { useAccountStackNavigation, useGetMyOrders } from '@src/hooks'
import { getShadowBoxProps } from '@src/theme'
import { formatCurrency } from '@src/utils'
import { formatSpanish } from '@src/utils/dates'
import dayjs from 'dayjs'
import es from 'dayjs/locale/es'
es
dayjs.locale('es')

const MisOrdenes = () => {
  const nav = useAccountStackNavigation()

  const { data: orders, isLoading, refetch } = useGetMyOrders()
  const ordersSorted = useMemo(() => {
    if (!orders?.data) return []
    return orders.data.sort((a, b) => {
      return dayjs(b.created_at).unix() - dayjs(a.created_at).unix()
    })
  }, [orders?.data])

  const handleOnPress = useCallback(
    (order: Order) => () => {
      if (order.status === 'failed') return
      nav.navigate('PaymentConfirmation', { id: order.id })
    },
    [],
  )

  const renderItem = useCallback<ListRenderItem<Order>>(({ item }) => {
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
          paddingHorizontal={'s'}
        >
          <Text fontWeight={'bold'}>
            {item.title}{' '}
            <Text color={'orangy'} fontWeight={'normal'}>
              #{`${item.id + 1}`}
            </Text>
          </Text>
          {item.created_at ? (
            <Text>
              Creado:{' '}
              {formatSpanish(item.created_at, {
                format: 'DD [de] MMMM YYYY',
              })}
            </Text>
          ) : null}
          <Text fontWeight={'bold'}>
            {formatCurrency(item.total)}
            <Text fontWeight={'normal'}> via {item.payment_method}</Text>
          </Text>
        </Box>
        <Touchable
          onPress={handleOnPress(item)}
          alignItems={'center'}
          borderLeftColor={'orangy'}
          borderLeftWidth={1}
          p={'s'}
          borderRadius={'m'}
          withoutFeedback
        >
          <Box
            width={'25%'}
            justifyContent={'center'}
            alignItems={'center'}
            borderLeftColor={'orangy'}
            borderLeftWidth={1}
            p={'s'}
          >
            {item.status === 'completed' || item.status === 'paid' ? (
              <Icon type='Feather' name='check' color='green' size={30} />
            ) : item.status === 'pending' ? (
              <Icon
                type='MaterialIcons'
                name='pending'
                color='gray'
                size={30}
              />
            ) : (
              <Icon type='Ionicons' name='close' color='red' size={30} />
            )}
          </Box>
        </Touchable>
      </Box>
    )
  }, [])

  const ListEmptyComponent = useCallback(() => {
    return (
      <Box flex={1} justifyContent='center' alignItems='center'>
        <Text variant='header' textAlign={'center'} m={'l'}>
          Aún no tienes ninguna orden
        </Text>
        <SvgEmptyBox />
      </Box>
    )
  }, [])

  return (
    <ScrollView>
      {ordersSorted && !isLoading ? (
        <List
          renderItem={renderItem}
          data={ordersSorted}
          ListEmptyComponent={ListEmptyComponent}
          ItemSeparatorComponent={() => null}
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: 'transparent',
          }}
          style={{ backgroundColor: 'transparent' }}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={refetch} />
          }
        />
      ) : (
        <LoadingPageModal loading={isLoading} />
      )}
    </ScrollView>
  )
}

export default memo(MisOrdenes)
