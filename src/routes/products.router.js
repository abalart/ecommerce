//Los archivos routes contrendran la logica y lista de endpoints agrupados por funcionalidades
import {Router} from 'express'
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import productsModel from '../dao/models/products.model.js'
//import io from '../app.js'  //Para realTime

const router = Router()

//Obtiene la lista de productos
//127.0.0.1:8080/api/products
router.get("/", async (req, res) => {
    const products = await productsModel.find()
    res.send(products)
})

//Renderiza detalles de un produto
router.get("/:id", async (req, res) => {
    const id = req.params.id
    const product = await productsModel.findOne({_id: id})
    res.render("productDetail", product)
})


// crear productos
router.post('/create',async(req, res) => {
    //obtengo los datos segun el schema definido
    let {title,description,price,code,stock,category,status,thumbails} = req.body
    if(!title || !description || !price || !code || !stock || !category || !thumbails)
     return res.send({status:"Error",error:"Faltan datos"})
    let result = await productsModel.create({
        title,
        description,
        price,
        code,
        stock,
        category,
        status,
        thumbails
    })
    //req.io.emit("updatedProducts",await productsModel.find())
    res.send({status:'success',payload: result})
      
})

//ok
//Add product
router.post('/products',async(req, res) => {
    const product = req.body
    const productAdded = await productsModel.create(product)
    //req.io.emit("updatedProducts",await productsModel.find())
    res.json({status:'Exito',productAdded})
      
})


//ok
// Actualizar un producto
router.put('/:pid', async (req, res) => {
    let  {pid} = req.params
    let propToUpdate = req.body 
    let result = await productsModel.updateOne({_id:pid},propToUpdate)
    res.send({status:'Exito',payload:result})
})


// Obtener un producto por id
router.get('/:pid', async (req, res) => {
      const {pid} = parseInt(req.params.pid)
      let prod = await productsModel.findById(pid).exec()
      console.log(prod)
      res.send({status:'Exito',payload:prod})
})



//DeleteById
router.delete('/:pid', async(req, res) => {   
   const {pid} = parseInt(req.params.pid)  //Guardo el parametro recibido
   const deleteProduct =  await productsModel.deleteOne({_id:pid})
   console.log(deleteProduct)
   if(deleteProduct)
   res.send("Producto eliminado")
   else
   return res.status(404).send('Product to eliminate not found')
 })


//Renders
//Listado de productos que se van a renderisar en localhost (al ingresar a http://127.0.0.1:8080/api/products/realtimeproducts)
router.get('/realtimeproducts', async (req, res) => {
    const products = await productsModel.find().lean()
    res.render('realtimeproducts',{
        data: products
    })
})




export default router