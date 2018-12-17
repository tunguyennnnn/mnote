import models from '../models'

const ADMIN_EMAIL = "tunguyenuni@gmail.com"

async function addNonAuthorThreadsToAdmin () {
  try {
    const admin = await models.User.findOne({ where: { email: ADMIN_EMAIL }})
    if (!admin) return
    const noAuthorThreads = await models.Thread.findAll({
      where: {
        userId: {
          $eq: null
        }
      }
    })
    console.log(noAuthorThreads)
    for (let thread of noAuthorThreads) {
      await thread.update({ userId: admin.id })
    }
  } catch (e) {
    console.log(e)
  }
}

(function () {
  addNonAuthorThreadsToAdmin()
})()