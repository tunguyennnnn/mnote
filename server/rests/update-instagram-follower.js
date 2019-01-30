import models from '../models'
import _ from 'lodash'
import axios from 'axios'

async function requestUpdate (items) {
  if (_.isEmpty(items)) return
  const [item] = items
  const response = await axios.post( 'http://' + process.env.CRAPING_HOST +  ':5000/api/instgram_crapper', {
    url: item.url
  })
  const { data: {results} } = response
  const { number_of_followers } = results[0] || {}
  await models.InstagramInfo.update({
    numberOfFollowers: number_of_followers,
  }, 
  { where: { instagramItemId: item.id} })

  setTimeout(requestUpdate.bind(null, _.slice(items, 1)), 10000)
}

export default async function updateFollower (req, res) {
  try {
    const instagramItems = await models.InstagramItem.findAll({
      where: {
        url: {
          $notLike: '%location%'
        }
      }
    })
    requestUpdate(instagramItems)
    res.status(201).send()
  } catch (e) {
    console.log(e)
    res.status(401).send()
  }
}