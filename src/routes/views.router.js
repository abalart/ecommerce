//En ese archivo tendremos la logica de renderizado, de donde tomar CSS,como conectar con handlebar,etc
//el router de vistas siempre debe responder con res.render.
//Se ponen las rutas completas
import express from 'express'
import productsModel from '../dao/models/products.model.js'

const router = express.Router()

//Pagina de inicio
router.get('/',async (req,res)=>{
   
   res.render('home')  
})

//Listado de productos que se van a renderisar en localhost (al ingresar a http://127.0.0.1:8080/api/products/realtimeproducts)
router.get('/api/products/realtimeproducts', async (req, res) => {
    const products = await productsModel.find().lean()
    res.render('realtimeproducts',{
        data: products
    })
})


// Listar productos con parametros http://127.0.0.1:8080/api/paginate
router.get('/api/products/paginate', async (req, res) => {
  
    const limit = req.query?.limit || 10
    const page = req.query?.page || 1
    const filter = req.query?.filter || ''
    const sortQuery = req.query?.sort || ''
    const sortQueryOrder = req.query?.sortorder || 'desc'

    const search = {}
    if(filter) {
        search.title = filter
    }
    const sort = {}
    if (sortQuery) {
        sort[sortQuery] = sortQueryOrder
    }

    const options = {
        limit, 
        page, 
        sort,
        lean: true,
        
    }

    let status = "Success"
    const data = await productsModel.paginate(search, options) //Le envio los 2 parametros de paginate


    if(data) 
       {
        status = "Success"
        console.log(JSON.stringify(data, null, 2, '\t'));
        res.render('products', {data})

        res.render({
        result:status,
        payload: data,
       
     })
        return res.status(404).json({status: "error", error: "Product Not Found"}
        
        )}
    

})


export default router