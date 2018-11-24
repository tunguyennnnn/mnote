'use strict';
module.exports = (sequelize, DataTypes) => {
  var Thread = sequelize.define('Thread', {
    topicId: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      defaultValue: ''
    },
    type: DataTypes.STRING,
    detail: {
      type: DataTypes.JSONB,
      defaultValue: []
    }
  }, {});
  Thread.associate = function(models) {
    // associations can be defined here
  };
  return Thread;
};
