import models from '../models'

export default async function getInstagramItemInfo (req, res) {
  try {
    const { id } = req.params
    if (!id) throw new Error(`Must provide an id`)
    // const instagramItem = await models.InstagramItem.findOne({ 
    //   where: { id },
    //   include: [{ model: models.InstagramInfo, as: 'infos'}]
    // })

    const instagramItem = await models.InstagramInfo.findAll({
      attributes: ['id', 'instagramItemId']
    })
    res.status(200).json(instagramItem)
  } catch (e) {
    res.status(401).send({error: e.toString()})
  }
}