import { Router } from 'express'
import * as userCtrl from '../controllers/user.controller.js'
const router = Router()

router.get('/:userId', userCtrl.getUser)
router.put('/:userId', userCtrl.updateUser)
router.delete('/:userId', userCtrl.deleteUser)
export { router }
