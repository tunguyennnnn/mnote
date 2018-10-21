'use strict'
const _ = require('lodash')

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date()
    const topics = _.range(0, 200).map(number => {
      const d = new Date(now)
      d.setMinutes(now.getMinutes() + number)
      return {
        name: `Topic ${number}`,
        createdAt: d.toISOString().slice(0, 19).replace('T', ' '),
        updatedAt: d.toISOString().slice(0, 19).replace('T', ' ')
      }
    })
    return queryInterface.bulkInsert('ExpertTopics', topics)
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ExpertTopics', null, {})
  }
}
