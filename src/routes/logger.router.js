import { Router} from 'express'

const router = Router()

router.get('/', (req, res) => {
    req.logger.error('Se cayo el sistema =(')
    req.logger.warning('Error pero de tipo advertencia')
    req.logger.info('Info')
    req.logger.debug('Para debuggear')
    req.logger.fatal('Estás en el horno')
    req.logger.http('Info de error nivel http')
    res.send({message: 'Un mensaje'})
})

export default router