import { Controller, ControllerProps } from 'react-hook-form'

type FormControllerProps<
  TControl extends ControllerProps['control'] = ControllerProps['control'],
  TNames extends string = string,
> = Omit<ControllerProps, 'name' | 'control'> & {
  name: string
  control: TControl
}

type FormControllerFn = (props: FormControllerProps) => JSX.Element

export const FormController: FormControllerFn = ({ name, ...props }) => {
  return <Controller name={name} {...props} />
}
