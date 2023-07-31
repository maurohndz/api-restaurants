# Inicialización de API de NestJS

Esta guía te ayudará a configurar y ejecutar una API de NestJS con diferentes entornos (qa, development y prod) utilizando Yarn.

## Requisitos previos

Asegúrate de tener instalado Node.js y Yarn en tu sistema. Puedes descargar Node.js desde el sitio web oficial ([https://nodejs.org](https://nodejs.org)) y Yarn desde su sitio web ([https://yarnpkg.com](https://yarnpkg.com)).

## Pasos de configuración

1. Clona este repositorio en tu máquina local:

```
git clone https://github.com/maurohndz/api-restaurants
cd <api-restaurants>
```


2. Instala las dependencias utilizando Yarn:

```
yarn install
```


3. Configura los archivos `.env.enviroment`:

En la carpeta `environments`, encontrarás un archivo de ejemplo llamado `env-example`. Crea un archivo `.env.enviroment` para cada entorno (qa, development y prod) basado en el archivo de ejemplo proporcionado. Asegúrate de configurar adecuadamente las variables de entorno necesarias para cada caso.

## Ejecución de la API

Puedes ejecutar la API utilizando los siguientes comandos:

- **Entorno de desarrollo (development):**
```
yarn run start:dev
```

- **Entorno de desarrollo (qa):**
```
yarn run start:qa
```

- **Entorno de desarrollo (prod):**
```
yarn start
```

El comando seleccionado iniciará la aplicación en el entorno correspondiente.

## Construcción del proyecto

Si necesitas construir el proyecto para desplegarlo en un servidor, puedes utilizar los siguientes comandos:

- **Entorno de desarrollo (development):**
```
yarn run build:development
```

- **Entorno de qa (qa):**
```
yarn run build:qa
```

- **Entorno de desarrollo (prod):**
```
yarn rbuild
```

Cada comando de construcción generará los archivos listos para desplegar en el directorio `dist`.

## Gestión de la Base de Datos

Utiliza los siguientes comandos para gestionar la base de datos:

- **Montar la base de datos:**
```
yarn run db:push:dev
```

- **Montar la modelos:**
```
yarn run db:pull:dev
```

- **Ejecutar los seeders:**
```
yarn run db:seed:dev
```

Estas opciones solo estan diponibles en el ambiente de desarrollo.

### Configuracion de la Base de Datos

Se debe ejecutar el siguinte comando en la DB:

```
-- Extension: "uuid-ossp"

-- DROP EXTENSION "uuid-ossp";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp"
    SCHEMA public
    VERSION "1.1";
```

## License

Nest is [MIT licensed](LICENSE).
