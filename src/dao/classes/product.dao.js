import productsModel from "../models/products.model.js";

//La logica se toma de el router
export default class Product{

    createProduct = async()=>{
        try{
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
            return result
        }catch(error){
            console.log(error)
            return null
          }
      }


    getProductById = async(pid)=>{
        try{
           const {pid} = parseInt(req.params.pid)
           let prod = await productsModel.findById(pid).exec()
            return carts
        }catch(error){
            console.log(error)
            return null
        }
    }


    deleteProduct = async(id)=>{ 

        const {pid} = parseInt(req.params.pid)  //Guardo el parametro recibido
        const deleteProduct =  await productsModel.deleteOne({_id:pid})
        console.log(deleteProduct)
        if(deleteProduct)
        res.send("Producto eliminado")
        else
        return res.status(404).send('Product to eliminate not found')
        }

        //Obtiene la lista de productos
        //127.0.0.1:8080/api/products
    getProducts = async() => {
       const products = await productsModel.find()
       res.send(products)
       return products
      }

    updateProduct = async(pid)=>{
        try{
            let  {pid} = req.params
            let propToUpdate = req.body 
            let result = await productsModel.updateOne({_id:pid},propToUpdate)
            res.send({status:'Exito',payload:result})
        }catch(error){
            console.log(error)
            return null
        }
    }

    addProduct = async() => {
        
         const product = req.body
         const productAdded = await productsModel.create(product)
         //req.io.emit("updatedProducts",await productsModel.find())
         res.json({status:'Exito',productAdded})
      }

        
}
