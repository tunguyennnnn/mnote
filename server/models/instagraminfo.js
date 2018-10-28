'use strict';
module.exports = (sequelize, DataTypes) => {
  const InstagramInfo = sequelize.define('InstagramInfo', {
    comments: DataTypes.JSONB,
    title: DataTypes.STRING,
    numberOfComments: DataTypes.INTEGER,
    image: DataTypes.STRING,
    numberOfLikes: DataTypes.INTEGER,
    instagramItemId: DataTypes.INTEGER
  }, {});
  InstagramInfo.associate = function(models) {
    // associations can be defined here
  };
  return InstagramInfo;
};