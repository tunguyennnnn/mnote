export default {
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
    createThread: async (parent, args, { models }) => {
      try {
        return await models.Thread.create()
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    updateThread: async (parent, { id, detail }, { models }) => {
      try {
        const thread = await models.Thread.findOne({ where: { id } })
        if (!thread) throw new Error(`Not found thread with ${id}`)
        return await thread.update({ detail })
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    deleteThread: async (parent, { id }, { models }) => {
      try {
        await models.Thread.destroy( { where: { id } })
        return true
      } catch (e) {
        console.log(e)
        return false
      }
    }
  }
}
