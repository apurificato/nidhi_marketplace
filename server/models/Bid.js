const { model, Schema } = require('mongoose')
// An item should have a name, description, starting bid, current bid, seller, high bidder, time remaining

// Bid Schema
const bidSchema = new Schema({
    item: { type: Schema.Types.ObjectId, ref: 'Item', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now }
  })

const Bid = model('Bid', bidSchema)

module.exports = Bid