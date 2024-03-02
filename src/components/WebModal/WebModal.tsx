import { memo, useState } from 'react'
import { Modal } from 'react-native'
import { Platform } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { WebView } from 'react-native-webview'
import { WebViewNavigation } from 'react-native-webview/lib/WebViewTypes'
import { ActivityIndicator, Box, Icon, Text, Touchable } from '../elements'

import { useAppTheme } from '@src/theme'

interface Props {
  url: string
  title: string
  visible: boolean
  onSuccess: (id?: number) => void
  onDismiss: () => void
  onConfirm?: () => void
  nextScreen?: () => void
}

const WebModal = ({ url, visible, onDismiss, title, onSuccess }: Props) => {
  const { colors } = useAppTheme()
  const [prog, setProg] = useState(false)
  const [progClr, setProgClr] = useState<string>(colors.black)

  const listenChanges = (navState: WebViewNavigation) => {
    // const URL_INCLUDES = ['panel/list']

    // if (URL_INCLUDES.some((u) => navState.url.includes(u))) {
    //   onSuccess()
    // }

    // extract id from the url. url look like this: /comprobante/:id, get the id and pass it to onSuccess, but ensure /comprobante/ is in the url
    const urlParts = navState.url.split('/')
    const isViewingComprobante = urlParts.includes('comprobante')
    const idIndex = urlParts.indexOf('comprobante') + 1
    const id = urlParts[idIndex]
    const isIdValid = !isNaN(Number(id)) && Number(id) > 0

    if (isViewingComprobante && isIdValid) {
      onDismiss()
      onSuccess(Number(id))
    }
  }

  return (
    <Modal
      visible={visible}
      animationType='slide'
      transparent={true}
      onRequestClose={onDismiss}
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.white,
          marginTop:
            Platform.OS === 'ios' ? getStatusBarHeight(true) : undefined,
        }}
        edges={['bottom']}
      >
        <Box position={'absolute'} bottom={0} top={0} left={0} right={0}>
          <Box
            flexDirection={'row'}
            alignItems={'center'}
            justifyContent={'space-between'}
            backgroundColor={'white'}
            zIndex={25}
            elevation={2}
          >
            {prog ? (
              <Box width={20} height={20} />
            ) : (
              <Touchable p={'m'} onPress={onDismiss}>
                <Icon
                  paddingLeft={'l'}
                  name='close'
                  size={24}
                  color={colors.secondary}
                />
              </Touchable>
            )}
            <Text textAlign={'center'} fontSize={16} color={'text'}>
              {title}
            </Text>
            <Box padding={'m'} opacity={prog ? 1 : 0}>
              <ActivityIndicator size={24} color={progClr} />
            </Box>
          </Box>
          <WebView
            source={{
              uri: url,
            }}
            style={{ flex: 1 }}
            onLoadStart={() => {
              setProg(true)
              setProgClr(colors.black)
            }}
            onLoadProgress={() => {
              setProg(true)
              setProgClr(colors.secondary)
            }}
            onLoadEnd={() => {
              setProg(false)
            }}
            onLoad={() => {
              setProg(false)
            }}
            onNavigationStateChange={(navState) => {
              listenChanges(navState)
            }}
            injectedJavaScript={`
                    window.ReactNativeWebView.postMessage("Origin: " + window.origin);
                    window.postMessage("Origin: " + window.origin);
                    true; // note: this is required
                  `}
            injectedJavaScriptBeforeContentLoaded={`
                    window.isNativeApp = true;
                    true; // note: this is required
                    `}
            onMessage={(e) => {}}
          />
        </Box>
      </SafeAreaView>
    </Modal>
  )
}

export default memo(WebModal)
