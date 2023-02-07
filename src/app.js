import express from 'express'
import productRouter from './routes/productsBD.router.js'
import cart from './routes/carts.router.js'
import handlebars from 'express-handlebars'
import {Server} from 'socket.io'
import routerViews from './routes/views.router.js'
import __dirname from './utils.js'
import mongoose from 'mongoose'
import users from './routes/users.router.js'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import session from 'express-session'
//import initializrPassport from "./config/passpor.config.js";
//import passport from "passport";


const app = express()

//Mi DB
const MongoUri = "mongodb+srv://abalart:yD3VgDOgFUHlnpei@ecommerce.mkzzehb.mongodb.net/test"
const MongoDbName = "ecommerce"

// Para traer info de post como JSON
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Configurar el motor de plantillas
app.engine('handlebars',handlebars.engine()) //Inicializo el motor de planillas
app.set('views',__dirname +'/views')  //Le paso la ruta donde tiene que buscar las pantallas
app.set('view engine', 'handlebars')

// Carpeta publica
app.use(express.static(__dirname+'/public')) //Seteamos nuestra carpeta public
 
// Configuracion de rutas
app.use('/', routerViews) //las rutas sin api, corresponden a vistas a partir de ahora.
app.use('/api/products',productRouter)  //Conecto router y me traigo todos los endpoints, en POSTMAN siempre va a ser /api/products/ + la ruta que se defina en el archivo router
app.use('/api/cart',cart) //Conecto router y me traigo todos los endpoints
//Agrego router users
app.use('/api/users',users) //Conecto router y me traigo todos los endpoints

// Corriendo el servidor
const httpServer = app.listen(8080,() => console.log('Server arriba'))
const io = new Server(httpServer) // Init Servers


//Cokies y manejo de sesion 

app.get('/setCookie',(req,res) => {
    res.cookie('nombreCookie',{maxAge: 3000}).send("cookie") 
})

app.get('/getCookies',(req,res) => {
    res.send(req.cookies)
})

app.get('/cookie/delete', (req, res) => {
    res.clearCookie('nombreCookie').send('Cookie Removed')
})

app.get('/cookie/setsigned', (req, res) => {
    res.cookie('nombreCookieFirmada', 'un texto', {signed: true}).send('Cookie seteada')
})

app.use(cookieParser('mysecret'))

//Guardar sesion en BD

app.use(session({

    store:MongoStore.create({
       mongoUrl: MongoUri,
       dbName: MongoDbName,
    }),
    secret:"mysecret",
    resave:false,
    saveUninitialized:true
}))

//Conexion con la BD
mongoose.set('strictQuery', false)
mongoose.connect(MongoUri,
{dbName:MongoDbName},(error) =>{
    if(!error){
        console.log("Conexión con BD establecida")
        return 
    }
})

app.use(session({

    secret:"mysecret",
    resave:true, //Mantiene la sesion viva
    saveUninitialized:true //Permite guardar cualquier sesion 
}))

//Sesion
app.get('/session',(req,res) =>{
    if(req.session.counter){
        req.session.counter++
        res.send(`Se ha visitado ${req.session.counter} veces`)
    }
    else{
        req.session.counter=1
        res.send("Bienvenido")
    }
})

app.get('/logout',(req,res) =>{
    req.session.destroy(error =>{
        if(!err)
            res.send("Logut OK")
        else res.send({status:"Logout ERROR",body:err})
    })
        
})


export default io




