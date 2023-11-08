import dayjs from 'dayjs'
import es from 'dayjs/locale/es'
es
dayjs.locale('es')

type DateParam = string | number | Date | dayjs.Dayjs
type DateOpts = {
  format?: string
}

const DEFAULT_FORMAT = 'DD/MM/YYYY' as const

export const formatSpanish = (date: DateParam, opts?: DateOpts) => {
  return dayjs(date)
    .locale('es')
    .format(opts?.format ?? DEFAULT_FORMAT)
}
