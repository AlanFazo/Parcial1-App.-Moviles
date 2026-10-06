# 🛒 Lista de Compras

Parcial 1 - Aplicaciones Móviles (ISTEA)
App móvil desarrollada con React Native y Expo.

## Opción elegida

**Lista de compras inteligente.** Cada usuario se registra, inicia sesión y administra su propia lista de productos, con un resumen de pendientes y un recordatorio por notificación local.

## Video demo

▶️ [Ver video en YouTube] https://youtube.com/shorts/l6QpkwJsy2o

## Cómo ejecutar la app

### Requisitos
- Node.js (versión LTS)
- App **Expo Go** instalada en el celular (o un emulador de Android)
- Celular y PC conectados a la misma red Wi-Fi

### Pasos
```bash
# 1. Clonar el repositorio
git clone https://github.com/AlanFazo/Parcial1-App.-Moviles
cd lista-compras

# 2. Instalar dependencias
npm install

# 3. Iniciar la app
npx expo start
```

Escanear el QR que aparece en la terminal con Expo Go. Si se usa emulador de Android, presionar `a` en la terminal.

> **Nota:** al abrir la app en Expo Go puede aparecer un aviso rojo sobre notificaciones push remotas. Es un aviso propio de Expo Go (SDK 53+), no afecta la app: se cierra con "Dismiss". Las notificaciones locales funcionan normalmente.

### Tests
```bash
npm test
```

## Funcionalidades implementadas

- **Registro de usuarios** con usuario y contraseña (mínimo 3 y 4 caracteres) y control de usuarios repetidos.
- **Inicio de sesión** validando los datos guardados. La sesión se mantiene al cerrar la app.
- **Acceso protegido:** sin iniciar sesión solo se puede ver Login y Registro.
- **Gestión de productos:**
  - Agregar productos con nombre y cantidad.
  - Listar productos.
  - Marcar productos como comprados.
  - Eliminar productos.
  - Cada usuario ve solamente su propia lista.
- **Resumen inteligente** de pendientes (por ejemplo, "2 pendientes de 5").
- **Persistencia de datos** con AsyncStorage: usuarios, sesión y productos se conservan al cerrar la app.
- **Notificación local** de recordatorio de compra: se dispara a los 10 segundos e indica cuántos productos quedan pendientes.
- **Navegación** con React Navigation (Stack): Login, Registro, Home y Agregar producto.
- **Componente reutilizable:** `ProductItem`.
- **Tests** con Jest y React Native Testing Library: 5 tests que cubren el componente y la lógica de validación.

## Tecnologías

- React Native + Expo (SDK 54)
- React Navigation (Native Stack)
- AsyncStorage
- expo-notifications
- Jest + React Native Testing Library

## Estructura del proyecto

```
├── App.js
├── __tests__/            (tests de componente y lógica)
└── src/
    ├── components/       (ProductItem)
    ├── context/          (AuthContext)
    ├── screens/          (Login, Register, Home, AddProduct)
    ├── storage/          (acceso a AsyncStorage)
    └── utils/            (validaciones y notificaciones)
```

## Autor

Alan Igor Rusch
