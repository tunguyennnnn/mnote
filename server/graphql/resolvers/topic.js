const DEFAULT_LIMIT = 20
const TOP_LIMIT = 50

export default {
  Query: {
    topic: async (parent, { id }, { models, user }) => {

    },
    topics: async (parent, { cursor, limit = DEFAULT_LIMIT }, { models, user }) => {
      try {
        const options = {
          order: [['createdAt', 'DESC']],
          where: {},
          limit
        }
        if (cursor) {
          options.where.createdAt = {
            $lt: cursor
          }
        }
        return await models.ExpertTopic.findAll(options)
      } catch (e) {
        throw e
      }
    }
  },
  Mutation: {
    createTopic: (parent, { name }, { models, user }) => {

    }
  }
}
