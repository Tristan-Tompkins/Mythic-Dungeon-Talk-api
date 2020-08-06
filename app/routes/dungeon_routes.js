const express = require('express')
const passport = require('passport')

const Dungeon = require('../models/dungeon')

const customErrors = require('../../lib/custom_errors')

const handle404 = customErrors.handle404

const requireOwnership = customErrors.requireOwnership

const removeBlanks = require('../../lib/remove_blank_fields')

const requireToken = passport.authenticate('bearer', { session: false })

const router = express.Roter()
// GET
router.get('/dungeon', requireToken, (req, res, next) => {

  Dungeon.find()
    .then(dungeon => {
      return dungeon.map(dungeon => dungeon.toObject())
    })
    .then(dungeon => res.status(200).json({ dungeon: dungeon }))
    .catch(next)
})

// CREATE
router.post('/dungeon', requireToken, (req, res, next) => {
  req.body.dungeon.owner = req.user.id

  Dungeon.create(req.body.dungeon)
    .then(dungeons => {
      res.status(201).json({ dungeon: dungeon.toObject() })
    })
    .catch(next)
})

// UPDATE
router.patch('/dungeon/:id', requireToken, removeToken, removeBlanks, (req, res, next) => {
  delete req.body.dungeon.owner

  Dungeon.findById(req.params.id)
    .then(handle404)
    .then(dungeons => {
      requireOwnership(req, dungeons)
      return dungeons.updateOne(req.body.dungeon)
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

// DESTROY
router.delete('/example/:id', requireToken, (req, res, next) => {
  Dungeon.findById(req.params.id)
    .then(handle404)
    .then(example => {
      requireOwnership(req, dungeon)
      dungeon.deleteOne()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
})

module.exports = router
