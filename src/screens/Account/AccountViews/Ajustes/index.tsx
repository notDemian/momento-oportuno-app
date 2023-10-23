import { memo, useCallback, useState } from 'react'
import { Dimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import {
  AccordionItem,
  Box,
  Button,
  CheckBox,
  Icon,
  Image,
  Text,
  TextField,
  Touchable,
} from '@src/components'
import { useUser } from '@src/hooks/useUser'
import * as ImagePicker from 'expo-image-picker'

const CAMBIAR_EMAIL_SECTION = memo(() => {
  const [user] = useUser()

  return (
    <Box g={'m'}>
      <Text variant='header'>Correo electrónico actual</Text>
      <Box
        backgroundColor={'creamy'}
        borderColor={'orangy'}
        borderWidth={1}
        borderRadius={'m'}
        p={'m'}
      >
        <Text>{user.name}</Text>
      </Box>
      <Text variant='header'>Nuevo email</Text>
      <Box>
        <TextField
          inputProps={{
            placeholder: 'Nuevo email',
          }}
        />
      </Box>
      <Button
        label='Cambiar email'
        leftIcon={<Icon type='Feather' name='check' color='white' />}
      />
    </Box>
  )
})

const CAMBIAR_CONTRASENA_SECTION = memo(() => {
  return (
    <Box g={'m'}>
      <Text variant='header'>Contraseña anterior</Text>
      <Box>
        <TextField
          inputProps={{
            placeholder: 'Escribe tu contraseña anterior',
          }}
        />
      </Box>
      <Text variant='header'>Nueva contraseña</Text>
      <Box>
        <TextField
          inputProps={{
            placeholder: 'Nueva contraseña',
          }}
        />
      </Box>
      <Button
        label='Cambiar contraseña'
        leftIcon={<Icon type='Feather' name='check' color='white' />}
      />
    </Box>
  )
})

const REDES_SOCIALES_DISPONIBLES: { name: string; icon: () => JSX.Element }[] =
  [
    // facebook, instagram, linkedin, twitter, tiktok, youtube
    {
      name: 'Facebook',
      icon: () => <Icon type='FontAwesome5' name='facebook' />,
    },
    {
      name: 'Instagram',
      icon: () => <Icon type='Feather' name='instagram' />,
    },
    {
      name: 'LinkedIn',
      icon: () => <Icon type='Feather' name='linkedin' />,
    },
    {
      name: 'Twitter',
      icon: () => <Icon type='Feather' name='twitter' />,
    },
    {
      name: 'TikTok',
      icon: () => <Icon type='FontAwesome5' name='tiktok' />,
    },
    {
      name: 'YouTube',
      icon: () => <Icon type='Feather' name='youtube' />,
    },
  ]
const REDES_SOCIALES_SECTION = memo(() => {
  return (
    <Box g={'m'}>
      {REDES_SOCIALES_DISPONIBLES.map((red, index) => {
        const I = red.icon
        return (
          <Box key={index} flex={1}>
            <Text variant='header'>{red.name}</Text>
            <Box
              flex={1}
              borderColor={'orangy'}
              flexGrow={1}
              borderWidth={1}
              flexDirection={'row'}
              alignItems={'center'}
              borderRadius={'m'}
              p={'s'}
              g={'xs'}
            >
              <I />
              <TextField
                inputProps={{
                  placeholder: `Tu ${red.name}`,
                }}
                flex={1}
              />
            </Box>
          </Box>
        )
      })}

      <Button
        label='Guardar cambios'
        leftIcon={<Icon type='Feather' name='check' color='white' />}
      />
    </Box>
  )
})

const IMAGEN_PERFIL_SECTION = memo(() => {
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset>()

  const onShowImagePicker = useCallback(async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
        selectionLimit: 1,
      })
      if (!result.canceled && result.assets[0]) {
        setImage(result.assets[0])
      }
    } catch (error) {
      setImage(undefined)
    }
  }, [])

  return (
    <Box g={'m'}>
      {!image ? (
        <Button
          variant='secondary'
          onPress={onShowImagePicker}
          flex={1}
          label={'Abrir galería'}
          isFullWidth
        />
      ) : (
        <Box
          margin={'m'}
          borderRadius={'m'}
          overflow={'hidden'}
          backgroundColor={'white'}
          justifyContent={'center'}
          alignItems={'center'}
          g={'m'}
        >
          <Touchable
            onPress={() => {
              setImage(undefined)
            }}
          >
            <Box
              position={'absolute'}
              top={0}
              right={0}
              backgroundColor={'white'}
              borderRadius={'xxl'}
              zIndex={10}
              p={'xs'}
            >
              <Icon type={'Feather'} name={'x'} size={20} />
            </Box>
          </Touchable>
          <Image
            source={{ uri: image.uri }}
            width={Dimensions.get('window').width}
            height={(Dimensions.get('window').width * 16) / 9}
            contentPosition={'center'}
          />
          <Button
            variant='secondary'
            flex={1}
            label={'Continuar'}
            isFullWidth
          />
        </Box>
      )}
    </Box>
  )
})

const DETALLES_CUENTA_SECTION = memo(() => {
  const [user] = useUser()

  const [nombre = '', apellido = ''] = user.name.split(' ')

  return (
    <Box g={'m'}>
      <Box gap={'s'}>
        <Text variant={'subHeader'}>Mostrar nombre</Text>
        <TextField
          inputProps={{
            placeholder: 'Mostrar nombre',
            value: nombre,
          }}
          borderColor={'orangy'}
          borderWidth={1}
        />
      </Box>
      <Box gap={'s'}>
        <Text variant={'subHeader'}>Nombre completo</Text>
        <TextField
          inputProps={{
            placeholder: 'Mostrar nombre',
            value: user.name,
          }}
          borderColor={'orangy'}
          borderWidth={1}
        />
      </Box>
      <Box gap={'s'}>
        <Text variant={'subHeader'}>Apellidos</Text>
        <TextField
          inputProps={{
            placeholder: 'Mostrar nombre',
            value: apellido,
          }}
          borderColor={'orangy'}
          borderWidth={1}
        />
      </Box>
      <Box gap={'s'}>
        <Text variant={'subHeader'}>Número telefónico</Text>
        <TextField
          inputProps={{
            placeholder: 'Número telefónico	',
          }}
          leftIcon='call'
          borderColor={'orangy'}
          borderWidth={1}
        />
        <CheckBox label='WhatsApp' onChange={(a) => {}} />
      </Box>
      <Box gap={'s'}>
        <Text variant={'subHeader'}>Descripción del perfil</Text>
        <TextField
          inputProps={{
            placeholder: 'Escribe algo sobre ti',
            multiline: true,
            numberOfLines: 5,
            style: {
              textAlignVertical: 'top',
            },
          }}
          borderColor={'orangy'}
          borderWidth={1}
          height={150}
        />
      </Box>
      <Box gap={'s'}>
        <Text variant={'subHeader'}>Dirección</Text>
        <TextField
          inputProps={{
            placeholder: 'Escribe tu dirección',
          }}
          borderColor={'orangy'}
          borderWidth={1}
        />
      </Box>
      <Button
        label='Guardar cambios'
        leftIcon={<Icon type='Feather' name='check' color='white' />}
      />
    </Box>
  )
})

const SECTIONS: { body: () => JSX.Element; title: string }[] = [
  {
    body: () => {
      return <DETALLES_CUENTA_SECTION />
    },
    title: 'Detalles de la cuenta',
  },
  {
    body: () => {
      return <IMAGEN_PERFIL_SECTION />
    },
    title: 'Imagen de perfil',
  },
  {
    body: () => {
      return <REDES_SOCIALES_SECTION />
    },
    title: 'Redes Sociales',
  },
  {
    body: () => {
      return <CAMBIAR_CONTRASENA_SECTION />
    },
    title: 'Cambiar contraseña',
  },
  {
    body: () => <CAMBIAR_EMAIL_SECTION />,
    title: 'Cambiar email',
  },
]

const Ajustes = () => {
  return (
    <ScrollView>
      <Box flex={1} backgroundColor={'background'} p={'m'}>
        {SECTIONS.map((section, index) => (
          <AccordionItem
            key={index}
            customBody={section.body}
            isOpen={index === 0}
            customTitle={() => {
              return <Text>{section.title}</Text>
            }}
            containerStyle={{
              elevation: 3,
              shadowColor: 'gray',
              shadowOffset: {
                width: 2,
                height: 2,
              },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              borderRadius: 10,
            }}
          />
        ))}
      </Box>
    </ScrollView>
  )
}

export default memo(Ajustes)
