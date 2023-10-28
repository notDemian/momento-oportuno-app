import { type FC, useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native'
import Toast from 'react-native-toast-message'

import { Box, Button, Image, NewAnucioLayout, Text } from '@src/components'
import { ButtonModalGenerator } from '@src/components/ModalRadioButton'
import { useAnuncioByid, useUploadMedias } from '@src/hooks'
import { AccountStackParamList, ScreenProps } from '@src/navigation'
import * as ImagePicker from 'expo-image-picker'

type NewAnuncioFormMediaScreenProps = ScreenProps<
  AccountStackParamList,
  'NewAnuncioFormMedia'
>

// 3 sin costo
// 5 +50
// 10 +100
// video +50

interface PaqueteMedia {
  title: string
  quantity: number
  price: number
  id: number
}

const paquetes_imgs: PaqueteMedia[] = [
  {
    title: '3 imágenes sin costo',
    quantity: 3,
    price: 0,
    id: 0,
  },
  {
    title: '5 imágenes',
    quantity: 5,
    price: 50,
    id: 1,
  },
  {
    title: '10 imágenes',
    quantity: 10,
    price: 100,
    id: 2,
  },
]

const videoItem: PaqueteMedia = {
  title: 'Video',
  quantity: 1,
  price: 50,
  id: 3,
}

const paqs_radio = paquetes_imgs.map((p) => ({
  label: `${p.title} $${p.price}`,
  value: p.id.toString(),
}))

export const NewAnuncioFormMediaScreen: FC<NewAnuncioFormMediaScreenProps> = ({
  navigation,
  route: {
    params: { id },
  },
}) => {
  const [paquete, setPaquete] = useState<PaqueteMedia>()

  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([])
  const [videoAsset, setVideoAsset] = useState<ImagePicker.ImagePickerAsset>()

  const { data: ad } = useAnuncioByid(id)
  const { mutateAsync, isLoading } = useUploadMedias()

  //FIXME: change it to includes_video
  const video = ad?.data.is_featured

  const onShowImagePicker = useCallback(
    (imgOrVid: 'img' | 'vid' = 'img') =>
      async () => {
        try {
          if (imgOrVid === 'img' && paquete) {
            setImages([])
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsMultipleSelection: true,
              // base64: true,
              selectionLimit: paquete.quantity,
            })
            if (!result.canceled) {
              setImages(result.assets.splice(0, paquete.quantity))
            }
          } else if (imgOrVid === 'vid' && video) {
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Videos,
              allowsMultipleSelection: false,
              selectionLimit: 1,
            })
            if (!result.canceled) {
              if (!result.assets?.[0]) return
              setVideoAsset(result.assets[0])
            }
          }
        } catch (error) {
          setImages([])
          setVideoAsset(undefined)
        }
      },
    [paquete, video],
  )

  useEffect(() => {
    if (!paquete) {
      setImages([])
    } else {
      setImages((l) => {
        if (l.length > paquete.quantity) {
          return l.splice(0, paquete.quantity)
        }
        return l
      })
    }
  }, [paquete])

  useEffect(() => {
    const listener = navigation.addListener('beforeRemove', (e) => {
      e.preventDefault()
      Alert.alert(
        '¿Estás seguro de que quieres salir?',
        'Si sales ahora, tu anuncio no se guardará.',
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
              navigation.dispatch(e.data.action)
            },
          },
        ],
      )
    })

    return () => {
      listener()
    }
  }, [])

  const uploadImage = useCallback(async () => {
    if (!paquete) return Alert.alert('Selecciona un paquete')
    if (!images) return Alert.alert('Selecciona imágenes')
    const lImages = [...images]
    if (video) {
      if (videoAsset) {
        lImages.push(videoAsset)
      } else {
        return Toast.show({
          type: 'error',
          text1: 'Selecciona un video',
          visibilityTime: 1000,
        })
      }
    }
    if (lImages.length === 0 || !lImages[0])
      return Toast.show({
        type: 'error',
        text1: 'Selecciona al menos una imagen o video',
        visibilityTime: 1000,
      })
    try {
      await mutateAsync({
        //FIXME: cambiar esto, debe enviar toda la media
        photo: lImages[0],
        resourceId: id,
        type: 'listing',
      })
      Toast.show({
        type: 'success',
        text1: 'Archivos subidos',
        text2: 'Redireccionando...',
        visibilityTime: 1000,
        onHide() {
          navigation.navigate('Packages', { id, type: 'listing' })
        },
      })
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error al subir archivos',
        visibilityTime: 1000,
      })
    }

    // finally
    // Toast.show({
    //   type: 'info',
    //   text1: 'Archivos subidos',
    //   visibilityTime: 1000,
    //   onHide() {
    //     navigation.navigate('Packages')
    //   },
    // })
  }, [images, video, videoAsset, id])

  return (
    <NewAnucioLayout
      title='Imágenes y video'
      footer={
        <Box
          flexDirection={'column'}
          justifyContent={'flex-end'}
          alignContent={'flex-end'}
          gap={'xs'}
        >
          {paquete ? (
            <Box
              flexDirection={'row'}
              width={'100%'}
              justifyContent={'space-between'}
              paddingHorizontal={'l'}
            >
              <Text>{paquete.title}</Text>
              <Text>$ {paquete.price} MXN</Text>
            </Box>
          ) : null}
          {video ? (
            <Box
              flexDirection={'row'}
              width={'100%'}
              justifyContent={'space-between'}
              paddingHorizontal={'l'}
            >
              <Text>{videoItem.title}</Text>
              <Text>$ {videoItem.price} MXN</Text>
            </Box>
          ) : null}
          {paquete || video ? (
            <>
              <Box
                flexDirection={'row'}
                width={'100%'}
                justifyContent={'space-between'}
                paddingHorizontal={'l'}
              >
                <Text>Total</Text>
                <Text>
                  $ {(video ? videoItem.price : 0) + (paquete?.price ?? 0)} MXN
                </Text>
              </Box>
              <Box paddingHorizontal={'l'}>
                <Text color={'gray'}>
                  *El precio incluye IVA y se cobrará en pesos mexicanos
                </Text>
              </Box>
            </>
          ) : null}
          <Button
            label='Continuar'
            isFullWidth
            onPress={uploadImage}
            isDisabled={isLoading}
            // isDisabled={loadingEstados || loadingCat}
            // onPress={showCategoriaModalHandler}
          />
        </Box>
      }
    >
      <ButtonModalGenerator
        data={paqs_radio}
        title='Imágenes'
        onPressItem={(item) => {
          const paq = paquetes_imgs.find((p) => p.id.toString() === item.value)
          if (paq) {
            setPaquete(paq)
          }
        }}
      />
      {paquete ? (
        <Button label='Seleccionar imágenes' onPress={onShowImagePicker()} />
      ) : null}
      {video ? (
        <Button
          label='Seleccionar video'
          onPress={onShowImagePicker('vid')}
          marginTop={'m'}
        />
      ) : null}
      <Box gap={'m'} marginVertical={'m'}>
        {images.length > 0 ? (
          <>
            <Text color={'orangy'}>Imágenes</Text>
            <Box flexDirection={'row'} flexWrap={'wrap'} gap={'m'}>
              {images.map((img) => (
                <Image
                  key={img.uri}
                  source={{ uri: img.uri }}
                  width={100}
                  height={100}
                />
              ))}
            </Box>
          </>
        ) : null}
        {videoAsset ? (
          <>
            <Text color={'orangy'}>Video</Text>
            <Box flexDirection={'row'} flexWrap={'wrap'} gap={'m'}>
              <Image
                source={{ uri: videoAsset.uri }}
                width={100}
                height={100}
              />
            </Box>
          </>
        ) : null}
      </Box>
    </NewAnucioLayout>
  )
}
