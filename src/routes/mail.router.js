import { Router} from 'express'
import  emailSender from '../repository/users.repository.js'

const router = Router()

router.get('/password-reset/:userID',emailSender)

export default router