import User from '../dao/classes/user.dao.js'

const userService = new User() //Viene de cart.dao.js

export const getUser = async (req,res) => {
    let result = await userService.productservice()
    if(!result) return res.status(500).send({status: 'error',error:'Something went wrong'})
    res.send({status: 'success',result})

}

export const InsertUser = async (req,res) => {
    const user = req.body
    let newUser= await userService.InsertUser()
    user.push(newUser)
    if(!result) return res.status(500).send({status: 'error',error:'Something went wrong'})
    res.send({status: 'success',newUser})
}

export const updateProduct = async (req,res) => {
    const {uid} = req.params
    let result = await userService.updateUser(uid)
    if(!result) return res.status(500).send({status: 'error',error:'Something went wrong'})
    res.send({status: 'success',result})
}








