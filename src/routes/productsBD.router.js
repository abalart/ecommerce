//Los archivos routes contrendran la logica y lista de endpoints agrupados por funcionalidades
import {Router} from 'express'
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import productsModel from '../dao/models/products.model.js'


/**
 
Con base en nuestra implementación actual de productos, modificar el método GET / para que cumpla con los siguientes puntos:
Deberá poder recibir por query params un limit (opcional), una page (opcional), un sort (opcional) y un query (opcional)
-limit permitirá devolver sólo el número de elementos solicitados al momento de la petición, en caso de no recibir limit, éste será de 10.
page permitirá devolver la página que queremos buscar, en caso de no recibir page, ésta será de 1

 */

const router = Router()

// Listar productos
router.get('/', async (req, res) => {
  
    const limit = req.query?.limit || 10
    const page = req.query?.page || 1
    const filter = req.query?.filter || ''
    const sortQuery = req.query?.sort || ''
    const sortQueryOrder = req.query?.sortorder || 'desc'

    const prods = await productsModel.find().lean()

    res.send({result:'Exito',payload:prods})
})


// crear productos
router.post('/create',async(req, res) => {
    //obtengo los datos segun el schema definido
    const product = req.body
    const productAdded = await productsModel.create(product)
    //req.io.emit("updatedProducts",await productsModel.find())
    res.json({status:'Exito',productAdded})
      
})

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


//Listado de productos que se van a renderisar en localhost (al ingresar a http://127.0.0.1:8080/api/products/realtimeproducts/)
router.get('/:realtimeproducts', async (req, res) => {
    const products = await productsModel.find().lean()//.lean().exec()
    res.render('realtimeproducts',{
        data: products
    })
    
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




export default router