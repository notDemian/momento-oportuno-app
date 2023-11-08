import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'

import { GeneralCreateAnuncioParams } from '@src/api'
import { Box, Button, NewRecursoLayout, Text, TextField } from '@src/components'
import {
  ButtonModalGenerator,
  ModalRadioButton,
} from '@src/components/ModalRadioButton'
import { useCategorias, useEstados } from '@src/hooks'
import { useUser } from '@src/hooks/useUser'
import { AccountStackParamList, ScreenProps } from '@src/navigation'
import { setInitialParams } from '@src/redux'
import { fontSize } from '@src/theme'
import { Constants, T } from '@src/utils'
import { wait } from '@src/utils/wait'

const DESC_LENGTH = 300 as const

export const NewAnuncioForm: React.FC<
  ScreenProps<AccountStackParamList, 'NewAnuncioForm'>
> = ({ navigation }) => {
  const [showCategoriaModal, setShowCategoriaModal] = useState(false)

  const hideModal = () => {
    setShowCategoriaModal(false)
  }

  const { data: estados, isLoading: loadingEstados } = useEstados(false)
  const { data: cat, isLoading: loadingCat } = useCategorias()

  const [{ id }] = useUser()

  const [params, setParams] = useState<GeneralCreateAnuncioParams>({
    title: '',
    description: '',
    category_id: 0,
    state_id: 0,
    user_id: id,
  })

  const setParamsFactory = useCallback(
    (key: keyof typeof params) => (value: string | number | boolean) => {
      if (typeof value === 'boolean')
        return setParams((p) => ({ ...p, [key]: value }))
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
      return T.error('Debes llenar todos los campos')

    if (params.description.length < 50)
      return T.error('La descripción debe tener al menos 50 caracteres')
    if (params.description.length > DESC_LENGTH)
      return T.error(
        `La descripción debe tener menos de ${DESC_LENGTH} caracteres`,
      )

    setShowCategoriaModal(true)
  }, [params])

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
              await wait(300)
              if (params.category_id == Constants.IDS.variousCategory) {
                navigation.navigate('NewAnuncioFormByCat', rest)
              }
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
              placeholder:
                'Descripción. Recuerda que la descripción es el éxito\nde tu anuncio.',
              multiline: true,
              numberOfLines: 5,
              placeholderTextColor: 'rgba(0,0,0,0.5)',
              style: {
                textAlignVertical: 'top',
              },
              maxLength: DESC_LENGTH,
              onChangeText: setParamsFactory('description'),
            }}
            required
            flex={1}
            height={'100%'}
          />
          <Text color={'gray'}>
            {params.description.length}/{DESC_LENGTH}
          </Text>
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
        {/* <CheckBox
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
        /> */}
      </Box>
    </NewRecursoLayout>
  )
}
