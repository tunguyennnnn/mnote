'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    sub: DataTypes.STRING,
    email: DataTypes.STRING,
    metaData: DataTypes.JSONB
  }, {});
  User.associate = (models) => {
    User.hasMany(models.Thread, {
      foreignKey: 'userId',
      as: 'threads'
    })
  };
  return User;
};