'use strict';
module.exports = (sequelize, DataTypes) => {
  var Thread = sequelize.define('Thread', {
    topicId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    type: DataTypes.STRING,
    detail: DataTypes.JSONB
  }, {});
  Thread.associate = function(models) {
    // associations can be defined here
  };
  return Thread;
};