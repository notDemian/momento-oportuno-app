import type { Addons } from '@src/api'
import { Box, CheckBox, LoadingPageModal, Text } from '@src/components'

type AddonsProps = {
  addons: Addons[] | null | undefined
  setSelectedAddons: React.Dispatch<React.SetStateAction<Addons[]>>
}

export function AddonsComponent({ addons, setSelectedAddons }: AddonsProps) {
  if (!addons) return <LoadingPageModal loading />

  return (
    <Box justifyContent={'center'} paddingHorizontal={'xs'}>
      <Text variant={'subHeader'}>
        Selecciona los addons que deseas agregar
      </Text>
      <Box gap={'m'} paddingVertical={'m'}>
        {addons.map((addon) => (
          <Box
            key={addon.id}
            justifyContent={'center'}
            alignItems={'flex-start'}
            flex={1}
            width={'100%'}
            paddingHorizontal={'l'}
          >
            <CheckBox
              label={addon.name}
              onChange={(value) => {
                if (value) {
                  setSelectedAddons((prev) => [...prev, addon])
                } else {
                  setSelectedAddons((prev) =>
                    prev.filter((a) => a.id !== addon.id),
                  )
                }
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  )
}
