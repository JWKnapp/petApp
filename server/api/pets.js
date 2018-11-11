const router = require('express').Router()
const {Pet} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const pets = await Pet.findAll({
      attributes: ['name', 'picUrl']
    })
    res.json(pets)
  } catch (err) {
    next(err)
  }
})

router.get('/:petId', async (req, res, next) => {
  try {
    const pet = await Pet.findById(req.params.petId)
    res.json(pet)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const {name, type, weight, age, issues, perscriptions, notes, picUrl } = req.body
  try {
    const pet = await Pet.create({
      name,
      type,
      weight,
      age,
      issues,
      perscriptions,
      notes,
      picUrl
    })
    res.json(pet)
  } catch (err) {
    next(err)
  }
})

router.put('/:petId', async (req, res, next) => {
  const {name, type, weight, age, issues, perscriptions, notes, picUrl } = req.body
  const updatedPet = {
    name,
    type,
    weight,
    age,
    issues,
    perscriptions,
    notes,
    picUrl
  }
  try {
    const petToChange = await Pet.findById(req.params.petId)
    await petToChange.update(updatedPet)
    res.json({
      petToChange: petToChange,
      message: 'Pet Updated!'
    })
  } catch (err) {
    next(err)
  }
})

router.delete('/:petId', async (req, res, next) => {
  try {
    const pet = await Pet.findById(req.params.petId)
    await pet.destroy()
    res.json({pet: pet, message: 'Pet Deleted'})
  } catch (err) {
    next(err)
  }
})
