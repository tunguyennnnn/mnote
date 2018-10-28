'use strict';
module.exports = (sequelize, DataTypes) => {
  const InstagramItem = sequelize.define('InstagramItem', {
    url: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  InstagramItem.associate = function(models) {
    // associations can be defined here
  };
  return InstagramItem;
};