import express from 'express'
import productRouter from './routes/productsBD.router.js'
import cart from './routes/carts.router.js'
import handlebars from 'express-handlebars'
import {Server} from 'socket.io'
import routerViews from './routes/views.router.js'
import __dirname from './utils.js'
import mongoose from 'mongoose'
import users from './routes/users.router.js'
import FileStore from 'session-file-store'
import MongoStore from 'connect-mongo'

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
 
// Configuracion de rutas
app.use('/', routerViews) //las rutas sin api, corresponden a vistas a partir de ahora.
app.use('/api/products',productRouter)  //Conecto router y me traigo todos los endpoints, en POSTMAN siempre va a ser /api/products/ + la ruta que se defina en el archivo router
app.use('/api/cart',cart) //Conecto router y me traigo todos los endpoints
//Agrego router users
app.use('/api/users',users) //Conecto router y me traigo todos los endpoints

// Corriendo el servidor
const httpServer = app.listen(8080,() => console.log('Server arriba'))
const io = new Server(httpServer) // Init Servers


/////////Cokies y manejo de sesion 


app.use(cookieParser())

app.use(session({

    store:MongoStore.create({
       mongoURL: "mongodb+srv://abalart:yD3VgDOgFUHlnpei@ecommerce.mkzzehb.mongodb.net/test",
       mongoOptions: {useNewUrlParser: true,useUnifielTopology: true},
       ttl:15,
    }),
    secret:"df6g4df5g",
    resave:false,
    saveUninitialized:true
}))

 /*
app.get('/cookie/set', (req, res) => {
    //res.cookie('CookieDeR2', 'Thanos siempre tuvo razon', {maxAge: 5000}).send('Cookie seteada')
    res.cookie('cookieNormal', 'Thanos siempre tuvo razon').send('Cookie seteada')
})

app.get('/cookie/get',  (req, res) => {
    res.send( {
        signed: req.signedCookies,
        normals: req.cookies
    })
})
app.get('/cookie/delete', (req, res) => {
    res.clearCookie('CookieDeR2').send('Cookie Removed')
})

app.get('/cookie/setsigned', (req, res) => {
    res.cookie('CookieDeR2', 'Thanos siempre tuvo razon', {signed: true}).send('Cookie seteada')
})
*/
//Conexion con la BD
mongoose.set('strictQuery', false)
const uri = "mongodb+srv://abalart:yD3VgDOgFUHlnpei@ecommerce.mkzzehb.mongodb.net/test"
mongoose.connect(uri,
{dbName:'ecommerce'},(error) =>{
    if(!error){
        console.log("Conexión con BD establecida")
        return 
    }
})

export default io




