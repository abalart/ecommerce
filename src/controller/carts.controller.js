import Cart from '../dao/classes/cart.dao.js'


const cartService = new Cart() //Viene de cart.dao.js

export const createCart = async (req,res) => {
    let result = await cartService.createCart()
    if(!result) return res.status(500).send({status: 'error',error:'Something went wrong'})
    res.send({status: 'success',result})
}

export const addProductToCart = async (req,res) => {
    const cid = req.params.cid
    const pid = req.params.pid  
    const q = req.params.quantity
    let result = await cartService.addProductToCart(cid,pid)
    res.send({status: 'success',result:result})
}

export const getCartById = async (req,res) => {
     const cid = req.params.cid
     let result = await cartService.getCartById(cid)
     res.send({status: 'success',result:result})
}

export const deleteCart = async (req,res) => {
    const cid = req.params.cid
    let result = await cartService.deleteCart(cid)
    res.send({status: 'success',result:'deleteCart'})
}

 