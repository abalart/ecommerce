//En ese archivo tendremos la logica de renderizado, de donde tomar CSS,como conectar con handlebar,etc
import express from 'express'
import io from '../app.js'  //Para realTime
import productsModel from '../dao/models/products.model.js'

const router = express.Router()

 
//Listado de productos que se van a renderisar en localhost (al ingresar a http://127.0.0.1:8080/)
router.get('/',async (req,res)=>{
   const list = await productsModel.find() //Obtengo lista desde la BD
   res.render('home',{list})
})

//realtimeproductst: Get,post,delete

router.post('/realtimeproducts', async (req, res) => {
    let products = await productsModel.find() 

    const product = req.body
    const productAdded = await productsModel.create(product)
   //products.push(productAdded)
    console.log(productAdded)
    res.json({ status: "success", productAdded })
    io.emit('showProducts', products)    
})
/*
router.get('/realtimeproducts', async (req, res) => {
    let products = await productsModel.find()
    io.on('connection', socket => {
        console.log('New client connected')

        socket.on('addProduct', async data => {
            const productAdded = await productsModel.create(data)
            io.emit('showProducts', products)
        })
        
        socket.on('deleteProduct', async data => {
            let products = await productsModel.find()
            await productsModel.deleteOne(data.id)

            const filtered = products.filter(prod => prod.id != data.id)
            io.emit('showProducts', filtered)
        })
    })
    res.render('realTimeProducts', {products})
})*/




router.delete('/realtimeproducts/:pid', async (req, res) => {
    const pid = req.params.pid
    await productsModel.deleteOne(pid)
    const products = await productsModel.find()

    res.re({status: "success", msg: "Product deleted"})
    io.emit('showProducts', products)
})


export default router