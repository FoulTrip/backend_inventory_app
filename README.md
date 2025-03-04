# Inventory Management SaaS Backend

## Descripción General
Este proyecto es un backend desarrollado en NestJS que implementa una arquitectura multi-tenant para la gestión de inventarios. El sistema permite a múltiples inquilinos (tenants) gestionar productos, inventario, compras, ventas y más.

## Estructura del Proyecto
```bash
src/
├── app.controller.ts
├── app.module.ts
├── app.service.ts
├── auth/
├── category/
├── inventory/
├── locations/
├── prisma/
├── product/
├── purchases/
├── sales/
├── tenants/
├── user-on-tenant/
├── users/
└── main.ts
```
## Principales Características

### 1. Arquitectura Multi-Tenant
Cada tenant tiene su propio espacio de trabajo separado.
Los datos están completamente aislados entre tenants.
Implementación basada en Prisma ORM con MongoDB.

### 2. Gestión de Usuarios
 - Sistema de roles y permisos:
    - SUPER_ADMIN
    - TENANT_ADMIN
    - MANAGER
    - INVENTORY_MANAGER
    - SALES_AGENT
    - CASHIER
    - USER
 - Relación muchos-a-muchos entre usuarios y tenants.

### 3. Gestión de Inventario
 - Control detallado de productos
 - Seguimiento de stock por ubicaciones
 - Gestión de números de serie y lotes
 - Control de fechas de vencimiento

### 4. Compras y Ventas
 - Gestión completa del ciclo de compras
 - Sistema de ventas con múltiples métodos de pago
 - Generación de facturas

### 5. Ajustes de Inventario
 - Registro de ajustes por diversos motivos:
    - Daños
    - Pérdidas
    - Vencimientos
    - Donaciones

# Entidades Principales
## Tenant (Inquilino)
```typescript
model Tenant {
    id         String
    name       String
    slug       String
    logo       String?
    address    String?
    phone      String?
    email      String?
    taxId      String?
    currency   CurrencyType
    timezone   TimeZones
    websiteUrl String?
    active     Boolean
    createdAt  DateTime
    updatedAt  DateTime
}
```

## User (Usuario)
```typescript
model User {
    id        String
    email     String
    password  String
    firstName String
    lastName  String
    phone     String?
    avatar    String?
    isActive  Boolean
    role      Role
    lastLogin DateTime?
    createdAt DateTime
    updatedAt DateTime
}
```

## Product (Producto)
```typescript
model Product {
    id              String
    sku             String
    barcode         String?
    name            String
    description     String?
    brand           String?
    model           String?
    images          String[]
    cost            Float
    price           Float
    taxRate         Float
    unitOfMeasure   String
    minStockLevel   Int
    maxStockLevel   Int?
    reorderPoint    Int
    weight          Float?
    dimensions      Json?
    isActive        Boolean
    isPerishable    Boolean
    hasSerialNumber Boolean
    notes           String?
    createdAt       DateTime
    updatedAt       DateTime
}
```

# Endpoints Principales
## Autenticación
```bash
POST /auth
GET /auth
GET /auth/:id
PATCH /auth/:id
DELETE /auth/:id
```

## Tenants
```bash
POST /tenants
GET /tenants
GET /tenants/:id
PUT /tenants/:id
DELETE /tenants/:id
```

## Usuarios
```bash
POST /users
GET /users
GET /users/:id
PUT /users/:id
DELETE /users/:id
```

## Productos
```bash
POST /products
GET /products
GET /products/:id
PUT /products/:id
DELETE /products/:id
```

Inventario
```bash
POST /inventory
GET /inventory
GET /inventory/:id
PUT /inventory/:id
DELETE /inventory/:id
```

# Configuración del Proyecto
## Variables de Entorno
Crear un archivo .env con las siguientes variables:
```bash
DATABASE_URL=
PORT=3000
JWT_SECRET=
```

# Scripts Disponibles

```bash
# Instalar dependencias
npm install

# Formatear código
npm run format


# Ejecutar servidor de desarrollo
npm run start:dev


# Construir proyecto
npm run build

# Ejecutar tests
npm run test
```

# Integración con Frontend
## Puntos Importantes para el Desarrollador Frontend
### 1. Autenticación
 - Todos los endpoints requieren autenticación JWT
 - El token debe enviarse en el header Authorization: Bearer <token>

### 2. Endpoints Multi-Tenant
 - La mayoría de los endpoints requieren el tenantId como parámetro
 - Ejemplo: `/products?tenantId=12345`

### 3. Manejo de Roles
 - Cada endpoint tiene permisos específicos según el rol del usuario
 - Verificar los permisos necesarios en la documentación de cada módulo

### 4. Paginación
 - La mayoría de los endpoints de listado soportan paginación
 - Parámetros comunes: page, limit

### 5. Filtros y Ordenamiento
 - Soporte para filtros básicos mediante query parameters
 - Ejemplo: `/products?name=producto&isActive=true`

### 6. Formato de Respuesta
```json
{
  "success": true,
  "data": [],
  "error": null,
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10
  }
}
```

# Recomendaciones para el Frontend
## 1. Estructura de Carpetas
```bash
src/
├── components/
├── pages/
│   ├── auth/
│   ├── tenants/
│   ├── users/
│   ├── products/
│   ├── inventory/
│   └── ...
├── services/
│   └── api/
├── hooks/
├── contexts/
└── utils/
```

## 2. Servicios API
 - Crear servicios separados para cada módulo
 - Implementar interceptores para manejar tokens y errores

## 3. Contextos Globales
 - AuthContext para manejar autenticación
 - TenantContext para manejar tenant activo

## 4. Manejo de Estado
 - Usar context o state management library (Redux, Zustand, etc.)
 - Mantener estado global del tenant actual
 - Manejar lista de permisos del usuario

## 5. Requisitos del Sistema
 - Node.js v20+
 - MongoDB
 - npm/yarn

## Contribución
1. Fork del repositorio
2. Crear branch (git checkout -b feature/AmazingFeature)
3. Commit cambios (git commit -m 'Add some AmazingFeature')
4. Push al branch (git push origin feature/AmazingFeature)
5. Crear Pull Request
