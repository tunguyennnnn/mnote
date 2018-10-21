'use strict'
module.exports = (sequelize, DataTypes) => {
  const ExpertTopic = sequelize.define('ExpertTopic', {
    name: DataTypes.STRING
  }, {
    indexes: [
      {
        unique: true,
        fields: ['name']
      },
      {
        fields: ['createdAt']
      }
    ]
  })
  ExpertTopic.associate = (models) => {

  }
  return ExpertTopic
}
