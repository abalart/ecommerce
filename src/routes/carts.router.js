import {Router} from 'express'
import CartManager from '../dao/cart_manager.js'
import cartsModel from '../dao/models/carts.model.js'


const router = Router()



const fileName = 'carrito.json'
const cartManager = new CartManager(fileName);

router.post('/', async (req, res) => {
    const newCart = req.body
    const dartAdded = await cartsModel.create(newCart)
    res.json({status:'Exito',productAdded})

})

//findAll
router.get('/', async (req, res) => {
    const carts = await cartsModel.find()
    res.send({carts})
})

router.post('/:cid/product/:pid', async (req, res) => {
    const pid = await cartsModel.findById(req.params.id);
    let result = await cartsModel.deleteOne({_id:pid})
    res.send({status:'Exito',payload:result})
})

export default router