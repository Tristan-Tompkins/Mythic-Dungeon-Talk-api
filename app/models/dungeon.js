const mongoose = require('mongoose')

const dungeonSchema = new mongoose.Schema({
  dungeonName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    }
  }, {
    timestamps: true
})
const Dungeon = mongoose.model('Dungeon', dungeonSchema)
module.exports = Dungeon
