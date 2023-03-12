import {Router} from 'express'
import * as url from 'url';
import productsModel from '../dao/models/products.model.js'
import {getProductById,createProduct,getProducts,deleteProduct,updateProduct,addProduct} from '../controller/product.controller.js'
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
//import io from '../app.js'  //Para realTime

const router = Router()

router.post('/create',createProduct)
router.get('/:pid',getProductById)
router.delete('/:pid', deleteProduct)  
router.get("/", getProducts)
router.get("/products", getProducts)
router.put("/:pid", updateProduct)
router.post("/:products", addProduct)


//Renders
//Listado de productos que se van a renderisar en localhost (al ingresar a http://127.0.0.1:8080/api/products/realtimeproducts)
router.get('/realtimeproducts', async (req, res) => {
    const products = await productsModel.find().lean()
    res.render('realtimeproducts',{
        data: products
    })
})

//Renderiza detalles de un produto (quitar y pegar en capa de vita?)
router.get("/:id", async (req, res) => {
    const id = req.params.id
    const product = await productsModel.findOne({_id: id})
    res.render("productDetail", product)
})


export default router