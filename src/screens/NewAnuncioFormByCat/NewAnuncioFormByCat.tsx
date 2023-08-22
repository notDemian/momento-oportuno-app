import {
  Box,
  Button,
  NewAnucioLayout,
  TextField,
  Text,
  Image,
  RadioButton,
} from '@src/components'
import { ModalRadioButton } from '@src/components/ModalRadioButton'
import {
  ESTADOS_APROBADOS,
  NEW_ANUNCIO_CATEGORIAS,
  NEW_ANUNCIO_CATEGORIAS_OBJ,
} from '@src/data'
import { fontSize } from '@src/theme'
import { useCallback, useEffect, useRef, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Dimensions } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { NewAnuncioStackParamList, ScreenProps } from '@src/navigation'
import { FC } from 'react'
import {
  CheckboxList,
  type CheckBoxListItem,
} from '@src/components/CheckboxList'
import { getArrays } from './helper'

const items = [
  {
    id: '1',
    label: 'Ondo',
  },
  {
    id: '2',
    label: 'Ondo',
  },
  {
    id: '3',
    label: 'Ondo',
  },
]

export const NewAnuncioFormByCat: FC<
  ScreenProps<NewAnuncioStackParamList, 'NewAnuncioFormByCat'>
> = ({ navigation, route: { params } }) => {
  const [showSubCategoriaModal, setShowSubCategoriaModal] = useState(false)
  const [subCategoriaSelected, setSubCategoriaSelected] = useState('')

  const [subCategoriaData, setSubCategoriaData] = useState<string[]>([])
  const [checkboxData, setCheckboxData] = useState<CheckBoxListItem[]>([])
  const [checkListTitle, setCheckListTitle] = useState('')

  useEffect(() => {
    const {
      checkboxData: newCheckboxData,
      subCategoriaData: newSubCategoriaData,
      title: newTitle,
    } = getArrays(params.categoria)
    setSubCategoriaData(newSubCategoriaData)
    setCheckboxData(newCheckboxData)
    setCheckListTitle(newTitle)
  }, [params])

  const [selectedLanguage, setSelectedLanguage] = useState()

  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const onSelectedItemsChange = useCallback((selectedItems: Array<string>) => {
    setSelectedItems(selectedItems)
  }, [])

  const RenderExtraContent = useCallback(() => {
    switch (params.categoria) {
      case 'Inmuebles':
        return (
          <>
            <TextField
              inputProps={{
                placeholder: 'Año de construcción',
                keyboardType: 'numeric',
              }}
              required
            />
            <TextField
              inputProps={{
                placeholder: 'Medida de la propiedad',
                keyboardType: 'numeric',
              }}
              required
            />
            <TextField
              inputProps={{
                placeholder: 'Baños',
                keyboardType: 'numeric',
              }}
              required
            />
            <TextField
              inputProps={{
                placeholder: 'Recámaras',
                keyboardType: 'numeric',
              }}
              required
            />
          </>
        )
      case 'Vehículos':
        return (
          <>
            <TextField
              inputProps={{
                placeholder: 'Año',
                keyboardType: 'numeric',
              }}
              required
            />
            <TextField
              inputProps={{
                placeholder: 'Kilometraje',
                keyboardType: 'numeric',
              }}
              required
            />
            <TextField
              inputProps={{
                placeholder: 'Modelo',
              }}
              required
            />
            <TextField
              inputProps={{
                placeholder: 'Marca',
              }}
              required
            />
          </>
        )
      case 'Empleos':
        return (
          <>
            <TextField
              inputProps={{
                placeholder: 'Nivel de trabajo',
              }}
              required
            />
            <TextField
              inputProps={{
                placeholder: 'Horas',
              }}
              required
            />
            <TextField
              inputProps={{
                placeholder: 'Tipo de reclutamiento',
              }}
              required
            />
          </>
        )
      case 'Servicios':
        return <></>
      case 'Comunidad':
        return null
      case 'Electrónicos':
        return null
      case 'Mascotas':
        return <></>
      case 'Moda':
        return <></>
      case 'Para niños':
        return <></>
      default:
        params.categoria
        return null
    }
  }, [params])

  return (
    <NewAnucioLayout
      title={`${params.categoria}`}
      footer={
        <Button
          label='Continuar'
          isFullWidth
          // onPress={showCategoriaModalHandler}
        />
      }
    >
      {subCategoriaData.length > 0 && (
        <ModalRadioButton
          title='Subcategoría'
          isVisible={showSubCategoriaModal}
          hideModal={() => setShowSubCategoriaModal(false)}
          onPressItem={(item) => {
            setSubCategoriaSelected(item.label)
            setShowSubCategoriaModal(false)
          }}
          data={subCategoriaData.map((c) => ({ label: c, value: c }))}
        />
      )}
      <Box gap={'m'}>
        <Button
          label={
            subCategoriaSelected.trim() === ''
              ? 'Elegir subcategoría'
              : subCategoriaSelected
          }
          onPress={() => setShowSubCategoriaModal(true)}
        />
        <RenderExtraContent />
        <Text variant={'subHeader'}>{checkListTitle}</Text>
        <CheckboxList items={checkboxData} onChange={onSelectedItemsChange} />
      </Box>
    </NewAnucioLayout>
  )
}
