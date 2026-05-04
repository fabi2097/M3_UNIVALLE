# Notas API

Este proyecto es una API para guardar notas. Usa Node.js, Express, MongoDB y MySQL.

## Como ejecutar el proyecto

Primero instala las dependencias:

```bash
npm install
```
Despues crea tu archivo `.env`. Puedes mirar el archivo `.envExample` como ejemplo.

Para levantar el servidor:

```bash
node src/app.js
```

## Variables de MySQL

Para MySQL se usan estas variables:

```env
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DATABASE=notas_api
```

El nombre de la base de datos debe ser el mismo que pongas en `MYSQL_DATABASE`.

## Crear la base de datos MySQL

En la terminal entra a MySQL:

```bash
mysql -u root -p
```

Luego se crea la base:

```sql
CREATE DATABASE IF NOT EXISTS notas_api;
```


La tabla se llama `Notes`, porque Sequelize la crea desde el modelo `Note`.

## Nota sobre Sequelize

Las tablas las crea Sequelize automaticamente cuando el proyecto arranca, porque se usa:

```js
sequelize.sync({ alter: true })
```

## Rutas principales

Health check:

```text
GET /api/health
```

Autenticacion:

```text
POST /api/v1/auth/register
POST /api/v1/auth/login
```

Notas:

```text
POST   /api/v1/notes
GET    /api/v1/notes
GET    /api/v1/notes/:id
PUT    /api/v1/notes/:id
DELETE /api/v1/notes/:id
```
