import { Router } from 'express'
import getInstagramItemInfo from './instagram-item-info'
import allInstagramItemInfo from './all-instagram-item-info'
const router = Router()

router.get('/instagram-item/:id', getInstagramItemInfo)
router.get('/instagram-items.json', allInstagramItemInfo)

export default router