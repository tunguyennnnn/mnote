import jwt from 'jsonwebtoken'

export const authCheck = (req, res, next) => {
  const { headers } = req
  if (headers.authorization && headers.authorization.split(' ')[0] === 'Bearer') {
    const decoded = jwt.decode(headers.authorization.split(' ')[1])
    console.log(decoded)
    req.user = decoded
  }
  next()
}