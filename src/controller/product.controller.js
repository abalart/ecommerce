import Product from '../dao/classes/product.dao.js'  //Iporto la clase

const productservice = new Product() //Viene de cart.dao.js

export const createProduct = async (req,res) => {
    const product = req.body
    let result = await productservice.createProduct()
    if(!result) return res.status(500).send({status: 'error',error:'Something went wrong'})
    res.send({status: 'success',result})
}

export const getProductById = async (req,res) => {
    const {pid} = req.params
    let result = await productservice.getProductById(pid)
    if(!result) return res.status(500).send({status: 'error',error:'Something went wrong'})
    res.send({status: 'success',result})
}
 
export const deleteProduct = async (req,res) => {
    const {pid} = req.params
    let result = await productservice.deleteProduct(pid)
    if(!result) return res.status(500).send({status: 'error',error:'Something went wrong'})
    res.send({status: 'success',result})
}

export const getProducts = async (req,res) => {
    let result = await cartService.productservice()
    if(!result) return res.status(500).send({status: 'error',error:'Something went wrong'})
    res.send({status: 'success',result})
}

export const updateProduct = async (req,res) => {
    const {pid} = req.params
    let result = await productservice.updateProduct(pid)
    if(!result) return res.status(500).send({status: 'error',error:'Something went wrong'})
    res.send({status: 'success',result})
}

export const addProduct = async (req,res) => {
    const product = req.body
    let newProduct = await productservice.addProduct()
    product.push(newProduct)
    if(!result) return res.status(500).send({status: 'error',error:'Something went wrong'})
    res.send({status: 'success',newProduct})
}