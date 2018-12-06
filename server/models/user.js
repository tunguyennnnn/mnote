'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    sub: DataTypes.STRING,
    email: DataTypes.STRING,
    metaData: DataTypes.JSONB
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};