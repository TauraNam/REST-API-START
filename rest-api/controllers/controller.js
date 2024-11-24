import Dev from '../models/programuotojas.js';
import mongoose from 'mongoose'


export const prog_get = (req, res) => {
  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);

  if (!isNaN(lng) && !isNaN(lat)) {
    Dev.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          distanceField: 'distance',
          spherical: true,
          maxDistance: 100000
        }
      }
    ])
      .then((devs) => {
        res.send(devs);
      })
      .catch((error) => {
        res.status(500).send(error.message);
      });
  } else {
    Dev.find()
      .then((devs) => {
        res.send(devs);
      })
      .catch((error) => {
        console.log('Error:', error);
        res.status(500).send(error.message);
      });
  }
};

export const prog_get_one = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Tokio programuotojo nera.' })
  }
  const programuotojas = await Dev.findById({ _id: id })
  if (!programuotojas) {
    return res.status(404).json({ error: 'Tokio programuotojo nera.' })
  }
  res.status(200).json(programuotojas);
}


export const prog_post = async (req, res) => {
  const lng = parseFloat(req.query.lng);
  const lat = parseFloat(req.query.lat);
  const { vardas, tech, laisvas, location } = req.body
  let emptyFields = []
  if (!vardas) { emptyFields.push('vardas') }
  if (!tech) { emptyFields.push('tech') }
  if (!laisvas) { emptyFields.push('laisvas') }
  if (!location) { emptyFields.push('location') }
  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Prasome uzpildyti visus laukelius', emptyFields })
  }

  try {
    const naujasProgramuotojas = await Dev.create({ vardas, tech, laisvas, location })
    res.status(200).json(naujasProgramuotojas)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }

};

export const prog_put = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Tokio programuotojo nera.' })
  }
  const programuotojas = await Dev.findOneAndUpdate({ _id: id }, { ...req.body })

  if (!programuotojas) {
    return res.status(404).json({ error: 'Tokio programuotojo nera.' })
  }
  res.status(200).json(programuotojas)
}


export const prog_delete = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Tokio programuotojo nera.' })
  }
  const programuotojas = await Dev.findOneAndDelete({ _id: id })
  if (!programuotojas) {
    return res.status(404).json({ error: 'Tokio programuotojo nera.' })
  }
  res.status(200).json(programuotojas);
}
