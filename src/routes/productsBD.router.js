//Los archivos routes contrendran la logica y lista de endpoints agrupados por funcionalidades
import {Router} from 'express'
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import productsModel from '../dao/models/products.model.js'


const router = Router()

// Listar productos
router.get('/', async (req, res) => {
    const prods = await productsModel.find()
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


// Obtener un producto
router.put('/:pid', async (req, res) => {
    let  {pid} = req.params
    let prodToReemplace = req.body
     if(!title || !description || !price || !code || !stock || !category) 
      return res.send({status:"error",error:"Incomplete values"})  
    
      let result = await productsModel.updateOne({_id:pid},prodToReemplace)
    
      res.send({status:'Exito',payload:result})
})

// Obtener un producto
router.delete('/:pid', async (req, res) => {
      let  {pid} = req.params
      let result = await productsModel.deleteOne({_id:pid})
      res.send({status:'Exito',payload:result})
})


// Obtener un producto
router.get('/:name', async (req, res) => {
    const name = req.params.name
    const producto = await productsModel.findOne({name: name}).lean().exec()
    res.render('one', { producto })
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

// Borrar un producto
router.delete('/delete/:name', (req, res) => {
    res.send('Borrando producto')
})



export default router