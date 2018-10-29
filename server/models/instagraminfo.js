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
  InstagramInfo.associate = (models) => {
    InstagramInfo.belongsTo(models.InstagramItem, {
      foreignKey: 'instagramItemId',
      as: 'item'
    })
  };
  return InstagramInfo;
};
