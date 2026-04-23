# Guia completa para implementar un modulo nuevo

Esta guia explica como crear un modulo completo siguiendo la arquitectura actual.
Incluye tambien que hacer cuando un modulo necesita relacionarse con otro.

## 1. Crear estructura base

Ejemplo para un modulo `tickets`:

```text
src/modules/tickets/
  components/
  constants/
  hooks/
  models/
  services/
  store/
  utils/
  views/
  index.ts
```

## 2. Definir dominio (models)

Crear en `models/`:

- `ticket.model.ts`: tipos de negocio (`Ticket`, `TicketFormData`)
- `ticket.dto.ts`: tipos de request/response (`TicketResponseDTO`)
- `ticket.mapper.ts`: conversion DTO -> modelo app

Objetivo: que la UI no dependa directamente de la forma de la API.

## 3. Implementar servicio (services)

Crear `tickets.service.ts` con operaciones CRUD:

- `getAllTickets`
- `getTicketById`
- `createTicket`
- `updateTicket`
- `deleteTicket`

Buenas practicas:

- El service solo maneja datos y errores tecnicos.
- No meter logica de UI aqui.

## 4. Crear estado del modulo (store)

Crear `tickets.store.tsx` con:

- estado: lista, loading, error, seleccionado
- setters
- provider + hook de acceso seguro

Objetivo: que toda la feature lea/escriba estado desde un punto central.

## 5. Casos de uso frontend (hooks)

Crear `useTicketsCrud.ts` para orquestar:

- validacion de formulario
- llamadas a servicios
- mapeo DTO -> modelo
- actualizacion de store

Aqui vive la logica de interaccion, no en la vista.

## 6. UI del modulo (components + views)

- `components/`: piezas reutilizables internas (formulario, lista, item)
- `views/`: pantalla que conecta componentes con hooks

Regla simple:

- Componente: presentacion y eventos
- Hook: comportamiento

## 7. Exponer API publica del modulo

En `index.ts` exportar solo lo necesario:

- pantalla principal
- provider/hook publico
- tipos necesarios

Ejemplo:

```ts
export { TicketsScreen } from './views/TicketsScreen';
export { TicketsProvider } from './store/tickets.store';
export { useTicketsCrud } from './hooks/useTicketsCrud';
export type { Ticket, TicketFormData } from './models/ticket.model';
```

## 8. Integrar en App

En la raiz, montar el provider y la screen del modulo dentro del navigator.

## 9. Checklist rapido antes de cerrar el modulo

- Tiene tipos en modelos, props, hooks y servicios.
- Tiene validaciones en `utils/`.
- No hay imports profundos desde otros modulos.
- Las dependencias externas estan encapsuladas en `services/`.
- `npx tsc --noEmit` pasa sin errores.

---

## Cuando un modulo se relaciona con otro

Este es el punto mas importante para escalar sin acoplamiento.

## Regla de oro

Un modulo no debe consumir archivos internos de otro modulo.

### Evitar

```ts
// Mal
import { algo } from '../auth/store/auth.store';
```

### Preferir

```ts
// Bien: consumir la API publica del modulo
import { useAuthStore } from '@/modules/auth';
```

Si no usas alias `@`, usa ruta relativa al `index.ts` publico del modulo.

## Estrategias segun el tipo de relacion

### Caso A: compartir tipos o utilidades genericas

Mover a `shared/`:

- tipos base
- helpers agnosticos
- componentes reutilizables

### Caso B: un modulo necesita dato puntual de otro

Exponer selector o funcion especifica en el `index.ts` del modulo origen.
No exponer toda la implementacion interna.

### Caso C: relacion bidireccional peligrosa

Si `A` depende de `B` y `B` de `A`, crear una capa intermedia:

- `shared/services`
- `shared/contracts`
- `application` de un modulo coordinador

Esto corta ciclos y evita dependencia circular.

## Ejemplo real: users + tickets

- `users` resuelve CRUD de usuarios.
- `tickets` resuelve CRUD de tickets.
- Un ticket pertenece a un usuario mediante `ownerUserId`.
- `tickets` consulta la API publica de `users` para validar el propietario y mostrar su nombre.
- `tickets` no toca el store interno de `users`.

## Patrones recomendados para relaciones limpias

- API publica por modulo (barrel `index.ts`)
- Contratos tipados (`interfaces`) para integracion
- Mappers entre contextos (si los modelos difieren)
- Selectors para exponer solo lo necesario

## Anti-patrones a evitar

- Importar `../otroModulo/store/...` directo
- Copiar tipos duplicados en varios modulos
- Resolver reglas de negocio en componentes visuales
- `shared/` como carpeta "cajon de sastre"

## Flujo recomendado para evolucionar modulos

1. Disenar modelo y DTO.
2. Implementar service.
3. Implementar store.
4. Implementar hook de casos de uso.
5. Implementar componentes y vista.
6. Exportar API publica.
7. Integrar con otros modulos por contratos publicos.
8. Validar tipos y probar flujo completo.
