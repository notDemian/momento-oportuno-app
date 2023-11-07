import { type FC, useCallback, useEffect, useMemo, useState } from 'react'

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
import { T } from '@src/utils'
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
  const [printing, setPrinting] = useState<Addons>()
  const dispatch = useAppDispatch()

  const [state, requestPermission] = ImagePicker.useMediaLibraryPermissions()

  useEffect(() => {
    if (!state || !state.granted) {
      requestPermission()
    }
  }, [state, requestPermission])

  const { data: addons } = useAddons()
  const addonsChecks = useMemo(
    () =>
      addons?.data?.filter(
        (a) => !a.name.includes('Imá') && !a.name.includes('impreso'),
      ),
    [addons],
  )
  const imgAddons = useMemo(
    () => addons?.data?.filter((a) => a.name.includes('Imá')),
    [addons],
  )
  const printingAddons = useMemo(
    () => addons?.data?.filter((a) => a.name.includes('impreso')),
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
            return T.error('Selecciona un paquete de imágenes')
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
    if (!video) {
      setVideoAsset(undefined)
    }
  }, [video])

  usePreventNavigationOrPop({
    navToPop: navigation,
  })

  const uploadImage = useCallback(async () => {
    if (!paquete)
      return T.error('Selecciona un paquete de imágenes para continuar')
    if (!images) return T.error('Selecciona al menos una imagen para continuar')

    const lImages = [...images]
    if (video) {
      if (videoAsset) {
        lImages.push(videoAsset)
      } else {
        return T.error('Selecciona un video para continuar')
      }
    }
    if (lImages.length === 0 || !lImages[0])
      return T.error('Selecciona al menos una imagen para continuar')

    if (images.length < paquete.quantity)
      return T.error('Selecciona todas las imágenes para continuar')
    const paqImg = addons?.data?.find((a) => a.id === paquete.id)
    const addonsData = [...selectedAddons]
    if (paqImg) addonsData.push(paqImg)
    if (printing) addonsData.push(printing)

    try {
      const { media } = await mutateAsync({
        photo: lImages,
        resourceId: id,
        type: 'listing',
      })

      dispatch(setReduxAddons(addonsData))
      T.success(`${media?.length ?? 0} archivos subidos`, {
        visibilityTime: 1000,
        onHide() {
          navigation.navigate('Packages', { id, type: 'listing' })
        },
      })
    } catch (error) {
      if (error instanceof ImageTooBigError) {
        return T.error('Una o más imágenes son muy pesadas')
      }
      T.error('Error al subir las imágenes')
    }
  }, [paquete, images, video, videoAsset, id, addons, selectedAddons, printing])

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
      <Box height={'4%'} />
      <ButtonModalGenerator
        data={
          printingAddons?.map((a) => ({
            label: a.name,
            value: a.id.toString(),
          })) ?? []
        }
        title='Selecciona tipo de impresión'
        onPressItem={(item) => {
          const paq = printingAddons?.find((a) => a.id === Number(item.value))
          if (paq) {
            setPrinting(paq)
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