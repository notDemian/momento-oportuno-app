import { useCallback, useEffect, useMemo, useState } from 'react'
import { Alert, Dimensions } from 'react-native'
import { CarouselRenderItem } from 'react-native-reanimated-carousel/lib/typescript/types'
import { useDispatch } from 'react-redux'

import { GeneralCreateAnuncioParams } from '@src/api'
import {
  Box,
  Button,
  CheckBox,
  Image,
  NewRecursoLayout,
  Text,
  TextField,
} from '@src/components'
import {
  ButtonModalGenerator,
  ModalRadioButton,
} from '@src/components/ModalRadioButton'
import { useCategorias, useEstados, useUserPaquetes } from '@src/hooks'
import { useUser } from '@src/hooks/useUser'
import { AccountStackParamList, ScreenProps } from '@src/navigation'
import { setInitialParams } from '@src/redux'
import { fontSize } from '@src/theme'
import { Constants } from '@src/utils'
import { wait } from '@src/utils/wait'
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

  const { data: estados, isLoading: loadingEstados } = useEstados(false)
  const { data: cat, isLoading: loadingCat } = useCategorias()
  const { data: userPaquetes, isLoading: loadingPaq } = useUserPaquetes()

  const [{ id }] = useUser()

  const [params, setParams] = useState<GeneralCreateAnuncioParams>({
    title: '',
    description: '',
    category_id: 0,
    state_id: 0,
    user_id: id,
    includes_printing: false,
    includes_video: false,
    is_featured: false,
    includes_socials: false,
  })

  const setParamsFactory = useCallback(
    (key: keyof typeof params) => (value: string | number | boolean) => {
      if (typeof value === 'boolean')
        return setParams((p) => ({ ...p, [key]: value }))
      setParams((p) => ({ ...p, [key]: value }))
    },
    [],
  )

  const isPrintingMultiState = useMemo(() => {
    return (
      params.includes_printing && params.state_id === Constants.IDS.allStates
    )
  }, [params])

  useEffect(() => {
    if (!isPrintingMultiState) {
      return setParams((p) => ({ ...p, printing_state_id: undefined }))
    }
  }, [isPrintingMultiState])

  const dispatch = useDispatch()

  const showCategoriaModalHandler = useCallback(() => {
    if (
      params.description === '' ||
      params.title === '' ||
      params.state_id === 0
    )
      return Alert.alert('Llena los campos', 'Debes llenar todos los campos')

    if (
      isPrintingMultiState &&
      (!params.printing_state_id || params.printing_state_id === 0)
    )
      return Alert.alert(
        'Llena los campos',
        'Debes seleccionar un estado para el medio impreso',
      )

    setShowCategoriaModal(true)
  }, [params, isPrintingMultiState])

  return (
    <NewRecursoLayout
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
          onPressItem={async (item) => {
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

              setShowCategoriaModal(false)
              await wait(600)
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
          <Text color={'gray'}>{params.description.length}/700</Text>
        </Box>

        <Box flexDirection='row' alignItems='center' gap='m'>
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
                setParamsFactory('state_id')(itemFound.id)
              }}
              title='Estado'
            />
          )}
        </Box>
        <CheckBox
          label='Publicar tu anuncio en medio impreso'
          onChange={setParamsFactory('includes_printing')}
        />
        {isPrintingMultiState ? (
          <Box flexDirection='row' alignItems='center' gap='m'>
            {estados && (
              <ButtonModalGenerator
                data={estados.data
                  .filter((p) => p.id !== Constants.IDS.allStates)
                  .map((estado) => ({
                    label: estado.name,
                    value: estado.id.toString(),
                  }))}
                onPressItem={(item) => {
                  const itemFound = estados.data.find(
                    (c) => c.id.toString() === item.value.toString(),
                  )

                  if (!itemFound) return
                  setParamsFactory('printing_state_id')(itemFound.id)
                }}
                title='Medio impreso'
              />
            )}
          </Box>
        ) : null}
        <CheckBox
          label='Poner una mención de tu anuncio en Redes sociales'
          onChange={setParamsFactory('includes_socials')}
        />
        <CheckBox
          label='Destacar mi anuncio'
          onChange={setParamsFactory('is_featured')}
        />
        <CheckBox
          label='Incluir video'
          onChange={setParamsFactory('includes_video')}
        />
      </Box>
    </NewRecursoLayout>
  )
}
