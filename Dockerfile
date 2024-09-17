# Usa la imagen oficial de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Instala dependencias necesarias para Docker y Docker Compose en Alpine
RUN apk update && apk add --no-cache \
    docker-cli \
    docker-compose
RUN apk add --no-cache python3 py3-pip

# Copia el archivo de dependencias package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias de Node.js
RUN npm install

# Copia el código fuente de la aplicación al contenedor
COPY . .

# Construye la aplicación NestJS
RUN npm run build

# Expone el puerto que usará la aplicación
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]
