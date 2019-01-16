'use strict';
import _ from 'lodash'

const CategoryTypes = {
  random: 'RANDOM',
  book: 'BOOK',
  video: 'VIDEO',
  article: 'ARTICLE'
}

module.exports = (sequelize, DataTypes) => {
  const TodoItem = sequelize.define('TodoItem', {
    userId: {
      type: DataTypes.INTEGER
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: CategoryTypes.random
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    threadId: DataTypes.INTEGER
  }, {})

  TodoItem.associate = (models) => {
    TodoItem.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    })

    TodoItem.belongsTo(models.Thread, {
      foreignKey: 'threadId',
      as: 'thread'
    })  

    TodoItem.isCategoryValid = (category) => {
      return _.includes(_.values(CategoryTypes), category)
    }
  }

  return TodoItem;
};