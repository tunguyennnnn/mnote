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
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('InstagramInfos');
  }
};