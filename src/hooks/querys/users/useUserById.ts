import { useQuery } from 'react-query'

import { UsersQuerys } from './users.query'

import UserServices from '@src/api/Usuarios/Usuarios'

export const useUserById = (id: string | number) => {
  return useQuery({
    queryKey: [UsersQuerys.getUser, id],
    queryFn: () => UserServices.getUserById(id),
  })
}
