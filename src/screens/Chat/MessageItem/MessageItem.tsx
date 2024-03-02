import type { FC } from 'react'

import { BaseChatMessage } from '@src/api'
import { Box, Text } from '@src/components'
import { useUser } from '@src/hooks/useUser'

type MessageItemProps = {
  message: BaseChatMessage
}

export const MessageItem: FC<MessageItemProps> = ({ message }) => {
  const [{ id }] = useUser()

  return (
    <Box p='xs'>
      <Box
        backgroundColor={message.user_id === id ? 'primary' : 'white'}
        borderRadius='m'
        p='s'
        {...(message.user_id === id
          ? { alignSelf: 'flex-end' }
          : { alignSelf: 'flex-start' })}
        maxWidth={'80%'}
      >
        <Text
          variant='body2'
          color={message.user_id === id ? 'white' : 'black'}
          textAlign={message.user_id === id ? 'right' : 'left'}
          selectable
        >
          {message.message}
        </Text>
      </Box>
      <Text
        color={'gray'}
        textAlign={message.user_id === id ? 'right' : 'left'}
      >
        {message.created_at.toLocaleDateString()}{' '}
        {message.created_at.toLocaleTimeString()}
      </Text>
    </Box>
  )
}
