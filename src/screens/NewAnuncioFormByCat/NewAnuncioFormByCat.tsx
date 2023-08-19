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
import { ESTADOS_APROBADOS, NEW_ANUNCIO_CATEGORIAS } from '@src/data'
import { fontSize } from '@src/theme'
import { useCallback, useEffect, useRef, useState } from 'react'
import * as ImagePicker from 'expo-image-picker'
import { Dimensions } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { NewAnuncioStackParamList, ScreenProps } from '@src/navigation'
import { FC } from 'react'

import MultiSelect from 'react-native-multiple-select'
const items = [
  {
    id: '92iijs7yta',
    name: 'Ondo',
  },
  {
    id: 'a0s0a8ssbsd',
    name: 'Ogun',
  },
  {
    id: '16hbajsabsd',
    name: 'Calabar',
  },
  {
    id: 'nahs75a5sg',
    name: 'Lagos',
  },
  {
    id: '667atsas',
    name: 'Maiduguri',
  },
  {
    id: 'hsyasajs',
    name: 'Anambra',
  },
  {
    id: 'djsjudksjd',
    name: 'Benue',
  },
  {
    id: 'sdhyaysdj',
    name: 'Kaduna',
  },
  {
    id: 'suudydjsjd',
    name: 'Abuja',
  },
]

export const NewAnuncioFormByCat: FC<
  ScreenProps<NewAnuncioStackParamList, 'NewAnuncioFormByCat'>
> = ({ navigation, route: { params } }) => {
  const [showSubCategoriaModal, setShowSubCategoriaModal] = useState(false)
  const [subCategoriaSelected, setSubCategoriaSelected] = useState('')

  const [subCategoriaData, setSubCategoriaData] = useState<string[]>([])

  useEffect(() => {
    let newData: string[] = []
    switch (params.categoria) {
      case 'Inmuebles':
        newData = ['Apartamentos', 'Comercial', 'Casas', 'Terrenos', 'Oficinas']
        break
      case 'Vehículos':
        newData = [
          'Aeronaves',
          'Botes',
          'Carros',
          'Construcción',
          'Motos',
          'Camiones',
          'Vans',
        ]
        break
      case 'Empleos':
        newData = [
          'Contabilidad',
          'Empleos de mercadotecnia',
          'Pasantías',
          'Trabajos de limpieza',
          'Trabajos de limpieza',
          'Trabajos de TI',
        ]
        break
      case 'Servicios':
        newData = [
          'Servicios Automotrices',
          'Belleza',
          'Servicios de limpieza',
          'Servicios financieros',
          'Jardinería',
          'Servicios para el hogar',
          'Bodas',
        ]
        break
      case 'Comunidad':
        newData = [
          'Anuncios',
          'Artículos buscados',
          'Cosas gratis',
          'Perdido y encontrado',
          'Voluntarios',
        ]
        break
      case 'Electrónicos':
        newData = [
          'Celulares',
          'Equipos de Cómputo',
          'Juegos y Videoconsolas',
          'Software',
        ]
        break
      case 'Mascotas':
        newData = ['Aves', 'Gatos', 'Perros', 'Peces', 'Pequeños peludos']
        break
      case 'Moda':
        newData = [
          'Joyería',
          'Ropa de hombre',
          'Bolsos de mujer',
          'Ropa de mujer',
        ]
        break
      case 'Para niños':
        newData = [
          'Accesorios para niños',
          'Ropa de niños',
          'Cochecitos y sillas de paseo',
          'Juguetes',
        ]
        break
      default:
        params.categoria
        break
    }
    setSubCategoriaData(newData)
  }, [params])

  const [selectedLanguage, setSelectedLanguage] = useState()

  const [selectedItems, setSelectedItems] = useState<any[]>([])

  const onSelectedItemsChange = (selectedItems: Array<any>) => {
    setSelectedItems(selectedItems)
  }

  const multiSelectRef = useRef<MultiSelect>(null)

  const RenderContent = () => {
    // useCallback(
    switch (params.categoria) {
      case 'Inmuebles':
        return <></>
      case 'Vehículos':
        return <></>
      case 'Empleos':
        return <></>
      case 'Servicios':
        return <></>
      case 'Comunidad':
        return (
          <>
            <RadioButton
              data={[
                { label: 'uno', value: '1' },
                {
                  label: 'dos',
                  value: '2',
                },
                {
                  label: 'tres',
                  value: '3',
                },
              ]}
              onItemPress={() => {}}
            />
            {/* <Picker
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }
            >
              <Picker.Item label='Java' value='java' />
              <Picker.Item label='JavaScript' value='js' />
            </Picker> */}
            <MultiSelect
              ref={multiSelectRef}
              items={items}
              onSelectedItemsChange={onSelectedItemsChange}
              selectedItems={selectedItems}
              hideTags
              uniqueKey='id'
              selectText='Pick Items'
              searchInputPlaceholderText='Search Items...'
              onChangeInput={(text) => console.log(text)}
              tagRemoveIconColor='#CCC'
              tagBorderColor='#CCC'
              tagTextColor='#CCC'
              selectedItemTextColor='#CCC'
              selectedItemIconColor='#CCC'
              itemTextColor='#000'
              displayKey='name'
              searchInputStyle={{ display: 'none' }}
              hideSubmitButton
            />
            <Text>
              {multiSelectRef.current?.getSelectedItemsExt(selectedItems)}
            </Text>
          </>
        )
      case 'Electrónicos':
        return <></>
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
  }
  // }, [params, selectedItems])

  return (
    <NewAnucioLayout
      title={`Categoría seleccionada: ${params.categoria}`}
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
          onPressItem={() => {}}
          data={subCategoriaData.map((c) => ({ label: c, value: c }))}
        />
      )}
      <Box gap={'m'}>
        <RenderContent />
      </Box>
    </NewAnucioLayout>
  )
}
