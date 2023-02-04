//Los archivos routes contrendran la logica y lista de endpoints agrupados por funcionalidades
import {Router} from 'express'
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import productsModel from '../dao/models/products.model.js'
import io from '../app.js'  //Para realTime

const router = Router()




// crear productos
router.post('/create',async(req, res) => {
    //obtengo los datos segun el schema definido
    const product = req.body
    const productAdded = await productsModel.create(product)
    //req.io.emit("updatedProducts",await productsModel.find())
    res.json({status:'Exito',productAdded})
      
})
//Add product
router.post('/realtimeproducts',async(req, res) => {
    //obtengo los datos segun el schema definido
    const product = req.body
    const productAdded = await productsModel.create(product)
    //req.io.emit("updatedProducts",await productsModel.find())
    res.json({status:'Exito',productAdded})
      
})


// Actualizar un producto
router.put('/:pid', async (req, res) => {
    let  {pid} = req.params.id
    let propToUpdate = req.body.title  
    let result = await productsModel.updateOne({_id:{$eq:pid}},propToUpdate)
    res.send({status:'Exito',payload:result})
})

// Obtener un producto
router.delete('/:pid', async (req, res) => {
      const pid = await productsModel.findById(req.params.id);
      let result = await productsModel.deleteOne({_id:pid})
      res.send({status:'Exito',payload:result})
})




// Crear productos
router.post('/', async (req, res) => {
    const NewProduct = req.body
    console.log(NewProduct);

    const productGenerated = new productsModel(NewProduct)
    await productGenerated.save()

    console.log(productGenerated);
    res.send({status:'Exito',payload:productGenerated})
    
})

// Borrar un producto por nombre
router.delete('/delete/:name', async (req, res) => {
   const name = parseInt(req.params.name)  //Guardo el parametro recibido
   const deleteProduct =  await productsModel.deleteOne(name)
   if(deleteProduct)
   res.send("Producto eliminado")
   else
   return res.status(404).send('Product to eliminate not found')
    res.send('Borrando producto')
})



//DeleteById
router.delete('/:pid', async(req, res) => {   
   
   const pid = parseInt(req.params.pid)  //Guardo el parametro recibido
   const deleteProduct =  await productsModel.deleteOne(pid)
   if(deleteProduct)
   res.send("Producto eliminado")
   else
   return res.status(404).send('Product to eliminate not found')
 })


router.delete('/realtimeproducts/:pid', async (req, res) => {
    const pid = req.params.pid
    await productsModel.deleteOne(pid)
    const products = await productsModel.find()

    res.re({status: "success", msg: "Product deleted"})
    io.emit('showProducts', products)
})


router.post('/realtimeproducts', async (req, res) => {
    let products = await productsModel.find() 

    const product = req.body
    const productAdded = await productsModel.create(product)
   //products.push(productAdded)
    console.log(productAdded)
    res.json({ status: "success", productAdded })
    io.emit('showProducts', products)    
})


router.get('/realtimeproducts', async (req, res) => {
    let products = await productsModel.find()
    io.on('connection', socket => {
        
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
})


export default router