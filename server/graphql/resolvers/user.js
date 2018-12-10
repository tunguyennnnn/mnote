import jwt from 'jsonwebtoken'
require('dotenv').config()

export default {
  Query: {
    user: async (p, { id }, { models }) => {
      try {
        return await models.User.findOne({ id })
      } catch (e) {
        throw e
      }
    }
  },
  Mutation: {
    loginOrSignup: async (p, { sub, email, metaData, idToken }, { models }) => {
      try {
        const decoded = jwt.decode(idToken)
        if (decoded.email !== email || decoded.sub !== sub) throw new Error(`Invalid token`)
        const user = (await models.User.findOne({ where: { sub, email } })) 
        if (user) {
          return user.update({ metaData })
        }
        return await models.User.create({ sub, email, metaData })
      } catch (e) {
        throw e
      }
    }
  }
}