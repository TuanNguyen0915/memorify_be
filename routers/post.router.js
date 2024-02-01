import { Router } from 'express'
import * as postCtrl from '../controllers/post.controller.js'
const router = Router()

router.post('/', postCtrl.createPost)
router.get('/:postId', postCtrl.postDetails)
export { router }
