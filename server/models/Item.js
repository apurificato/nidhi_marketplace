const { model, Schema } = require('mongoose');

const itemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  startingBid: { type: Number, required: true },
  currentBid: { type: Number, required: true, default: 0 },
  seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  highBidder: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  endTime: { type: Date, default: () => Date.now() + 24 * 60 * 60 * 1000 }, // 24 hours from now
  bids: [{ type: Schema.Types.ObjectId, ref: 'Bid' }],
  imageId: { type: String } // Add this line
});

const Item = model('Item', itemSchema);

module.exports = Item;
