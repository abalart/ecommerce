#Definimos una imagen base
FROM node

#Creamos carpeta donde vamos a guardar el proyeto
WORKDIR /app

#Copiar los packages de nuestra carpeta local a la carpeta de operaciones
COPY package*.json ./

#Corremos el comando para instalar dependencias
RUN npm install

#Tomamos el codigo del aplicativo
COPY . .
#Habilitamos el puerto para que escuche nuestra computadora
EXPOSE 8080

#Una vez creado el contenedor se correr con npm start (tener listo el comando en package.json)
CMD ["npm","start"]

