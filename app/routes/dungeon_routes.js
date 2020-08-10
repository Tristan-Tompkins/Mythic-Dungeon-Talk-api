const express = require('express')

const passport = require('passport')

const Dungeon = require('./../models/dungeon')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Router()
// INDEX
router.get('/dungeons', requireToken, (req, res, next) => {

  Dungeon.find({ owner: req.user.id })
    .then(dungeons => {
      return dungeons.map(dungeon => dungeon.toObject())
    })
    .then(dungeons => res.status(200).json({ dungeons: dungeons }))
    .catch(next)
})

// SHOW
router.get('/dungeons/:id', requireToken, (req, res, next) => {

  Dungeon.findById(req.params.id)
    .then(handle404)
    .then(dungeon => res.status(200).json({ dungeon: dungeon.toObject() }))
    .catch(next)
})

// CREATE
router.post('/dungeons', requireToken, (req, res, next) => {
  req.body.dungeon.owner = req.user.id
  console.log(req.body.dungeon)
  Dungeon.create(req.body.dungeon)
    .then(dungeon => {
      res.status(201).json({ dungeon: dungeon.toObject() })
    })
    .catch(next)
})

// UPDATE
router.patch('/dungeons/:id', requireToken, removeBlanks, (req, res, next) => {
  delete req.body.dungeon.owner

  Dungeon.findById(req.params.id)
    .then(handle404)
    .then(dungeon => {
      requireOwnership(req, dungeon)
      return dungeon.updateOne(req.body.dungeon)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
router.delete('/dungeons/:id', requireToken, requireOwnership, (req, res, next) => {
  Dungeon.findById(req.params.id)
    .then(handle404)
    .then(dungeon => {
      requireOwnership(req, dungeon)
      dungeon.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
