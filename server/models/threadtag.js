'use strict'
module.exports = (sequelize, DataTypes) => {
  const ThreadTag = sequelize.define('ThreadTag', {
    threadId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {})
  ThreadTag.associate = (models) => {
    // associations can be defined here
  }
  return ThreadTag
}
