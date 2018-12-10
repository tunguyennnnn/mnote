'use strict';
module.exports = (sequelize, DataTypes) => {
  var Thread = sequelize.define('Thread', {
    topicId: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    userId: DataTypes.INTEGER,
    type: DataTypes.STRING,
    detail: {
      type: DataTypes.JSONB,
      defaultValue: []
    }
  }, {});
  Thread.associate = (models) => {
    Thread.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author'
    })
  };
  return Thread;
};
