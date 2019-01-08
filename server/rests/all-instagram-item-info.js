import beautify from 'json-beautify'
import models from '../models'

export default async function allInstagramItemInfo (req, res) {
  try {
    const instagramItems = await models.InstagramItem.findAll({ 
      include: [{ model: models.InstagramInfo, as: 'infos'}]
    })
    res.send(instagramItems)
  } catch (e) {
    res.status(401).send({error: e.toString()})
  }
}