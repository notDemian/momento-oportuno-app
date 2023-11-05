import { useEffect } from 'react'
import { Alert } from 'react-native'

import { useAppDispatch } from './useAppRedux'

import { EventArg, StackActions } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { resetCart } from '@src/redux'

function usePreventNavigationOrPop({
  navToPop,
  skip,
}: {
  navToPop: NativeStackNavigationProp<any>
  skip?: (
    e: EventArg<
      'beforeRemove',
      true,
      {
        action: Readonly<{
          type: string
          payload?: object | undefined
          source?: string | undefined
          target?: string | undefined
        }>
      }
    >,
  ) => boolean
}) {
  const nav = useNavigation()
  const dispatch = useAppDispatch()

  useEffect(() => {
    const listener = nav.addListener('beforeRemove', (e) => {
      if (
        e.data.action.type === 'RESET' ||
        e.data.action.type === StackActions.popToTop().type ||
        (skip && skip(e))
      )
        return
      e.preventDefault()
      Alert.alert(
        '¿Estás seguro de que quieres salir?',
        'Serás redirigido al inicio',
        [
          {
            text: 'Permanecer',
            style: 'cancel',
            onPress: () => {},
          },
          {
            text: 'Salir',
            style: 'destructive',
            onPress: () => {
              dispatch(resetCart())
              navToPop.dispatch(StackActions.popToTop())
            },
          },
        ],
      )
    })

    return () => {
      listener()
    }
  }, [])
}

export { usePreventNavigationOrPop }
