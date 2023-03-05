import express from 'express'
import handlebars from 'express-handlebars'
import {Server} from 'socket.io'
import __dirname from './utils.js'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import session from 'express-session'
import initializePassport from "./config/passport.config.js"
import passport from "passport"
import run from "./run.js"; //Concentrador de rutas
import config from './config/config.js'

const app = express()


// Para traer info de post como JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Configurar el motor de plantillas
app.engine('handlebars',handlebars.engine()) //Inicializo el motor de planillas
app.set('views',__dirname +'/views')  //Le paso la ruta donde tiene que buscar las pantallas
app.set('view engine', 'handlebars')

// Carpeta publica
app.use(express.static(__dirname+'/public')) //Seteamos nuestra carpeta public

//Guardar sesion en BD

app.use(session({ //Acá le indico la base de datos donde guardar la sesion

    store:MongoStore.create({
       mongoUrl: config.mongoUrl,
       dbName: config.dbName,
    }),
    secret: config.secret,
    resave:false, //Mantiene la sesion viva
    saveUninitialized:true //Permite guardar cualquier sesion 
}))


//Autenticación
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//Conexion con la BD
mongoose.connect(config.mongoUrl, {dbName: config.dbName}, (error) => {
    if(error){
        console.log("DB No conected...")
        return
    }
     const httpServer = app.listen(config.port, () => console.log("Servidor arriba..."))
     const socketServer = new Server(httpServer)
     httpServer.on("error", () => console.log("ERROR DE SOCKET"))
     run(socketServer, app)
})

 




