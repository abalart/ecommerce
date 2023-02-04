//En ese archivo tendremos la logica de renderizado, de donde tomar CSS,como conectar con handlebar,etc
//el router de vistas siempre debe responder con res.render.
//Se ponen las rutas completas
import express from 'express'
import productsModel from '../dao/models/products.model.js'

const router = express.Router()



//Listado de productos que se van a renderisar en localhost (al ingresar a http://127.0.0.1:8080/api/products/realtimeproducts/)
router.get('/api/products/realtimeproducts', async (req, res) => {
    const products = await productsModel.find().lean()
    res.render('realtimeproducts',{
        data: products
    })
    
})


// Listar productos http://127.0.0.1:8080/api/products
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

    //data.prevLink = data.hasPrevPage ? `/users?page=${data.prevPage}` : ''
    //data.nextLink = data.hasNextPage ? `/users?page=${data.nextPage}` : ''

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

 
//Listado de productos que se van a renderisar en localhost (al ingresar a http://127.0.0.1:8080/)
router.get('/api/products',async (req,res)=>{
   const list = await productsModel.find() //Obtengo lista desde la BD
   res.render('home',{list})  //Acá indico que en homo que seia / muestre la lista de productos
})









export default router