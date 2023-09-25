### TODO 1.0

# URGENTES

1. [ ] Endpoints relacionados a Micrositios (getAll, getById) **_NOTA (v: 3.0):_** no funciona (ruta no encontrada)
2. [ ] Endpoint para crear un anuncio
3. Endpoints releacionados a la configuración de la cuenta del usuario
   - [ ] Mis anuncios (getAll, getById, **update**, **delete**)
   - [x] Favoritos (getAll, **delete**) **_NOTA (v: 3.0):_** no funciona del completo pues el getALl no me regresa los que ya guarde como favoritos
   - [ ] Mis órdenes (getAll, getById, **update**, **delete**)
   - [ ] Mensajes\*
   - **update** y **delete** son endpoints prescindibles, pero se pueden agregar para que el usuario pueda modificar o eliminar sus anuncios y favoritos

# NO URGENTES

1. [ ] Endpoint para campos extra dependiendo la categoría seleccionada (Campos extra y características)

### \*Mensajes

1. [ ] Planear la parte de mensajes

## TODO 2.0

# URGENTES

1. [ ] Endpoint para directorios (getAll, getById, post) **_NOTA (v: 3.0):_** getAll no me regresa los datos necesarios para desplegar algo en el front, y post falta por detallar el proceso de pago
2. [ ] Endpoint para crear micrositio
3. [ ] modificar el endpoint de los anuncios para que incluya información del vendedor, o en dado caso endpoint para obtener info del usuario por su id, para saber si tiene micrositio o no, agregado a esto, enviar las vistas que tenga cada anuncio y la información para saber si es anuncio destacado o normal **_NOTA (v: 3.0):_** se uso el endpoint /users/:id pero no me regresa toda la información que requiere

# TODO 3.0

1. [ ] habilitar search param para los anuncios **Lo revisaré en el front primero**
2. [ ] habilitar woocommerce
<!-- 3. [ ] -->
