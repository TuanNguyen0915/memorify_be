import { Router } from 'express'
import * as userCtrl from '../controllers/user.controller.js'
const router = Router()

router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)


export { router }
