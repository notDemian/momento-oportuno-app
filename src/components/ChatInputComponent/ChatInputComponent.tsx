import { type FC, useCallback, useState } from 'react'
import { Box, Button, Icon, TextField } from '../elements'

import { usePostMessage } from '@src/hooks'
import { getShadowBoxProps } from '@src/theme'

type ChatInputComponentProps = {
  chatId: number
}

export const ChatInputComponent: FC<ChatInputComponentProps> = ({ chatId }) => {
  const [message, setMessage] = useState('')

  const { mutateAsync, isLoading } = usePostMessage(chatId)

  const onSend = useCallback(async () => {
    if (message.trim().length === 0) return

    await mutateAsync({ message })
    setMessage('')
  }, [message])

  return (
    <Box
      flexDirection='row'
      p='m'
      g={'xs'}
      {...getShadowBoxProps()}
      backgroundColor={'white'}
      m={'xs'}
    >
      <TextField
        inputProps={{
          placeholder: 'Escribe un mensaje',
          onChangeText: (text) => {
            setMessage(text)
          },
          value: message,
        }}
        flex={1}
      />
      <Button variant='primary' onPress={onSend} isLoading={isLoading}>
        <Icon name='send' color='white' />
      </Button>
    </Box>
  )
}
