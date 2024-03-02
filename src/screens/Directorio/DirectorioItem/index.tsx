import type { Directorio } from '@src/api'
import { Box, Button, Icon, Image, Text } from '@src/components'
import { getShadowBoxProps, useAppTheme } from '@src/theme'
import { getImageUrl, redirectToEmail } from '@src/utils'

export const DirectorioItem: React.FC<{
  data: Directorio
}> = ({ data }) => {
  const {
    address,
    type,
    hours,
    title,
    email,
    phone,
    thumbnail,
    media,
    state: { name: stateName },
  } = data

  const { colors } = useAppTheme()

  const sendMail = async () => {
    redirectToEmail({
      email,
      subject: 'Contacto desde la app',
      body: 'Me interesa...',
    })
  }

  return (
    <Box
      {...getShadowBoxProps({ borderRadius: 'm', elevation: 10 })}
      marginTop={'l'}
      p={'s'}
      flexDirection={'row'}
      gap={'s'}
    >
      <Box flexDirection={'column'} gap={'s'} width={'35%'} maxWidth={'35%'}>
        <Image
          source={{
            uri: getImageUrl({
              media: media?.[0],
              str: thumbnail,
            }),
          }}
          width={'100%'}
          height={120}
          borderRadius={'m'}
        />
        <Box
          backgroundColor={'secondary'}
          borderRadius={'s'}
          flexDirection={'row'}
          gap={'s'}
          justifyContent={'center'}
          alignItems={'center'}
        >
          <Icon
            type='FontAwesome5'
            name='map-marker-alt'
            size={16}
            color={colors.white}
          />
          <Text color={'white'}>{stateName}</Text>
        </Box>
        <Box
          backgroundColor={'orangy'}
          borderRadius={'s'}
          flexDirection={'row'}
          gap={'s'}
          justifyContent={'center'}
          alignItems={'center'}
          overflow={'hidden'}
        >
          <Icon name='star' size={20} color={colors.white} />
          <Text color={'white'}>{type}</Text>
        </Box>
      </Box>
      <Box
        flexDirection={'column'}
        gap={'xs'}
        width={'63%'}
        paddingHorizontal={'m'}
      >
        <Text variant={'header'} textAlign={'center'} color={'orangy'}>
          {title}
        </Text>
        <Box
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'row'}
          g={'s'}
        >
          <Icon type='FontAwesome5' name='lightbulb' size={20} />
          <Text>{address}</Text>
        </Box>
        <Box
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'row'}
          g={'s'}
        >
          <Icon type='FontAwesome5' name='clock' size={20} />
          <Text>{hours}</Text>
        </Box>
        <Box
          justifyContent={'center'}
          alignItems={'center'}
          flexDirection={'row'}
          g={'s'}
        >
          <Icon type='FontAwesome5' name='phone' size={20} />
          <Text>{phone}</Text>
        </Box>
        <Button
          variant={'primary'}
          label={'Enviar correo'}
          onPress={sendMail}
        />
      </Box>
    </Box>
  )
}
