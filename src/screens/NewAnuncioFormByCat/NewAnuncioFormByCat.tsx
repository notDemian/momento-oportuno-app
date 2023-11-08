import { useCallback, useEffect, useMemo, useState } from 'react'
import { FC } from 'react'

import { ExtraContent } from './ExtraContent'

import { StackActions } from '@react-navigation/native'
import { CreateAnuncioParams, ListingAttribute, SubCategory } from '@src/api'
import { Box, Button, NewRecursoLayout } from '@src/components'
import { ButtonModalGenerator } from '@src/components/ModalRadioButton'
import {
  useAppSelector,
  useCategoriaAttributes,
  useCategorias,
  useCreateAnuncio,
} from '@src/hooks'
import { AccountStackParamList, ScreenProps } from '@src/navigation'
import { Constants, T } from '@src/utils'
import { AxiosError } from 'axios'

export const NewAnuncioFormByCat: FC<
  ScreenProps<AccountStackParamList, 'NewAnuncioFormByCat'>
> = ({ route: { params }, navigation }) => {
  const { data: cats, isLoading: loadingSubCat } = useCategorias()
  const subcategories = useMemo(
    () => cats?.data.find((ths) => ths.id === params.id)?.children ?? [],
    [cats, params.id],
  )

  const { data: attributes } = useCategoriaAttributes(params.id)

  const [subCategoriaSelected, setSubCategoriaSelected] =
    useState<SubCategory>()

  const [inputs, setInputs] = useState<ListingAttribute[]>([])

  const initialParams = useAppSelector((s) => s.cart.createAnuncioParams)
  const { mutateAsync, isLoading } = useCreateAnuncio()

  const onContinue = useCallback(
    async (ignore = false) => {
      if (subcategories.length !== 0 && !subCategoriaSelected) {
        T.error('Selecciona una subcategoría')
        return
      }
      const data: CreateAnuncioParams = {
        ...initialParams,
        subcategory_id: subCategoriaSelected?.id ?? 0,
        listingAttributes: inputs,
      }

      //validate
      if (
        (!ignore &&
          data.listingAttributes.length !== attributes?.data?.length &&
          attributes?.data?.length !== 0) ||
        data.listingAttributes.some((a) => a.value.trim().length === 0)
      ) {
        T.error('Debes llenar todos los campos')
        return
      }
      console.log({ subcategories })

      try {
        const { data: res } = await mutateAsync(data)
        if (res) {
          T.success('Anuncio creado')
          navigation.navigate('NewAnuncioFormMedia', { id: res.id })
        }
      } catch (error) {
        if (error instanceof AxiosError) {
          const msg = error?.response?.data?.message ?? 'Error al crear anuncio'
          T.error(msg)
          return
        }
        T.error('Error al crear anuncio')
        navigation.dispatch(StackActions.popToTop())
      }
    },
    [inputs, initialParams, attributes, subCategoriaSelected, subcategories],
  )

  useEffect(() => {
    if (params.id === Constants.IDS.variousCategory) {
      onContinue(true)
    }
  }, [params.id])

  return (
    <NewRecursoLayout
      title={`${params.name}`}
      footer={
        <Button
          label='Continuar'
          isFullWidth
          isDisabled={loadingSubCat || isLoading}
          onPress={() => onContinue()}
        />
      }
    >
      <Box gap={'m'}>
        {attributes?.data && (
          <ExtraContent fields={attributes.data} setInputs={setInputs} />
        )}
        {!loadingSubCat && subcategories && subcategories.length > 0 && (
          <ButtonModalGenerator
            data={subcategories.map((c) => ({
              label: c.name,
              value: c.id.toString(),
            }))}
            onPressItem={(item) => {
              const itemFound = subcategories.find((c) => c.id === +item.value)
              if (!itemFound) return
              setSubCategoriaSelected(itemFound)
            }}
            title='Subcategoría'
          />
        )}
      </Box>
    </NewRecursoLayout>
  )
}
