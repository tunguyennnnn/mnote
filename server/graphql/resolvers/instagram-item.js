export default {
  InstagramItem: {
    infoConnection: async (parent, { cursor, limit }, { models }) => {
      try {
        const options = {
          where: {instagramItemId: parent.id},
          order: [['createdAt', 'ASC']],
          limit
        }
        if (cursor) {
          options.where.createdAt = { $gt: cursor }
        }
        const infos = await models.InstagramInfo.findAll(options)
        return {
          pageInfo: {
            hasPreviousPage: !cursor,
            hasNextPage: true
          },
          edges: infos.map(info => {
            return {
              cursor: info.createdAt,
              node: info
            }
          })
        }
      } catch (e) {
        throw e
      }
    }
  },
  Query: {
    instagramItem: async (parent, { id }, { models, user }) => {
      try {
        return await models.InstagramItem.findOne({ id })
      } catch (e) {
        throw e
      }
    },
    instagramItems: async (parent, { cursor, limit }, { models, user }) => {
      try {
        const options = {
          where: {},
          order: [['createdAt', 'DESC']],
          limit
        }
        if (cursor) {
          options.createdAt.createdAt = { $lt: cursor}
        }
        const items = await models.InstagramItem.findAll(options)
        return {
          pageInfo: {
            hasPreviousPage: !cursor,
            hasNextPage: true
          },
          edges: items.map(item => {
            return {
              cursor: item.createdAt,
              node: item
            }
          })
        }
      } catch (e) {
        throw e
      }
    }
  },
  Mutation: {
    createInstagramItem: async (parent, { url, name, description }, { models, user }) => {
      try {
        return await models.InstagramItem.create({
          description,
          name,
          url
        })
      } catch (e) {
        throw e
      }
    }
  }
}
