import { Dimensions } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { ListingsByMicrosite } from './ListingsByMicrosite'

import { Images } from '@src/assets/index'
import {
  Box,
  Icon,
  Image,
  LoadingPageModal,
  Text,
  Touchable,
} from '@src/components'
import { useMicrositio } from '@src/hooks'
import { MicrositiosStackParamList, ScreenProps } from '@src/navigation'
import { fontSize, getShadowBoxProps } from '@src/theme'
import { callPhone, getImageUrl, redirectToWhatsapp, T } from '@src/utils'
import { toRelative } from '@src/utils/dates'

type MicrositioByIdProps = ScreenProps<
  MicrositiosStackParamList,
  'MicrositioById'
>

const width = Dimensions.get('window').width

export const MicrositioById: React.FC<MicrositioByIdProps> = ({
  navigation,
  route: {
    params: { id },
  },
}) => {
  const { data: { data } = {}, isLoading, isSuccess } = useMicrositio(id)

  const handleWA = () => {
    if (!data?.phone) return
    redirectToWhatsapp(data.phone)
  }

  const handlePhone = () => {
    if (!data?.phone) return
    callPhone(data.phone)
  }

  const handleMessage = () => {
    // TODO: IMPLEMENT sendMessage
    // navigation.navigate('Chat', { id: 1 })
    T.success('Mensaje enviado', {
      text2: 'Su mensaje ha sido enviado con éxito',
      onHide: () => navigation.goBack(),
    })
  }

  if (isLoading || !isSuccess || !data) return <LoadingPageModal loading />

  return (
    <KeyboardAwareScrollView contentContainerStyle={{}}>
      <Box
        flex={1}
        alignItems={'center'}
        p={'m'}
        justifyContent={'flex-start'}
        g='m'
      >
        <Box alignItems={'center'}>
          <Image
            source={Images.svgFondo}
            width={width}
            height={120}
            contentFit='fill'
            marginBottom={'xxl'}
          />
          <Image
            source={{
              uri: getImageUrl({
                str: data.thumbnail,
                media: data.media?.[0],
              }),
            }}
            width={120}
            height={120}
            borderRadius={'xxxl'}
            position={'absolute'}
            top={60}
          />
          <Text textAlign={'center'} variant={'header'} color={'secondary'}>
            {data.title}
          </Text>
        </Box>
        <Box flexDirection={'row'} p={'s'} paddingHorizontal={'l'} g='xxl'>
          <Box width={'30%'} flexDirection={'row'} g={'s'}>
            <Icon type='FontAwesome5' name='user-circle' size={20} />
            <Text fontSize={fontSize.s}>
              Miembro desde {toRelative(data.created_at)}
            </Text>
          </Box>
          {data.address ? (
            <Box width={'60%'} flexDirection={'row'} g={'s'}>
              <Icon type='FontAwesome5' name='map-marker-alt' size={20} />
              <Text fontSize={fontSize.s}>{data.address}</Text>
            </Box>
          ) : null}
        </Box>
        <Box flexDirection={'row'} g={'s'} p={'xl'}>
          <Touchable onPress={handlePhone}>
            <Box
              {...getShadowBoxProps()}
              borderColor={'creamy'}
              borderWidth={1}
              width={'75%'}
              borderRadius={'m'}
              flexDirection={'row'}
              justifyContent={'space-evenly'}
              alignItems={'center'}
              p={'s'}
              backgroundColor={'white'}
            >
              <Box
                borderRadius={'xxxl'}
                borderColor={'creamy'}
                borderWidth={2}
                p={'s'}
              >
                <Icon type='MaterialIcons' name='phone-android' />
              </Box>
              <Text>{data.phone}</Text>
            </Box>
          </Touchable>
          <Touchable onPress={handleWA}>
            <Box
              {...getShadowBoxProps()}
              borderColor={'creamy'}
              borderWidth={1}
              width={'25%'}
              borderRadius={'m'}
              justifyContent={'center'}
              backgroundColor={'white'}
              alignItems={'center'}
              p={'s'}
            >
              <Box
                borderRadius={'xxxl'}
                borderColor={'creamy'}
                borderWidth={2}
                p={'s'}
              >
                <Icon type='MaterialCommunityIcons' name='whatsapp' size={35} />
              </Box>
            </Box>
          </Touchable>
        </Box>
        <Box flex={1} width={'100%'} p={'m'}>
          <ListingsByMicrosite user={data.user} name={data.title} />
        </Box>
        {/* <Box
          backgroundColor={'creamy'}
          flex={1}
          width={'100%'}
          p={'m'}
          borderRadius={'l'}
          g={'m'}
        >
          <Text variant={'header'} color={'text'} textAlign={'center'}>
            Enviar un mensaje
          </Text>
          <TextField
            inputProps={{
              placeholder: 'Escriba su mensaje aquí...',
              multiline: true,
              numberOfLines: 5,
              placeholderTextColor: 'rgba(0,0,0,0.5)',
              style: {
                textAlignVertical: 'top',
              },
            }}
            flex={1}
            height={'100%'}
          />
          <Button label='Enviar mensaje' onPress={handleMessage} />
        </Box> */}
      </Box>
    </KeyboardAwareScrollView>
  )
}
