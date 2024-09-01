# Usa la imagen oficial de Node.js como base
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el archivo de dependencias y package.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el código fuente de la aplicación al contenedor
COPY . .

# Construye la aplicación NestJS
RUN npm run build

# Expone el puerto que usará la aplicación (cambia si tu aplicación usa otro puerto)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]
