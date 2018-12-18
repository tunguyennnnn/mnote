import { Router } from 'express'
import getInstagramItemInfo from './instagram-item-info'

const router = Router()

router.get('/instagram-item/:id', getInstagramItemInfo)

export default router