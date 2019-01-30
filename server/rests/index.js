import { Router } from 'express'
import getInstagramItemInfo from './instagram-item-info'
import allInstagramItemInfo from './all-instagram-item-info'
import updateFollower from './update-instagram-follower'
const router = Router()

router.get('/instagram-item/:id', getInstagramItemInfo)
router.get('/instagram-items.json', allInstagramItemInfo)
router.post('/instagram-follower', updateFollower)

export default router