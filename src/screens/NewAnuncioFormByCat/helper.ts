import { CheckBoxListItem } from '@src/components/CheckboxList'
import { type NewAnuncioCategorias } from '@src/data'

export function getArrays(categoria: NewAnuncioCategorias) {
  let newSubCategoriaData: string[] = []
  let newCheckboxData: CheckBoxListItem[] = []
  let title = 'Características'

  switch (categoria) {
    case 'Inmuebles':
      title = 'Caracteristicas de la propiedad'
      newSubCategoriaData = [
        'Apartamentos',
        'Comercial',
        'Casas',
        'Terrenos',
        'Oficinas',
      ]

      newCheckboxData = [
        {
          label: 'Administración',
          id: 'Administración',
        },
        {
          label: 'Aire Acondicionado',
          id: 'Aire Acondicionado',
        },
        {
          label: 'Amueblado',
          id: 'Amueblado',
        },
        {
          label: 'Arquitectura contemporánea',
          id: 'Arquitectura contemporánea',
        },
        {
          label: 'Atico',
          id: 'Atico',
        },
        {
          label: 'Balcón',
          id: 'Balcón',
        },
        {
          label: 'Bañera de hidromasaje',
          id: 'Bañera de hidromasaje',
        },
        {
          label: 'Calefacción',
          id: 'Calefacción',
        },
        {
          label: 'Chimenea',
          id: 'Chimenea',
        },
        {
          label: 'Cocina',
          id: 'Cocina',
        },
        {
          label: 'Elevador',
          id: 'Elevador',
        },
        {
          label: 'Instalaciones para discapacitados',
          id: 'Instalaciones para discapacitados',
        },
        {
          label: 'Internet Banda Ancha',
          id: 'Internet Banda Ancha',
        },
        {
          label: 'Jardín',
          id: 'Jardín',
        },
        {
          label: 'Lavandaría',
          id: 'Lavandaría',
        },
        {
          label: 'Lavavajillas',
          id: 'Lavavajillas',
        },
        {
          label: 'Microwave',
          id: 'Microwave',
        },
        {
          label: 'Parilla',
          id: 'Parilla',
        },
        {
          label: 'Refrigerator',
          id: 'Refrigerator',
        },
        {
          label: 'Secadora',
          id: 'Secadora',
        },
        {
          label: 'Security system',
          id: 'Security system',
        },
        {
          label: 'Techos altos',
          id: 'Techos altos',
        },
        {
          label: 'Ventilador de Techo',
          id: 'Ventilador de Techo',
        },
        {
          label: 'Washer',
          id: 'Washer',
        },
        {
          label: 'WiFi',
          id: 'WiFi',
        },
      ]
      break
    case 'Vehículos':
      title = 'Características del vehículo'
      newSubCategoriaData = [
        'Aeronaves',
        'Botes',
        'Carros',
        'Construcción',
        'Motos',
        'Camiones',
        'Vans',
      ]

      newCheckboxData = [
        {
          label: 'ABS',
          id: 'ABS',
        },
        {
          label: 'Amplio kit de herramientas',
          id: 'Amplio kit de herramientas',
        },
        {
          label: 'Arranque sin llave',
          id: 'Arranque sin llave',
        },
        {
          label: 'Asiento con memoria',
          id: 'Asiento con memoria',
        },
        {
          label: 'Asientos climatizados',
          id: 'Asientos climatizados',
        },
        {
          label: 'Asientos con calefacción',
          id: 'Asientos con calefacción',
        },
        {
          label: 'Asientos de piel',
          id: 'Asientos de piel',
        },
        {
          label: 'Cámara 360 Grados',
          id: 'Cámara 360 Grados',
        },
        {
          label: 'Control de tracción',
          id: 'Control de tracción',
        },
        {
          label: 'Neumáticos de rendimiento',
          id: 'Neumáticos de rendimiento',
        },
        {
          label: 'Sensor de punto ciego',
          id: 'Sensor de punto ciego',
        },
        {
          label: 'Sistema de navegación',
          id: 'Sistema de navegación',
        },
        {
          label: 'Sistema de sonido',
          id: 'Sistema de sonido',
        },
      ]
      break
    case 'Empleos':
      title = 'Tipo de contrato'
      newSubCategoriaData = [
        'Contabilidad',
        'Empleos de mercadotecnia',
        'Pasantías',
        'Trabajos de limpieza',
        'Trabajos de limpieza',
        'Trabajos de TI',
      ]
      newCheckboxData = [
        {
          label: 'Contrato',
          id: 'Contrato',
        },
        {
          label: 'Permanente',
          id: 'Permanente',
        },
        {
          label: 'Trabajadores por cuenta propia',
          id: 'Trabajadores por cuenta propia',
        },
      ]
      break
    case 'Servicios':
      title = 'Tipo de servicio'
      newSubCategoriaData = [
        'Servicios Automotrices',
        'Belleza',
        'Servicios de limpieza',
        'Servicios financieros',
        'Jardinería',
        'Servicios para el hogar',
        'Bodas',
      ]
      // prettier-ignore
      newCheckboxData = [{label: 'Actualización de hardware',id: 'Actualización de hardware',},{label: 'Boutonnieres',id: 'Boutonnieres',},{label: 'Configuración de correo electrónico',id: 'Configuración de correo electrónico',},{label: 'Conjunto completo de acrílico',id: 'Conjunto completo de acrílico',},{label: 'Cotizaciones gratis',id: 'Cotizaciones gratis',},{label: 'Diagnósticos',id: 'Diagnósticos',},{label: 'Diseño de cabello femenino',id: 'Diseño de cabello femenino',},{label: 'Flores',id: 'Flores',},{label: 'Instalación de paneles de yeso',id: 'Instalación de paneles de yeso',},{label: 'Insurance',id: 'Insurance',},{label: 'Limpieza de alfombra',id: 'Limpieza de alfombra',},{label: 'Limpieza de cristales',id: 'Limpieza de cristales',},{label: 'Manicures',id: 'Manicures',},{label: 'Maquillaje de moda',id: 'Maquillaje de moda',},{label: 'Maquillaje de novia',id: 'Maquillaje de novia',},{label: 'Mens hair cut',id: 'Mens hair cut',},{label: 'Painting',id: 'Painting',},{label: 'Party makeup',id: 'Party makeup',},{label: 'Pasteles',id: 'Pasteles',},{label: 'Pedicures',id: 'Pedicures',},{label: 'Polish change',id: 'Polish change',},{label: 'Portrait Packages',id: 'Portrait Packages',},{label: 'Professional advisory',id: 'Professional advisory',},{label: 'Ramilletes',id: 'Ramilletes',},{label: 'Ramos',id: 'Ramos',},{label: 'Real estate',id: 'Real estate',},{label: 'Reparación automática',id: 'Reparación automática',},{label: 'Reparación de coches clásicos',id: 'Reparación de coches clásicos',},{label: 'Rubbish clearance',id: 'Rubbish clearance',},{label: 'Secador de Mano',id: 'Secador de Mano',},{label: 'Soldering flux',id: 'Soldering flux',},{label: 'Soldering iron',id: 'Soldering iron',},{label: 'Soldering paste',id: 'Soldering paste',},{label: 'Total cleaning',id: 'Total cleaning',},{label: 'Tune-Ups',id: 'Tune-Ups',},{label: 'Velas',id: 'Velas',},{label: 'Wealth management',id: 'Wealth management'}]
      break
    case 'Comunidad':
      title = 'Características de la comunidad'
      newSubCategoriaData = [
        'Anuncios',
        'Artículos buscados',
        'Cosas gratis',
        'Perdido y encontrado',
        'Voluntarios',
      ]
      newCheckboxData = [
        {
          label: 'En Persona',
          id: 'En Persona',
        },
        {
          label: 'Inscripciones abiertas',
          id: 'Inscripciones abiertas',
        },
        {
          label: 'Registro cerrado',
          id: 'Registro cerrado',
        },
        {
          label: 'Virtual',
          id: 'Virtual',
        },
      ]
      break
    case 'Electrónicos':
      newSubCategoriaData = [
        'Celulares',
        'Equipos de Cómputo',
        'Juegos y Videoconsolas',
        'Software',
      ]
      newCheckboxData = [
        {
          label: '1 año de garantía',
          id: '1 año de garantía',
        },
        {
          label: 'Devoluciones fáciles',
          id: 'Devoluciones fáciles',
        },
        {
          label: 'En garantía',
          id: 'En garantía',
        },
        {
          label: 'Envío gratis',
          id: 'Envío gratis',
        },
        {
          label: 'Garantía de devolución del dinero',
          id: 'Garantía de devolución del dinero',
        },
        {
          label: 'Pago seguro',
          id: 'Pago seguro',
        },
        {
          label: 'Pedido seguro',
          id: 'Pedido seguro',
        },
      ]
      break
    case 'Mascotas':
      title = 'Características de la mascota'
      newSubCategoriaData = [
        'Aves',
        'Gatos',
        'Perros',
        'Peces',
        'Pequeños peludos',
      ]

      newCheckboxData = [
        {
          label: 'Edad: 1 año',
          id: 'Edad: 1 año',
        },
        {
          label: 'Edad: 2 años',
          id: 'Edad: 2 años',
        },
        {
          label: 'Edad: 5 semanas',
          id: 'Edad: 5 semanas',
        },
        {
          label: 'Edad: 6 meses',
          id: 'Edad: 6 meses',
        },
        {
          label: 'Listo para irse: ahora',
          id: 'Listo para irse: ahora',
        },
        {
          label: 'Listo para salir: en 1 semana',
          id: 'Listo para salir: en 1 semana',
        },
        {
          label: 'Listo para salir: en 2 semanas',
          id: 'Listo para salir: en 2 semanas',
        },
        {
          label: 'Listo para salir: en 3 semanas',
          id: 'Listo para salir: en 3 semanas',
        },
        {
          label: 'Listo para salir: en 4 semanas',
          id: 'Listo para salir: en 4 semanas',
        },
        {
          label: 'Listo para salir: en 5 semanas',
          id: 'Listo para salir: en 5 semanas',
        },
        {
          label: 'Listo para salir: en 6 semanas',
          id: 'Listo para salir: en 6 semanas',
        },
        {
          label: 'Listo para salir: en 7 semanas',
          id: 'Listo para salir: en 7 semanas',
        },
        {
          label: 'Listo para salir: en 8 semanas',
          id: 'Listo para salir: en 8 semanas',
        },
      ]
      break
    case 'Moda':
      newSubCategoriaData = [
        'Joyería',
        'Ropa de hombre',
        'Bolsos de mujer',
        'Ropa de mujer',
      ]

      newCheckboxData = [
        {
          label: '1 año de garantía',
          id: '1 año de garantía',
        },
        {
          label: 'Devoluciones fáciles',
          id: 'Devoluciones fáciles',
        },
        {
          label: 'En garantía',
          id: 'En garantía',
        },
        {
          label: 'Envío gratis',
          id: 'Envío gratis',
        },
        {
          label: 'Garantía de devolución del dinero',
          id: 'Garantía de devolución del dinero',
        },
        {
          label: 'Pago seguro',
          id: 'Pago seguro',
        },
        {
          label: 'Pedido seguro',
          id: 'Pedido seguro',
        },
      ]
      break
    case 'Para niños':
      newSubCategoriaData = [
        'Accesorios para niños',
        'Ropa de niños',
        'Cochecitos y sillas de paseo',
        'Juguetes',
      ]
      newCheckboxData = [
        {
          label: '1 año de garantía',
          id: '1 año de garantía',
        },
        {
          label: 'Devoluciones fáciles',
          id: 'Devoluciones fáciles',
        },
        {
          label: 'En garantía',
          id: 'En garantía',
        },
        {
          label: 'Envío gratis',
          id: 'Envío gratis',
        },
        {
          label: 'Garantía de devolución del dinero',
          id: 'Garantía de devolución del dinero',
        },
        {
          label: 'Pago seguro',
          id: 'Pago seguro',
        },
        {
          label: 'Pedido seguro',
          id: 'Pedido seguro',
        },
      ]
      break
    default:
      categoria
      break
  }

  return {
    subCategoriaData: newSubCategoriaData,
    checkboxData: newCheckboxData,
    title,
  }
}
