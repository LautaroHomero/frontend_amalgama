# Amalgama frontend challenge

## Descripción
Este proyecto, busca la refactorización de un código frontend utilizando React para esto.

## Estructura del proyecto
El proyecto resuelve los puntos 1, 2 y 3 de la siguiente forma:
-**Punto 1 y 3**: Ambos están dentro de lo que es App.jsx, ahi podemos loguearnos integrando las respuesta de la peticion de la API y a su vez el refactor del codigo inicial.
-**Punto 2**: Este se encuentra en la carpeta src/state, donde tenemos el codigo utiliizando la estrategía pertinente y a su vez un json de devolución.


## Respuestas
-**1.1**: El problema principal es que el componente que nos presenta tiene muchas responsabilidades, carga datos, maneja logica y presentacion, lo mejor es tener varios componentes. El .map() no utiliza un key. Hay tambien una repeticion de estructura sin componente reutilizables (map dentro de contactsToDisplay)
-**1.3**:La nueva implementación mejora el componente original aplicando separación de responsabilidades, reutilización de componentes y una estructura clara. Se dividieron las funcionalidades en componentes específicos como `ContactList`y `UserProfile`, resolviendo la mezcla de lógica y vista. 
Además, busque evitar la repetición utilizando `ContactCard` y `AddressList`, intentado que el codigo sea mas escalable. Se corrigió también el uso de claves (`key`) en los `.map()`. Por otro lado, utilice `useState` y `useEffect` para manejar correctamente el estado local y la carga de datos, lo que mejora la legibilidad y el mantenimiento del código.
-**2.3**: Para la respuesta del json busque **normalizar los datos** por entidad:

- Separar `books`, `authors` y `users` por ID.
- Guardar solo relaciones por referencia (ej: `author_id`, `favorite_books_ids`).
- Evitar duplicar datos en múltiples partes del estado.

Esto mejora el rendimiento, simplifica el acceso a los datos y reduce inconsistencias.

Se usó **React puro**, utilizando:

- `useContext` para crear un contexto global (`StoreContext`)
- `useReducer` para manejar acciones como `LOAD_DATA`
- Un archivo `loadData.js` que:
  - Llama a los endpoints `/books` y `/users`
  - Normaliza los datos