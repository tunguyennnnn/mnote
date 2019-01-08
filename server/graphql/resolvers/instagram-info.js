export default {
  TodoItem: {
    authorInfo: async ( todoItem, args, { models, user }) => {
      if (!user || user.id !== todoItem.userId) {
        return {
          canView: true,
          canEdit: false
        }
      }
      return { 
        canView: true,
        canEdit: true
      }
    }
  },
  Query: {
    userTodoItems: async (root, { userId }, { models, user }) => {
      try {
        return await models.TodoItem.findAll({ where: { userId }})
      } catch (e) {
        console.log(e)
        throw e
      }
    }
  },
  Mutation: {
    createTodoItem: async (root, { category, name }, { models, user }) => {
      try {
        if (!user) throw new Error('Anauthenticated')
        return await models.TodoItem.create({ category, name, userId: user.id })
      } catch (e) {
        console.log(e)
        throw e
      }
    },
  }
}
