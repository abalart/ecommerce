import {Router} from 'express'
//import userModel from '../models/user.model.js'


const router = Router()


router.get('/', async (req, res) => {
    try {
        const users = await userModel.find()
        res.send({ result: 'success', payload: users })

    } catch (error) {
        console.log(error);
        res.send({result: 'error', error })

    }
})

// Insert  user
router.post('/users', async(req, res) => {
    const result = await userModel.create(req.body)

    res.send({status: "success", payload: result})
})

// Actualizar user
router.put('/:uid', async(req, res) => {
    const uid = req.params.uid

    const userToReplace = req.body
    const result = await userModel.updateOne({_id: uid}, userToReplace)

    res.send({status: "success", payload: result})
})

router.delete('/:uid', async(req, res) => {
    const uid = req.params.uid

    const result = await userModel.deleteOne({_id: uid})
    res.send({status: "success", payload: result})
})

export default router