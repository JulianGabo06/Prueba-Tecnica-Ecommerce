# Ecommerce

ShopZone Pro es una aplicación web de comercio electrónico diseñada para permitir a los usuarios ver productos, registrarse, iniciar sesión y gestionar productos con operaciones avanzadas como agregar, actualizar y eliminar. La aplicación implementa roles y permisos para diferenciar las funcionalidades a las que tienen acceso los usuarios, proporcionando un entorno seguro y fácil de usar tanto para los administradores como para los clientes.

## Funcionalidades Principales

1. ### Autenticación y Registro de Usuarios
   - Los usuarios pueden registrarse proporcionando su nombre, correo electrónico y contraseña.
   - Sistema de autenticación para el inicio de sesión.
   - Flujo completo para recuperar contraseñas olvidadas.
   - Protección de rutas para restringir el acceso a usuarios no autenticados.
2. ### Roles y Permisos
   - Roles definidos `Administrador` y `Usuario`.
   - Los administradores tienen acceso exclusivo a funcionalidades como la gestión de productos.
   - Los usuarios estándar pueden navegar y comprar productos.
3. ### Gestión de Sesión
   - Funcionalidades para cambiar de cuenta y cerrar sesión.
   - Manejo seguro de la sesión con tokens JWT y cookies.
4. ### CRUD de Productos
   - Los administradores pueden agregar, editar y eliminar productos.
   - Los usuarios pueden buscar y filtrar productos en la tienda.
5. ### UI/UX y Diseño Responsive
   - Diseño responsive utilizando TailwindCSS y Material UI.
   - Todas las páginas están optimizadas para dispositivos móviles y pantallas grandes.
6. ### Seguridad de la Aplicación
   - Validación de datos tanto en el frontend como en el backend.
   - Middleware para verificar roles y permisos antes de permitir acceso a rutas.
   - Configuración de headers de seguridad para protección adicional.
7. ### Escalabilidad y Rendimiento
   - Uso de SSR (Server-Side Rendering) o SSG (Static Site Generation) para optimizar el - rendimiento de la aplicación.
   - Implementación de lazy loading para imágenes.
   - División de código para mejorar los tiempos de carga.
8. ### Pruebas de la Aplicación
   - Pruebas unitarias e integradas con Jest y Testing Library.
   - Pruebas end-to-end con Cypress.
   - Estructura del Proyecto

```
ecommerce_front/
│
├── public/                # Archivos públicos como imágenes y otros recursos.
├── src/
│   ├── components/        # Componentes reutilizables.
│   ├── app/               # Páginas principales de la aplicación.
│   ├── api/               # Servicios API y lógica del backend.
│   ├── hooks/             # Hooks personalizados.
│   ├── store/             # Gestión del estado global Zustand.
│   └── resources/         # Utilidades y helpers.
|   |-- views/             # Gestiona toda la logica y renderizado de las vistas en el cliente
|       |-- auth           #Grupo de vistas
|           |-- signin/
|               |-- index.tsx
|               |-- useSignIn.ts
├── .env                   # Variables de entorno para configuración.
├── next.config.mjs        # Configuración de Next.js.
├── jest.config.js         # Configuración de Jest para pruebas.
└── README.md              # Documentación del proyecto.
```

```
ecommerce_back/
│
├── public/                # Archivos públicos como imágenes y otros recursos.
├── src/
│   ├── assets/            # creacion de html recover password.
│   ├── config/            # Configuraciones de variables de entorno.
│   ├── controllers/       # controladores del aplicativo.
│   ├── helpers/           # funciones que ayudan a la mejora de los routers.
│   ├── middlewares/       # Manejo de validaciones por roles y usuarios.
│   └── Models/            # Modelos de tablas.
|   |-- private/           # Almacenamiento de imagenes
|   |-- router/            # Gestion de rutas del aplicativo
|   |-- utils/             # Funciones de creacion de tokens, manejo de archivos, etc
├── .env                   # Variables de entorno para configuración.
└── README.md              # Documentación del proyecto.
```

## Configuración del Proyecto

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/tuusuario/ecommerce.git
```

### Navega al directorio del proyecto e instala las dependencias:

```bash
cd ecommerce
```

(En mi caso usé bun, puede usar el que mas se acomode ejemplo con npm)

```bash
cd ecommerce_front & npm install
```

Instalar las dependecias también del backend

```bash
cd .. & cd ecommerce_back & npm install
```

Agrega el archivo `.env` en la raiz del fichero del backend `/ecommerce_back/.env` y reemplaza las variables de entorno de la base de datos por las de tu DB. (Ahí tienes un .env.example de ejemplo de como ponerlas)

Agrega el archivo `.env` en la raiz del fichero del front `/ecommerce_front/.env` La unica variable de entorno que toma es `URL_BACK` ejemplo:

```
URL_BACK=http//localhost:3200/api/
```

#### ¡Importante¡ Cuando se cree la db y se haga la coneccion cree un usuario en el aplicativo web y cambiele el rol en la tabla de users`

#### ¡Importante¡ la variable debe de terminar en `api/`

#### Nota: si deseas cambiar la URL del backend debes de hacerlo en el .env y en el archivo que está en `/src/api/back.ts/`.

#### Ahora ejecutar el backend y front en modo dev

```bash
cd ecommerce_front & npm run dev
```

Este se levanta en el puerto [`4030`](http://localhost:4030).

```bash
cd ecommerce_back & npm run dev
```

Este se levanta en el puerto [`5000`](http://localhost:5000).

## Rutas a la cual puedes acceder

##### Tipo de usuario `User` o sin loguearse

- /
- /products
- /signup
- /orders
- /Cart

##### Tipo de usuario `Admin`

- /
- /products
- /signup
- /recover-password
- /change-password
- /admin
- /admin/products
- /admin/products/create-product
- /admin/categories
- /admin/categories/create-category
- /admin/orders

### Este proyecto está realizado con las tecnologias de

Backend: Node.js, express, jwt, express validator, mariadb, sequelize.

Frontend: Next.js v14.2, typescript, react, zustand para el manejo de estados, middleware de next para la protección de ruas, lo podrás encontrar en el archivo `src/middleware.ts`.
