const mongoose = require('mongoose')

const dungeonSchema = new mongoose.Schema({
  dungeonName: {
    type: String,
    required: true
  },
  // linkPic: {
  //   type: URL,
  //   required: true
  // },
  description: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, {
    timestamps: true
})

module.exports = mongoose.model('Dungeon', dungeonSchema)
