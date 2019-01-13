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
        const todoItems = await models.TodoItem.findAll({ where: { userId }})
        return {
          pageInfo: {
            hasNextPage: false,
            hasPreviousPage: false
          },
          edges: todoItems.map(item => {
            return { node: item, cursor: item.createdAt }
          }),
          authorInfo: {
            canView: true,
            canEdit: (user && String(user.id) === userId)
          }
        }
      } catch (e) {
        console.log(e)
        throw e
      }
    }
  },
  Mutation: {
    createTodoItem: async (root, { }, { models, user }) => {
      try {
        if (!user) throw new Error('Anauthenticated')
        return await models.TodoItem.create({ userId: user.id })
      } catch (e) {
        console.log(e)
        throw e
      }
    },
    deleteTodoItem: async (root, { id }, { models, user }) => {
      try {
        if (!user) throw new Error('Anauthenticated')
        await models.TodoItem.destroy({ where: { id, userId: user.id } })
        return true
      } catch (e) {
        console.log(e)
        return false
      }
    },
    updateTodoItemCategory: async (root, { id , category }, { models, user }) => {
      try {
        if (!user) throw new Error('Anauthenticated')
        const todoItem = await models.TodoItem.findOne({ where: { id} })
        if (!todoItem || todoItem.userId !== user.id) throw new Error(`Anauthorized`)
        if (!models.TodoItem.isCategoryValid(category)) throw new Error(`Invalid category ${category}`)
        const newItem = await todoItem.update({ category })
        return { updateResult: { updated: true }, newItem }
      } catch (e) {
        return { updateResult: { updated: false, error: e.toString() } }
      }
    },
    updateTodoItemName: async (root, { id, name }, { models, user }) => {
      try {
        if (!user) throw new Error('Anauthenticated')
        const todoItem = await models.TodoItem.findOne({ where: { id} })
        if (!todoItem || todoItem.userId !== user.id) throw new Error(`Anauthorized`)
        const newItem = await todoItem.update({ name })
        return { updateResult: { updated: true }, newItem }
      } catch (e) {
        return { updateResult: { updated: false, error: e.toString() } }
      }
    },
    updateTodoItemStatus: async (roor, { id, isDone }, { models, user }) => {
      try {
        if (!user) throw new Error('Anauthenticated')
        const todoItem = await models.TodoItem.findOne({ where: { id} })
        if (!todoItem || todoItem.userId !== user.id) throw new Error(`Anauthorized`)
        const newItem = await todoItem.update({ isDone })
        return { updateResult: { updated: true }, newItem }
      } catch (e) {
        return { updateResult: { updated: false, error: e.toString() } }
      }
    }
  }
}
