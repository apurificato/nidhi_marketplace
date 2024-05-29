const { User, Item, Bid } = require('../models'); // Adjust the path as necessary
const bcrypt = require('bcrypt');

const resolvers = {
  Query: {
    users: () => User.find().exec(),
    user: (_, { id }) => User.findById(id).exec(),
    items: () => Item.find().exec(),
    item: (_, { id }) => Item.findById(id).exec(),
    bids: () => Bid.find().exec(),
    bid: (_, { id }) => Bid.findById(id).exec(),
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, email, password: hashedPassword });
      await user.save();
      return user;
    },
    createItem: async (_, { userId, name, description, startingBid }) => {
      const item = new Item({
        name,
        description,
        startingBid,
        currentBid: startingBid,
        seller: userId,
        endTime: Date.now() + 24 * 60 * 60 * 1000 // 24 hours from now
      });
      await item.save();

      const user = await User.findById(userId).exec();
      user.itemsForSale.push(item._id);
      await user.save();

      return item;
    },
    placeBid: async (_, { userId, itemId, amount }) => {
      const bid = new Bid({
        item: itemId,
        user: userId,
        amount
      });
      await bid.save();

      const item = await Item.findById(itemId).exec();
      item.bids.push(bid._id);
      item.currentBid = amount;
      item.highBidder = userId;
      await item.save();

      const user = await User.findById(userId).exec();
      user.bids.push(bid._id);
      await user.save();

      return bid;
    }
  },
  User: {
    itemsForSale: (user) => Item.find({ seller: user.id }).exec(),
    bids: (user) => Bid.find({ user: user.id }).exec(),
    itemsWon: async (user) => {
      const wonBids = await Bid.find({ user: user.id }).populate('item').exec();
      return wonBids.map(bid => bid.item).filter(item => item.highBidder && item.highBidder.toString() === user.id);
    }
  },
  Item: {
    seller: (item) => User.findById(item.seller).exec(),
    highBidder: (item) => User.findById(item.highBidder).exec(),
    bids: (item) => Bid.find({ item: item.id }).exec()
  },
  Bid: {
    item: (bid) => Item.findById(bid.item).exec(),
    user: (bid) => User.findById(bid.user).exec()
  }
};

module.exports = resolvers;