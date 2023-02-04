import {Router} from 'express'
import cartsModel from '../dao/models/carts.model.js'
import productModel from '../dao/models/products.model.js'

const router = Router()


//Create cart
router.post('/', async (req, res) => {
    const newCart = await cartsModel.create({})
    res.json({status:'Exito',newCart})

})

//find cart by id
router.get('/:cid', async (req, res) => {
    const cid =  req.params.cid
    const cart = await cartsModel.findOne({_id: cid}).populate("products.id")
    res.send({carts})
})


router.post('/:cid/product/:pid', async (req, res) => {
    const pid = await cartsModel.findById(req.params.id);
    let result = await cartsModel.deleteOne({_id:pid})
    res.send({status:'Exito',payload:result})
})


  //delete cart
router.delete("/:cid/product/:pid", async (req, res) => {
    const cartID = req.params.cid
    const productID = req.params.pid
    const cart = await cartsModel.findById(cartID)
    if(!cart) return res.status(404).json({status: "error", error: "Cart Not Found"})
    const productIDX = cart.products.findIndex(p => p.id == productID)
    if (productIDX <= 0) return res.status(404).json({status: "error", error: "Product Not Found on Cart"})
    cart.products = cart.products.splice(productIDX, 1)
    await cart.save()
    res.json({status: "Success", cart})
})

 //Agrega un producto al cart
router.post("/:cid/product/:pid", async (req, res) => {
    const cartID = req.params.cid
    const productID = req.params.pid

    const quantity= req.body.quantity || 1
    const cart = await cartsModel.findById(cartID)

    let found = false
    for (let i = 0; i < cart.products.length; i++) {
        if (cart.products[i].id == productID) {
            cart.products[i].quantity++
            found = true
            break
        }
    }
    if (found == false) {
        cart.products.push({ id: productID, quantity})
    }

    await cart.save()


    res.json({status: "Success", cart})
})





export default router