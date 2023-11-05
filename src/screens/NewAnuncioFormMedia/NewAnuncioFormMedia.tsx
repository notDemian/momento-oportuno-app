import { type FC, useCallback, useEffect, useMemo, useState } from 'react'
import Toast from 'react-native-toast-message'

import { AddonsComponent } from './Addons'

import { Addons, ImageTooBigError } from '@src/api'
import { Box, Button, Image, NewRecursoLayout, Text } from '@src/components'
import { ButtonModalGenerator } from '@src/components/ModalRadioButton'
import {
  useAddons,
  useAnuncioByid,
  useAppDispatch,
  usePreventNavigationOrPop,
  useUploadMedias,
} from '@src/hooks'
import { AccountStackParamList, ScreenProps } from '@src/navigation'
import { setAddons as setReduxAddons } from '@src/redux/cart'
import { fontSize } from '@src/theme'
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
  id: number
}

export const NewAnuncioFormMediaScreen: FC<NewAnuncioFormMediaScreenProps> = ({
  navigation,
  route: {
    params: { id },
  },
}) => {
  const [paquete, setPaquete] = useState<PaqueteMedia>()
  const dispatch = useAppDispatch()

  const { data: addons } = useAddons()
  const addonsChecks = useMemo(
    () => addons?.data?.filter((a) => !a.name.includes('Imá')),
    [addons],
  )
  const imgAddons = useMemo(
    () => addons?.data?.filter((a) => a.name.includes('Imá')),
    [addons],
  )
  const [selectedAddons, setSelectedAddons] = useState<Addons[]>([])
  const video = useMemo(
    () =>
      Boolean(
        selectedAddons?.some((a) => a.name.toLowerCase().includes('video')),
      ),
    [selectedAddons],
  )

  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([])
  const [videoAsset, setVideoAsset] = useState<ImagePicker.ImagePickerAsset>()

  const { data: ad } = useAnuncioByid(id, true)
  const { mutateAsync, isLoading } = useUploadMedias()

  const onShowImagePicker = useCallback(
    (imgOrVid: 'img' | 'vid' = 'img') =>
      async () => {
        try {
          if (imgOrVid === 'img' && paquete) {
            setImages([])
            const result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsMultipleSelection: true,
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
          } else {
            return Toast.show({
              type: 'error',
              text1: 'Selecciona un paquete de imágenes',
              visibilityTime: 1000,
            })
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

  usePreventNavigationOrPop({
    navToPop: navigation,
  })

  const uploadImage = useCallback(async () => {
    if (!paquete)
      return Toast.show({
        type: 'error',
        text1: 'Selecciona un paquete de imágenes',
        visibilityTime: 1000,
      })
    if (!images)
      return Toast.show({
        type: 'error',
        text1: 'Selecciona al menos una imagen',
        visibilityTime: 1000,
      })

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
        text1: 'Selecciona al menos una imagen',
        visibilityTime: 1000,
      })

    if (images.length < paquete.quantity)
      return Toast.show({
        type: 'error',
        text1: 'Selecciona todas las imágenes',
        visibilityTime: 1000,
      })

    try {
      const { media } = await mutateAsync({
        photo: lImages,
        resourceId: id,
        type: 'listing',
      })

      dispatch(setReduxAddons(selectedAddons))
      Toast.show({
        type: 'success',
        text1: `${media?.length ?? 0} archivos subidos`,
        text2: 'Redireccionando...',
        visibilityTime: 1000,
        onHide() {
          navigation.navigate('Packages', { id, type: 'listing' })
        },
      })
    } catch (error) {
      if (error instanceof ImageTooBigError) {
        return Toast.show({
          type: 'error',
          text1: 'Una o más imágenes son muy grandes',
          visibilityTime: 1000,
        })
      }
      Toast.show({
        type: 'error',
        text1: 'Error al subir archivos',
        visibilityTime: 1000,
      })
    }
  }, [paquete, images, video, videoAsset, id])

  return (
    <NewRecursoLayout
      title='Addons'
      footer={
        <Box
          flexDirection={'column'}
          justifyContent={'flex-end'}
          alignContent={'flex-end'}
          gap={'xs'}
        >
          <Button
            label='Continuar'
            isFullWidth
            onPress={uploadImage}
            isDisabled={isLoading}
            // onPress={showCategoriaModalHandler}
          />
        </Box>
      }
    >
      {/* <Text>{JSON.stringify([...selectedAddons, paquete], null, 2)}</Text> */}
      <AddonsComponent
        addons={addonsChecks}
        setSelectedAddons={setSelectedAddons}
      />
      <ButtonModalGenerator
        data={
          imgAddons?.map((a) => ({
            label: a.name,
            value: a.id.toString(),
          })) ?? []
        }
        title='Selecciona cantidad de imágenes'
        onPressItem={(item) => {
          const paq = imgAddons?.find((a) => a.id === Number(item.value))
          if (paq && paq.name.split(' ')[0]) {
            const data = {
              id: paq.id,
              title: paq.name,
              quantity: isNaN(Number(paq.name.split(' ')[0]))
                ? 0
                : Number(paq.name.split(' ')[0]),
            }
            setPaquete(data)
          }
        }}
      />
      {paquete || video ? (
        <Text color={'orangy'} marginTop={'m'} variant={'header'}>
          Carga tus archivos
        </Text>
      ) : null}
      {paquete ? (
        <Button
          label='Seleccionar imágenes'
          onPress={onShowImagePicker()}
          paddingVertical={'m'}
        />
      ) : null}
      {video ? (
        <Button label='Seleccionar video' onPress={onShowImagePicker('vid')} />
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
        <Text color={'gray'} fontSize={fontSize.s}>
          *Verás los precios después de seleccionar tu paquete
        </Text>
      </Box>
    </NewRecursoLayout>
  )
}
