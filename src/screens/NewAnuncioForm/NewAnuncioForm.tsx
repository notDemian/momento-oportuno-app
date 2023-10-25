import { useCallback, useState } from 'react'
import { Alert, Dimensions } from 'react-native'
import { CarouselRenderItem } from 'react-native-reanimated-carousel/lib/typescript/types'
import { useDispatch } from 'react-redux'

import { GeneralCreateAnuncioParams } from '@src/api'
import { Box, Button, Image, NewAnucioLayout, TextField } from '@src/components'
import {
  ButtonModalGenerator,
  ModalRadioButton,
} from '@src/components/ModalRadioButton'
import { useCategorias, useEstados, useUserPaquetes } from '@src/hooks'
import { useUser } from '@src/hooks/useUser'
import { AccountStackParamList, ScreenProps } from '@src/navigation'
import { setInitialParams } from '@src/redux'
import { fontSize } from '@src/theme'
import * as ImagePicker from 'expo-image-picker'

export const NewAnuncioForm: React.FC<
  ScreenProps<AccountStackParamList, 'NewAnuncioForm'>
> = ({ navigation }) => {
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

  const onCleanImages = () => {
    setImages([])
  }

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

  const hideModal = () => {
    setShowCategoriaModal(false)
  }

  const { data: estados, isLoading: loadingEstados } = useEstados()
  const { data: cat, isLoading: loadingCat } = useCategorias()
  const { data: userPaquetes, isLoading: loadingPaq } = useUserPaquetes()

  const [{ id }] = useUser()

  const [params, setParams] = useState<GeneralCreateAnuncioParams>({
    title: '',
    description: '',
    category_id: 0,
    state_id: 0,
    user_id: id,
  })

  const setParamsFactory = useCallback(
    (key: keyof typeof params) => (value: string) => {
      setParams((p) => ({ ...p, [key]: value }))
    },
    [],
  )

  const dispatch = useDispatch()

  const showCategoriaModalHandler = useCallback(() => {
    if (
      params.description === '' ||
      params.title === '' ||
      params.state_id === 0
    )
      return Alert.alert('Llena los campos', 'Debes llenar todos los campos')
    setShowCategoriaModal(true)
  }, [params])

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
      {!loadingCat && cat ? (
        <ModalRadioButton
          isVisible={showCategoriaModal}
          data={cat.data.map((cat) => ({
            label: cat.name,
            value: cat.id,
          }))}
          hideModal={hideModal}
          title='Para continuar, selecciona la categoría de tu publicación'
          onPressItem={(item) => {
            setShowCategoriaModal(false)
            const catFound = cat.data.find((c) => c.id === item.value)
            if (catFound) {
              dispatch(
                setInitialParams({
                  ...params,
                  category_id: catFound.id,
                }),
              )
              const { children: _, ...rest } = catFound

              navigation.navigate('NewAnuncioFormByCat', rest)
            }
          }}
        />
      ) : null}
      <Box marginTop='m' gap={'m'}>
        <TextField
          inputProps={{
            placeholder: 'Nombre de la Publicación',
            onChangeText: setParamsFactory('title'),
          }}
          required
        />

        <Box
          flexDirection='row'
          // justifyContent='space-between'
          alignItems='center'
          gap='m'
        >
          {estados && (
            <ButtonModalGenerator
              data={estados.data.map((estado) => ({
                label: estado.name,
                value: estado.id.toString(),
              }))}
              onPressItem={(item) => {
                const itemFound = estados.data.find(
                  (c) => c.id.toString() === item.value.toString(),
                )

                if (!itemFound) return
                setParamsFactory('state_id')(itemFound.id.toString())
              }}
              title='Estado'
            />
          )}
        </Box>
        {/* <Box flexDirection='row' alignItems='center' gap='m'>
          {!loadingPaq &&
            userPaquetes &&
            (userPaquetes.data.length > 0 ? (
              <ButtonModalGenerator
                data={userPaquetes.data.map((paquete) => ({
                  label: paquete.name,
                  value: paquete.id.toString(),
                }))}
                onPressItem={(item) => {
                  setParamsFactory('')(item.value.toString())
                }}
                title='Paquete'
              />
            ) : (
              <Button
                label='Comprar paquete'
                onPress={() => navigation.navigate('Package')}
              />
            ))}
        </Box> */}
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
              onChangeText: setParamsFactory('description'),
            }}
            required
            flex={1}
            height={'100%'}
          />
        </Box>
      </Box>
    </NewAnucioLayout>
  )
}
