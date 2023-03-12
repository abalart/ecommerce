import {Router} from 'express'
import {getUser,InsertUser,updateUser,deleteUser} from '../controller/user.controller.js'


const router = Router()

router.get('/',getUser)
router.post('/users',InsertUser)
router.post('/:uid',updateUser)
router.delete('/:uid',deleteUser)


export default router