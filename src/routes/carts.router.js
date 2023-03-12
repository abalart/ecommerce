import {Router} from 'express'
import {getCartById,createCart,addProductToCart,deleteCart} from '../controller/carts.controller.js'

const router = Router()


router.get('/',getCartById)
router.post('/:cid',createCart)
router.post('/:cid/product/:pid',addProductToCart)
router.delete('/:cid/product/:pid',deleteCart)


export default router