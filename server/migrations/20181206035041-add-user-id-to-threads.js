'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'Threads',
      'userId',
      Sequelize.INTEGER,
      {
        defaultValue: 1
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'Threads',
      'userId'
    )
  }
};
