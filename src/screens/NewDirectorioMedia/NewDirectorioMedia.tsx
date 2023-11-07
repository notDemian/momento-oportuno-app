import { type FC, useCallback, useState } from 'react'

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
import { T } from '@src/utils'
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
      const result = await ImagePicker.launchImageLibraryAsync({
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
    if (!image) return T.error('Selecciona una imágen')

    try {
      const { media } = await mutateAsync({
        photo: [image],
        resourceId: id,
        type: 'directory',
      })

      T.success(`${media?.length ?? 0} archivos subidos`)
      navigation.reset({
        routes: [{ name: 'Directorio' }],
      })
      nav.jumpTo('AccountTab', {
        screen: 'Packages',
        params: { id, type: 'directory' },
        initial: false,
      })
    } catch (error) {
      if (error instanceof ImageTooBigError) {
        return T.error('La imágen es muy grande')
      }
      T.error('Ocurrió un error al subir la imágen')
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
