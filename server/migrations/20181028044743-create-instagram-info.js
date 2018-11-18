'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('InstagramInfos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comments: {
        type: Sequelize.JSONB
      },
      title: {
        type: Sequelize.STRING
      },
      numberOfFollowers: {
        type: Sequelize.INTEGER
      },
      numberOfComments: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
      numberOfLikes: {
        type: Sequelize.INTEGER
      },
      instagramItemId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.literal('NOW()'),
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('InstagramInfos');
  }
};
