
## Referencia

### La url base para todas las llamadas a la API es:

    https://api-restaurantes-test.herokuapp.com/

### Formato de respuesta


La respuesta es un Json con la siguiente estructura:

    {
        "data": mixta | dependiendo de la petición,
        "error": mixta | dependiendo de la petición (si hay alguno)
    }

## Llamadas a la API

#### Registrar un restaurante

```http
  POST /api/restaurant
```

`name`: **Requerido**.

`direction`: **Requerido**.

`description`: **Requerido**.

`city`: **Requerido**.

`url_photo`: **Requerido**.


#### Obtener todos los restaurantes

```http
  GET /api/restaurant
```

#### Obtener un restaurante en especifico

```http
  POST /api/restaurant/search
```

`text`: **Requerido**, el nombre o fracción del nombre, no importa si es mayúscula o minúscula.


#### Eliminar un restaurante

```http
  DELETE /api/restaurant/${id}
```

#### Registrar una reservación

```http
  POST /api/reservation
```
`reserved_by`: **Requerido**, string.

`restaurant_id`: **Required**, number

`date`: Opcional, si no se brinda una se utilizará la fecha actual como valor por defecto.

#### Obtener todas las reservaciones

```http
  GET /api/reservation
```
