# Como arrancar el proyecto en Web

Esta guia te permite ejecutar la app en navegador usando Expo y ver la navegacion entre Users y Tickets.

## Requisitos

- Node.js instalado
- npm disponible
- Dependencias del proyecto instaladas

## Instalacion inicial

Desde la raiz del proyecto:

```bash
npm install
```

Si hace falta soporte web:

```bash
npx expo install react-dom react-native-web
```

## Ejecutar en web

```bash
npm run web
```

Tambien puedes usar:

```bash
npx expo start --web
```

Expo abrira el navegador automaticamente. Si no lo hace, abre la URL que aparece en terminal (normalmente `http://localhost:19006`).

## Que vas a ver

- Pantalla de Users
- Pantalla de Tickets
- Boton para navegar entre ambas vistas
- CRUD en memoria funcionando sin backend real

## Verificacion rapida de TypeScript

Antes de levantar web, puedes validar tipos:

```bash
npx tsc --noEmit
```

## Problemas comunes

### 1) Puerto ocupado

Si el puerto esta en uso, Expo te ofrece otro automaticamente.

### 2) Cache inconsistente

```bash
npx expo start --web -c
```

### 3) Dependencias rotas

```bash
rm -rf node_modules package-lock.json
npm install
npm run web
```

En Windows PowerShell, en lugar de `rm -rf`:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
npm run web
```

## Comandos utiles

- `npm run start`: inicia Expo en modo general
- `npm run web`: inicia en navegador
- `npm run android`: abre en Android
- `npm run ios`: abre en iOS (requiere entorno compatible)
