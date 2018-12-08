import jwt from 'jsonwebtoken'

import models from '../models'

export const authCheck = async (req, res, next) => {
  try {
    const { headers } = req
    if (headers.authorization && headers.authorization.split(' ')[0] === 'Bearer') {
      const decoded = jwt.decode(headers.authorization.split(' ')[1])
      const user = await models.User.findOne({ where: { sub: decoded.sub, email: decoded.email }})
      req.user = user
    }
  } catch (e) {
    console.log(e)
  } finally {
    next()
  }
}