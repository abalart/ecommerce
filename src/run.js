import productRouter from './routes/productsBD.router.js'
import cartRouter from "./routes/carts.router.js"
import chatRouter from "./routes/chat.router.js"
import messagesModel from "./dao/models/menssages.model.js";
import productViewsRouter from './routes/productsBD.router.js'
import sessionRouter from './routes/session.router.js'

//Agrupo las rutas de las diferentes APIs en este archivo

const run = (socketServer, app) => {
    app.use((req, res, next) => {
        req.io = socketServer
        next()
    })

    app.use("/products", productViewsRouter)
    app.use("/api/session", sessionRouter)
    app.use("/api/products", productRouter)
    app.use("/api/carts", cartRouter)
    app.use("/api/chat", chatRouter)


    socketServer.on("connection", socket => {
        console.log("New client connected")
        socket.on("message", async data => {
        await messagesModel.create(data)
        let messages = await messagesModel.find().lean().exec()
        socketServer.emit("logs", messages)
        })
    })

    app.use("/", (req, res) => res.send("Bienvenido!"))

}

export default run