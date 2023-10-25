import { useCallback, useMemo, useState } from 'react'
import { FC } from 'react'
import { Alert } from 'react-native'

import { ExtraContent } from './ExtraContent'

import { StackActions } from '@react-navigation/native'
import { CreateAnuncioParams, ListingAttribute, SubCategory } from '@src/api'
import { Box, Button, NewAnucioLayout } from '@src/components'
import { ButtonModalGenerator } from '@src/components/ModalRadioButton'
import {
  useAppSelector,
  useCategoriaAttributes,
  useCategorias,
  useCreateAnuncio,
} from '@src/hooks'
import { AccountStackParamList, ScreenProps } from '@src/navigation'
import { CLOG } from '@src/utils'

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

  const onContinue = useCallback(async () => {
    const data: CreateAnuncioParams = {
      ...initialParams,
      listingAttributes: inputs,
    }

    //validate
    if (
      (data.listingAttributes.length !== attributes?.data?.length &&
        attributes?.data?.length !== 0) ||
      data.listingAttributes.some((a) => a.value.trim().length === 0)
    ) {
      Alert.alert('Error', 'Debes llenar todos los campos')
      return
    }
    if (!subCategoriaSelected) {
      Alert.alert('Error', 'Selecciona una subcategoría')
      return
    }

    try {
      const { data: res } = await mutateAsync(data)
      if (res) {
        CLOG({ res })
        Alert.alert('Éxito', 'Anuncio creado correctamente', [
          {
            text: 'OK',
            isPreferred: true,
            onPress: () => {
              navigation.navigate('CheckoutAnuncio', { id: res.id })
            },
          },
        ])
      }
    } catch (error: any) {
      CLOG({ error: { ...error } })
      Alert.alert('Error', 'Ocurrió un error al crear el anuncio')
      navigation.dispatch(StackActions.popToTop())
    }
  }, [inputs, initialParams, attributes])
  //   if (!subCategoriaSelected)
  //     return Alert.alert('Error', 'Selecciona una subcategoría')
  //   const fromInputs: Attributes[] = [
  //     ...inputs,
  //     ...selectedItems,
  //     {
  //       id: 0,
  //       value: [
  //         {
  //           dependencies: [],
  //           hasMultilevelChildren: false,
  //           id: params.id,
  //           key: `listivo_${params.id}`,
  //           name: params.name,
  //           parent: params.parent,
  //           searchFormPlaceholder: '',
  //           parentTermIds: [],
  //         },
  //         {
  //           dependencies: [],
  //           hasMultilevelChildren: false,
  //           id: subCategoriaSelected.id,
  //           key: `listivo_${subCategoriaSelected.id}`,
  //           name: subCategoriaSelected.name,
  //           parent: subCategoriaSelected.parent,
  //           searchFormPlaceholder: '',
  //           parentTermIds: [],
  //         },
  //       ],
  //     },
  //   ]

  //   const data: createAnuncioParams = {
  //     model: {
  //       name: prevparams.name,
  //       description: prevparams.description,
  //       packageId: prevparams.packageId,
  //       attributes: fromInputs,
  //     },
  //   }
  //   // return
  //   // try {
  //   //   const res = await mutateAsync(data)
  //   //   if (res) {
  //   //     CLOG({ res })
  //   //     Alert.alert('Éxito', 'Anuncio creado correctamente', [
  //   //       {
  //   //         text: 'OK',
  //   //         isPreferred: true,
  //   //         onPress: () => {
  //   //           navigation.navigate('CheckoutAnuncio')
  //   //         },
  //   //       },
  //   //     ])
  //   //   }
  //   // } catch (error: any) {
  //   //   CLOG({ error: { ...error } })
  //   //   Alert.alert('Error', 'Ocurrió un error al crear el anuncio')
  //   //   navigation.goBack()
  //   // }
  // }, [prevparams, inputs, selectedItems, subCategoriaSelected, price, params])

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
              const itemFound = subcategories.find((c) => c.id === item.value)
              if (!itemFound) return
              setSubCategoriaSelected(itemFound)
            }}
            title='Subcategoría'
          />
        )}
      </Box>
    </NewAnucioLayout>
  )
}
