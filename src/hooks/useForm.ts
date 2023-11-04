import {
  type FieldValues,
  useForm as useRForm,
  type UseFormProps,
} from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { type z } from 'zod'

export function useForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown,
  TSchema extends z.ZodSchema<TFieldValues> = z.ZodSchema<TFieldValues>,
>({
  schema,
  ...props
}: UseFormProps<TFieldValues, TContext> & { schema: TSchema }) {
  return useRForm<TFieldValues>({ resolver: zodResolver(schema), ...props })
}
