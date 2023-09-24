import dayjs from 'dayjs'
// eslint-disable-next-line
import es from 'dayjs/locale/es'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('es')
dayjs.extend(relativeTime)

export function toRelative(date: Date | string): string {
  dayjs.locale('es')
  dayjs.extend(relativeTime)

  const relativeToNow = dayjs(date).fromNow(true)
  const spanishString = relativeToNow.replace(
    /(\d+) (second|minute|hour|day|week|month|year)s?/g,
    (_, num, unit) => {
      if (num === '1') {
        return `${num} ${
          unit === 'hour'
            ? 'hora'
            : unit === 'day'
            ? 'día'
            : unit === 'week'
            ? 'semana'
            : unit === 'month'
            ? 'mes'
            : 'año'
        }`
      } else {
        return `${num} ${
          unit === 'hour'
            ? 'horas'
            : unit === 'day'
            ? 'días'
            : unit === 'week'
            ? 'semanas'
            : unit === 'month'
            ? 'meses'
            : 'años'
        }`
      }
    },
  )
  if (spanishString === 'hace unos segundos') return 'hace un momento'
  return `hace ${spanishString}`
}
