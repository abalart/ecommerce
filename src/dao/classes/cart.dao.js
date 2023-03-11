import cartsModel from "../models/carts.model.js";

export default class cart{

  
      createCart = async()=>{
        try{
            let newCart = await cartsModel.create({})
            return newCart
        }catch(error){
            console.log(error)
            return null
        }
    }
   
       addProductToCart = async(cid,pid)=>{
        try{
                const cid = req.params.cid
                const pid = req.params.pid  //Se inserta una ref al producto
                const q = req.params.quantity
                const cart = await cartsModel.findById({_id:cid});   //Obtengo el carrito
                if(!cart) return res.status(404).json({status:"Not Found",error:"Cart not found"})
                cart.products.push(pid) //Inserto referencia al produto en carrito
                const result = await cartsModel.updateOne({_id:cid},cart)
                let cartToFind = await cartsModel.find({_id:cid}).populate('products.id')
                console.log(JSON.stringify(cartToFind, null, "\t"))
                return  cartToFind
        }catch(error){
            console.log(error)
            return null
        }
    }

    getCartById = async(id)=>{
        try{
            let carts = await cartsModel.findOne({_id:id})
            return carts
        }catch(error){
            console.log(error)
            return null
        }
    }

     deleteCart = async(id)=>{
        try{
            const cartID = req.params.cid
            const productID = req.params.pid
            const cart = await cartsModel.findById(cartID)
            if(!cart) return res.status(404).json({status: "error", error: "Cart Not Found"})
            const productIDX = cart.products.findIndex(p => p.id == productID)
            if (productIDX <= 0) return res.status(404).json({status: "error", error: "Product Not Found on Cart"})
            cart.products = cart.products.splice(productIDX, 1)
            await cart.save()
            return cart
        }catch(error){
            console.log(error)
            return null
        }
    }


}