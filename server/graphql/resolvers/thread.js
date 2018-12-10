export default {
  Thread: {
    author: async (thread, args, { models }) => {
      return await thread.getAuthor()
    }
  },
  Query: {
    threads: async (parent, { cursor, limit }, { models }) => {
      try {
        const options = {
          where: {},
          limit,
          order: [['updatedAt', 'DESC']]
        }
        if (cursor) {
          options.where.createdAt = {
            $lt: cursor
          }
        }
        const threads = await models.Thread.findAll(options)
        return {
          pageInfo: {
            hasNextPage: true,
            hasPreviousPage: !!cursor
          },
          edges: threads.map(thread => {
            return {
              cursor: thread.updatedAt,
              node: thread
            }
          })
        }
      } catch (e) {
        console.log(e)
        throw e
      }
    }
  },
  Mutation: {
    createThread: async (parent, args, { models, user }) => {
      try {
        console.log(user.id)
        if (!user) throw new Error(`Anauthorized`)
        return await models.Thread.create({ userId: user.id })
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    updateThread: async (parent, { id, detail }, { models, user }) => {
      try {
        if (!user) throw new Error(`Anauthorized`)
        const thread = await models.Thread.findOne({ where: { id } })
        if (!thread) throw new Error(`Not found thread with ${id}`)
        if (user.id !== thread.userId) throw new Error(`Anauthorized`)
        return await thread.update({ detail })
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    deleteThread: async (parent, { id }, { models, user }) => {
      try {
        if (!user) throw new Error(`Anauthorized`)
        await models.Thread.destroy( { where: { id } })
        return true
      } catch (e) {
        console.log(e)
        return false
      }
    }
  }
}
