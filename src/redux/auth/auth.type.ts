import { User } from '@src/api/Usuarios'

export interface AuthState {
  token: string
  user: User | null
}
