import productRouter from './routes/products.router.js'
import cartRouter from "./routes/carts.router.js"
import chatRouter from "./routes/chat.router.js"
import { MessageService } from "./repository/index.js"
import productViewsRouter from './routes/products.views.router.js'
import sessionRouter from './routes/session.router.js'
import { passportCall } from "./utils.js";
import errorMiddlewares from "./errors/errorMiddlewares.js"


//Agrupo las rutas de las diferentes APIs en este archivo

const run = (socketServer, app) => {
    app.use((req, res, next) => {
        req.io = socketServer
        next()
    })

    app.use("/products", passportCall("jwt"), productViewsRouter)
    app.use("/products", productViewsRouter)
    app.use("/session", sessionRouter)
    app.use("/api/products", productRouter)
    app.use("/api/carts", cartRouter)
    app.use("/api/chat", chatRouter)


    socketServer.on("connection", socket => {
        console.log("New client connected")
        socket.on("message", async data => {
        await MessageService.create(data)
        let messages = await MessageService.get()
        socketServer.emit("logs", messages)
        })
    })

    app.use("/", (req, res) => res.send("Bienvenido!"))
    app.use(errorMiddlewares)
}

export default run