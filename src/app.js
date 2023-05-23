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
import cookieParser from "cookie-parser";
import { addLogger } from "./utils/devLogger.js";
import swaggerUiExpress from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc'

const app = express()


app.use(addLogger)

// Para traer info de post como JSON
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

//Configurar el motor de plantillas
app.engine('handlebars',handlebars.engine()) //Inicializo el motor de planillas
app.set('views',__dirname +'/views')  //Le paso la ruta donde tiene que buscar las pantallas
app.set('view engine', 'handlebars')

// Carpeta publica
app.use(express.static(__dirname+'/public')) //Seteamos nuestra carpeta public

//Guardar sesion en BD
app.use(session({ //Acá le indico la base de datos donde guardar la sesion, variables tomadasa de variables de ambiente

    store:MongoStore.create({
       mongoUrl: config.mongoUrl,
       dbName: config.dbName,
    }),
    secret: config.secret,
    resave:false, //Mantiene la sesion viva
    saveUninitialized:true //Permite guardar cualquier sesion 
}))

//Documentacion
const SwaggerOptions = {
    definition:{
        openapi:'3.0.1',
        info: {
            title:'Documentación de ecomerce',
            description:'Este proyecto es un ecommerce'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`] //Ruta y estructura de donde se toma la documentación
}

const spects = swaggerJSDoc(SwaggerOptions)
app.use('/apidocs',swaggerUiExpress.serve,swaggerUiExpress.setup(spects))

//Autenticación
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//Conexion con la BD
mongoose.connect(config.mongoUrl, {dbName: config.dbName}, (error) => {
    if(error){
        req.logger.warning('DB No conected...')
        return
    }
    const httpServer = app.listen(8080, () => console.log("Server up..."))
    const socketServer = new Server(httpServer)
    httpServer.on("error", () => console.log("ERROR"))
    run(socketServer, app)

})

 




