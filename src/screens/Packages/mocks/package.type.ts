export type PackageFakeData = {
  id: number
  name: string
  displayPrice: string
  price: number
  duration: number
  featured: number
  isFeatured: boolean
  label?: string
  text?: string
  adsNumber?: number
  bumpsNumber?: number
  bumpInterval?: number
}

export const FAKE_PAQUETES: PackageFakeData[] = [
  {
    name: 'Básico',
    displayPrice: '$ 100',
    price: 100,
    duration: 7,
    featured: 1,
    isFeatured: false,
  },
  {
    name: 'InmoExpress',
    displayPrice: '$ 800',
    price: 800,
    duration: 7,
    featured: 3,
    isFeatured: false,
    adsNumber: 1,
    bumpsNumber: 1,
    bumpInterval: 7,
  },
  {
    name: 'AutoVendex',
    displayPrice: '$ 600',
    price: 600,
    duration: 7,
    featured: 3,
    isFeatured: false,
    adsNumber: 1,
    bumpsNumber: 1,
    bumpInterval: 7,
  },
  {
    name: 'EmpleoSpot',
    displayPrice: '$ 350',
    price: 350,
    duration: 7,
    featured: 0,
    isFeatured: false,
    adsNumber: 1,
    bumpsNumber: 1,
    bumpInterval: 7,
  },
  {
    name: 'Gratis',
    displayPrice: '$ 0',
    price: 0,
    duration: 14,
    featured: 0,
    isFeatured: false,
    adsNumber: 1,
    bumpsNumber: 1,
    bumpInterval: 7,
  },
  {
    name: 'PaqueteEmpleo',
    label: 'Publica tu Vacante Ahora por 7 días',
    text: '¿Estás buscando reclutar a profesionalespara tu empresa?',
    displayPrice: '$ 289',
    price: 289,
    duration: 7,
    featured: 3,
    isFeatured: true,
    adsNumber: 1,
    bumpsNumber: 1,
    bumpInterval: 7,
  },
  {
    name: 'Paquete Empleo PLUS',
    label: 'Paquete Empleo Plus Publica Múltiples vacantes a bajo costo',
    text: 'Nuestra plataforma de empleo alcanza a una amplia audiencia de profesionales calificados en diversos campos.',
    displayPrice: '$ 350',
    price: 350,
    duration: 7,
    featured: 3,
    isFeatured: true,
    adsNumber: 2,
    bumpsNumber: 1,
    bumpInterval: 7,
  },
  {
    name: 'Paquete Inmueble',
    label: 'Paquete Inmueble Platino',
    text: 'Nuestro paquete de anuncio especial te ofrece la plataforma perfecta para mostrar tu propiedad a un público ansioso por encontrar su próximo hogar. ¡No pierdas esta oportunidad de destacar y vender tu casa de manera efectiva',
    displayPrice: '$ 900',
    price: 900,
    duration: 20,
    featured: 3,
    isFeatured: true,
    adsNumber: 1,
    bumpsNumber: 1,
    bumpInterval: 7,
  },
  {
    name: 'Paquete Vehiculos',
    label: 'Paquete Vehiculos Premium',
    text: 'Nuestro paquete de anuncio premium te ofrece las herramientas necesarias para captar la atención de compradores potenciales y cerrar la venta en poco tiempo. ¡Maximiza la visibilidad de tu vehículo con nuestra ayuda',
    displayPrice: '$ 750',
    price: 750,
    duration: 14,
    featured: 3,
    isFeatured: true,
    adsNumber: 1,
    bumpsNumber: 1,
    bumpInterval: 7,
  },
  {
    name: 'Paquete Electronicos',
    label: 'Paquete Electronicos Premium',

    text: 'Nuestro paquete de anuncio premium es tu boleto para vender tus dispositivos electrónicos de manera efectiva y encontrar a alguien que aprecie tus productos. ¡No dejes pasar la oportunidad de darle a tus electrónicos una segunda vida!',
    displayPrice: '$ 399',
    price: 399,
    duration: 28,
    featured: 3,
    isFeatured: true,
    adsNumber: 1,
    bumpsNumber: 1,
    bumpInterval: 7,
  },
  {
    name: 'Paquete Moda',
    label: 'Paquete Moda Premium',
    text: 'Nuestro paquete de anuncio premium te brinda la plataforma perfecta para vender tus artículos de moda de manera efectiva y encontrar compradores que compartan tu pasión por el estilo.',
    displayPrice: '$ 350',
    price: 350,
    duration: 20,
    featured: 3,
    isFeatured: true,
    adsNumber: 1,
    bumpsNumber: 1,
    bumpInterval: 7,
  },
].map((p, i) => {
  return { ...p, id: i }
})
