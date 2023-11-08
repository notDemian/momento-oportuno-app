import {
  AnunciosServices,
  DirectorioServices,
  MicrositiosServices,
  TypePackage,
} from '@src/api'

export const ResourceMapping = {
  directory: DirectorioServices.getDirectorioById,
  microsite: MicrositiosServices.getMicrositioById,
  listing: (id: string | number) => AnunciosServices.getAd(id, true),
} satisfies Record<TypePackage, any>
