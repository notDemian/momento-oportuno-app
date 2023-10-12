import { useCallback, useState } from 'react'
import { FC } from 'react'
import { Alert } from 'react-native'

import { ExtraContent } from './ExtraContent'

import {
  Attributes,
  Categoria,
  createAnuncioParams,
  FieldSchema,
} from '@src/api'
import { Box, Button, NewAnucioLayout, TextField } from '@src/components'
import { ModalRadioButton } from '@src/components/ModalRadioButton'
import {
  useAppSelector,
  useCategorias,
  useCreateAnuncio,
  useFields,
} from '@src/hooks'
import { AccountStackParamList, ScreenProps } from '@src/navigation'
import { CLOG, Constants } from '@src/utils'

export const NewAnuncioFormByCat: FC<
  ScreenProps<AccountStackParamList, 'NewAnuncioFormByCat'>
> = ({ route: { params }, navigation }) => {
  const { data: subCat, isLoading: loadingSubCat } = useCategorias(params.id)

  const [showSubCategoriaModal, setShowSubCategoriaModal] = useState(false)
  const [subCategoriaSelected, setSubCategoriaSelected] = useState<Categoria>()

  const [selectedItems, setSelectedItems] = useState<
    Array<{
      id: number
      value: NonNullable<FieldSchema['terms']>[number] | undefined
    }>
  >([])

  const [inputs, setInputs] = useState<
    Array<{
      id: number
      value: string
    }>
  >([])

  const { data: fields, isSuccess: fieldsLoaded } = useFields(params.id)
  const renderPrice = !fields?.some((f) => f.type === 'salary')
  const [price, setPrice] = useState(0)
  const prevparams = useAppSelector((s) => s.cart.createAnuncioParams)
  const { mutateAsync, isLoading } = useCreateAnuncio()

  const onContinue = useCallback(async () => {
    if (!subCategoriaSelected)
      return Alert.alert('Error', 'Selecciona una subcategoría')
    const fromInputs: Attributes[] = [
      ...inputs,
      ...selectedItems,
      {
        id: Constants.IDS.Listivo_14,
        value: [
          {
            dependencies: [],
            hasMultilevelChildren: false,
            id: params.id,
            key: `listivo_${params.id}`,
            name: params.name,
            parent: params.parent,
            searchFormPlaceholder: '',
            parentTermIds: [],
          },
          {
            dependencies: [],
            hasMultilevelChildren: false,
            id: subCategoriaSelected.id,
            key: `listivo_${subCategoriaSelected.id}`,
            name: subCategoriaSelected.name,
            parent: subCategoriaSelected.parent,
            searchFormPlaceholder: '',
            parentTermIds: [],
          },
        ],
      },
    ]

    if (renderPrice)
      fromInputs.push({
        id: Constants.IDS.Listivo_130,
        value: {
          listivo_130_listivo_459: price.toString(),
        },
      })

    const data: createAnuncioParams = {
      model: {
        name: prevparams.name,
        description: prevparams.description,
        packageId: prevparams.packageId,
        attributes: fromInputs,
      },
    }
    CLOG({ data })
    // return
    try {
      const res = await mutateAsync(data)
      if (res) {
        CLOG({ res })
        Alert.alert('Éxito', 'Anuncio creado correctamente', [
          {
            text: 'OK',
            isPreferred: true,
            onPress: () => {
              navigation.navigate('MisAnuncios')
            },
          },
        ])
      }
    } catch (error: any) {
      CLOG({ error: { ...error } })
      Alert.alert('Error', 'Ocurrió un error al crear el anuncio')
      navigation.goBack()
    }
  }, [
    prevparams,
    inputs,
    selectedItems,
    subCategoriaSelected,
    price,
    renderPrice,
    params,
  ])

  return (
    <NewAnucioLayout
      title={`${params.name}`}
      footer={
        <Button
          label='Continuar'
          isFullWidth
          isDisabled={loadingSubCat}
          onPress={onContinue}
        />
      }
    >
      {!loadingSubCat && subCat && subCat.length > 0 && (
        <ModalRadioButton
          title='Subcategoría'
          isVisible={showSubCategoriaModal}
          hideModal={() => setShowSubCategoriaModal(false)}
          onPressItem={(item) => {
            const itemFound = subCat.find((c) => c.id === item.value)
            if (!itemFound) return
            setSubCategoriaSelected(itemFound)
            setShowSubCategoriaModal(false)
          }}
          data={subCat.map((c) => ({ label: c.name, value: c.id }))}
        />
      )}
      <Box gap={'m'} paddingHorizontal={'l'}>
        {renderPrice && (
          <TextField
            inputProps={{
              placeholder: 'Precio (MXN)',
              keyboardType: 'numeric',
              onChangeText: (text) => setPrice(+text),
            }}
            required
          />
        )}
        {fieldsLoaded && (
          <ExtraContent
            fields={fields}
            setInputs={setInputs}
            setSelectedItems={setSelectedItems}
          />
        )}
        <Button
          label={
            !subCategoriaSelected
              ? 'Elegir subcategoría'
              : subCategoriaSelected.name
          }
          isDisabled={loadingSubCat}
          variant={!subCategoriaSelected ? 'outline' : 'orangy'}
          onPress={() => setShowSubCategoriaModal(true)}
          isModal
        />
      </Box>
    </NewAnucioLayout>
  )
}
