import { useCallback, useMemo, useState } from 'react'
import { FC } from 'react'

import { getArrays } from './helper'

import { Categoria } from '@src/api'
import { Box, Button, NewAnucioLayout, Text, TextField } from '@src/components'
import { CheckboxList } from '@src/components/CheckboxList'
import { ModalRadioButton } from '@src/components/ModalRadioButton'
import { useCategorias } from '@src/hooks'
import { NewAnuncioStackParamList, ScreenProps } from '@src/navigation'
import { CLOG } from '@src/utils'

export const NewAnuncioFormByCat: FC<
  ScreenProps<NewAnuncioStackParamList, 'NewAnuncioFormByCat'>
> = ({ route: { params } }) => {
  const { data: subCat, isLoading: loadingSubCat } = useCategorias(params.id)
  CLOG({
    subCat,
    id: params.id,
  })
  const [showSubCategoriaModal, setShowSubCategoriaModal] = useState(false)
  const [subCategoriaSelected, setSubCategoriaSelected] = useState<Categoria>()

  const { checkboxData, title } = useMemo(
    () => getArrays(params.name),
    [params.name],
  )

  const [_selectedItems, setSelectedItems] = useState<string[]>([])

  const onSelectedItemsChange = useCallback((selectedItems: Array<string>) => {
    setSelectedItems(selectedItems)
  }, [])

  const RenderExtraContent = useCallback(() => {
    switch (params.name) {
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

      default:
        return null
    }
  }, [params])

  return (
    <NewAnucioLayout
      title={`${params.name}`}
      footer={
        <Button
          label='Continuar'
          isFullWidth
          isDisabled={loadingSubCat}
          // onPress={showCategoriaModalHandler}
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
      <Box gap={'m'}>
        <Button
          label={
            !subCategoriaSelected
              ? 'Elegir subcategoría'
              : subCategoriaSelected.name
          }
          isDisabled={loadingSubCat}
          onPress={() => setShowSubCategoriaModal(true)}
        />
        <RenderExtraContent />
        <Text variant={'subHeader'}>{title}</Text>
        <CheckboxList items={checkboxData} onChange={onSelectedItemsChange} />
      </Box>
    </NewAnucioLayout>
  )
}
