import { type FC, useCallback, useState } from 'react'
import Toast from 'react-native-toast-message'

import { ImageTooBigError } from '@src/api'
import {
  ActivityIndicator,
  Box,
  Button,
  Image,
  NewRecursoLayout,
  Text,
} from '@src/components'
import {
  useAccountStackNavigation,
  useDirectorioById,
  usePreventNavigationOrPop,
  useUploadMedias,
} from '@src/hooks'
import { DirectorioStackParamList, ScreenProps } from '@src/navigation'
import * as ImagePicker from 'expo-image-picker'

type NewDirectorioMediaScreenProps = ScreenProps<
  DirectorioStackParamList,
  'NewDirectorioMedia'
>
export const NewDirectorioMediaScreen: FC<NewDirectorioMediaScreenProps> = ({
  navigation,
  route: {
    params: { id },
  },
}) => {
  const nav = useAccountStackNavigation()

  const [image, setImage] = useState<ImagePicker.ImagePickerAsset>()

  const { data: directorio } = useDirectorioById(id)
  const { mutateAsync, isLoading } = useUploadMedias()

  const onShowImagePicker = useCallback(async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: 1,
      })
      if (!result.canceled) {
        setImage(result.assets[0])
      }
    } catch (error) {
      setImage(undefined)
    }
  }, [])

  usePreventNavigationOrPop({
    navToPop: navigation,
  })

  const uploadImage = useCallback(async () => {
    if (!image)
      return Toast.show({
        type: 'error',
        text1: 'Selecciona una imagen',
        visibilityTime: 1000,
      })

    try {
      const { media } = await mutateAsync({
        photo: [image],
        resourceId: id,
        type: 'directory',
      })

      Toast.show({
        type: 'success',
        text1: `${media?.length ?? 0} archivos subidos`,
        text2: 'Redireccionando...',
        visibilityTime: 1000,
        onHide() {
          navigation.reset({
            routes: [{ name: 'Directorio' }],
          })
          nav.jumpTo('AccountTab', {
            screen: 'Packages',
            params: { id, type: 'directory' },
            initial: false,
          })
        },
      })
    } catch (error) {
      if (error instanceof ImageTooBigError) {
        return Toast.show({
          type: 'error',
          text1: 'La imágen es muy grande',
          visibilityTime: 1000,
        })
      }
      Toast.show({
        type: 'error',
        text1: 'Error al subir archivos',
        visibilityTime: 1000,
      })
    }
  }, [image, id])

  return (
    <NewRecursoLayout
      title='Imágenes y video'
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
          />
        </Box>
      }
    >
      <Text variant={'subHeader'} textAlign={'center'}>
        Nombre del directorio: {directorio?.data.title ?? <ActivityIndicator />}
      </Text>
      <Button
        label='Seleccionar imágen'
        onPress={onShowImagePicker}
        paddingVertical={'m'}
      />

      <Box gap={'m'} marginVertical={'m'}>
        {image ? (
          <Image
            key={image.uri}
            source={{ uri: image.uri }}
            width={100}
            height={100}
          />
        ) : null}
      </Box>
    </NewRecursoLayout>
  )
}
