import axios from 'axios'

module.exports = (sequelize, DataTypes) => {
  const InstagramItem = sequelize.define('InstagramItem', {
    url: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    isDone: {
      type: DataTypes.BOOLEAN,
      default: false
    }
  }, {
    hooks: {
      afterCreate: async (item) => {
        try {
          const response = await axios.post( 'http://' + process.env.CRAPING_HOST +  ':5000/api/instgram_crapper', {
            url: item.url
          })
          const { data: {results} } = response
          return await sequelize.models.InstagramInfo.bulkCreate(
            results.map(r => {
              const {comments, number_of_likes, number_of_comments, image, number_of_followers} = r
              return {
                comments,
                numberOfLikes: number_of_likes,
                numberOfComments: number_of_comments,
                image,
                instagramItemId: item.id,
                numberOfFollowers: number_of_followers
              }
            })
          )
        } catch (e) {
          console.log(e)
        }
      }
    }
  });
  InstagramItem.associate = (models) => {
    InstagramItem.hasMany(models.InstagramInfo, {
      foreignKey: 'instagramItemId',
      as: 'infos'
    })
  };
  return InstagramItem;
};
