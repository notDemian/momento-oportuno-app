import { useCallback, useState } from 'react'
import { Dimensions } from 'react-native'
import { CarouselRenderItem } from 'react-native-reanimated-carousel/lib/typescript/types'

import { Estado } from '@src/api'
import {
  Box,
  Button,
  Carousel,
  Image,
  NewAnucioLayout,
  Text,
  TextField,
} from '@src/components'
import { ModalRadioButton } from '@src/components/ModalRadioButton'
import { useCategorias, useEstados } from '@src/hooks'
import { AccountStackParamList, ScreenProps } from '@src/navigation'
import { fontSize } from '@src/theme'
import * as ImagePicker from 'expo-image-picker'

export const NewAnuncioForm: React.FC<
  ScreenProps<AccountStackParamList, 'NewAnuncioForm'>
> = ({ navigation }) => {
  const [showCiudadModal, setShowCiudadModal] = useState(false)
  const [selectedCiudad, setSelectedCiudad] = useState<Estado>()
  const [showCategoriaModal, setShowCategoriaModal] = useState(false)

  const [images, setImages] = useState<ImagePicker.ImagePickerAsset[]>([])

  const onShowImagePicker = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        // base64: true,
        selectionLimit: 3,
      })
      if (!result.canceled) {
        setImages(result.assets.splice(0, 3))
      }
    } catch (error) {
      setImages([])
    }
  }, [])

  const onCleanImages = useCallback(() => {
    setImages([])
  }, [])

  const renderItemImage = useCallback<
    CarouselRenderItem<ImagePicker.ImagePickerAsset>
  >((image) => {
    return (
      <Box
        margin={'m'}
        borderRadius={'m'}
        overflow={'hidden'}
        backgroundColor={'white'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Image
          source={{ uri: image.item.uri }}
          width={Dimensions.get('window').width}
          height={(Dimensions.get('window').width * 16) / 9}
          contentPosition={'center'}
        />
      </Box>
    )
  }, [])

  const hideModal = useCallback(() => {
    setShowCiudadModal(false)
    setShowCategoriaModal(false)
  }, [])

  const showCiudadModalHandler = useCallback(() => {
    setShowCiudadModal(true)
  }, [])

  const showCategoriaModalHandler = useCallback(() => {
    setShowCategoriaModal(true)
  }, [])

  const { data: estados, isLoading: loadingEstados } = useEstados()
  const { data: cat, isLoading: loadingCat } = useCategorias()

  return (
    <NewAnucioLayout
      title='Detalles generales'
      footer={
        <Button
          label='Continuar'
          isFullWidth
          isDisabled={loadingEstados || loadingCat}
          onPress={showCategoriaModalHandler}
        />
      }
    >
      {!loadingEstados && estados ? (
        <ModalRadioButton
          isVisible={showCiudadModal}
          data={estados.map((estado) => ({
            label: estado.name,
            value: estado.id,
          }))}
          hideModal={hideModal}
          title='Selecciona tu estado'
          onPressItem={(item) => {
            const itemFound = estados.find((c) => c.id === item.value)
            if (!itemFound) return
            setSelectedCiudad(itemFound)
          }}
        />
      ) : null}
      {!loadingCat && cat ? (
        <ModalRadioButton
          isVisible={showCategoriaModal}
          data={cat.map((cat) => ({
            label: cat.name,
            value: cat.id,
          }))}
          hideModal={hideModal}
          title='Para continuar, selecciona la categoría de tu publicación'
          onPressItem={(item) => {
            setShowCategoriaModal(false)
            const catFound = cat.find((c) => c.id === item.value)
            if (catFound) {
              navigation.navigate('NewAnuncioFormByCat', catFound)
            }
          }}
        />
      ) : null}
      <Box marginTop='m' gap={'m'}>
        <TextField
          inputProps={{
            placeholder: 'Nombre de la Publicación',
          }}
          required
        />

        <Box
          flexDirection='row'
          justifyContent='space-between'
          alignItems='center'
          gap='m'
        >
          <TextField
            inputProps={{
              placeholder: 'Precio (MXN)',
              keyboardType: 'numeric',
            }}
            required
            width={'45%'}
          />
          <Box width={'50%'}>
            <Button
              variant='secondary'
              onPress={showCiudadModalHandler}
              flex={1}
              isDisabled={loadingEstados}
              label={selectedCiudad?.name || 'Seleccionar ciudad'}
              isModal
            />
          </Box>
        </Box>
        <Box height={fontSize.xxxl * 5}>
          <TextField
            inputProps={{
              placeholder: 'Descripción',
              multiline: true,
              numberOfLines: 5,
              placeholderTextColor: 'rgba(0,0,0,0.5)',
              style: {
                textAlignVertical: 'top',
              },
            }}
            required
            flex={1}
            height={'100%'}
          />
        </Box>
        <Text variant={'subHeader'}>Imágenes</Text>
        {images.length > 0 ? (
          <>
            <Carousel
              data={images}
              renderItem={renderItemImage}
              width={Dimensions.get('window').width}
              height={Dimensions.get('window').width * 1.4}
              numItemsPerSlide={1.2}
              vertical={false}
            />

            <Button
              variant='transparent'
              onPress={onCleanImages}
              flex={1}
              label={'Borrar imágenes'}
              isFullWidth
            />
          </>
        ) : (
          <Box flexDirection='row' gap='m'>
            <Button
              variant='secondary'
              onPress={onShowImagePicker}
              flex={1}
              label={'Abrir galería'}
              isFullWidth
            />
          </Box>
        )}
      </Box>
    </NewAnucioLayout>
  )
}
