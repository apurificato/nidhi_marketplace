const { User, Item, Bid } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) throw new Error('Not authenticated');
      const user = await User.findById(context.user.id);
      return user;
    },
    users: () => User.find().exec(),
    user: async (_, { id }) => {
      const user = await User.findById(id)
      console.log(user)
      return user
  },
    items: () => Item.find().exec(),
    item: (_, { id }) => Item.findById(id).exec(),
    bids: () => Bid.find().exec(),
    bid: (_, { id }) => Bid.findById(id).exec(),
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      const user = new User({ username, email, password });
      await user.save();
      const token = user.generateAuthToken();
      return { user, token };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user || !(await user.validatePass(password))) {
        throw new Error('Invalid email or password');
      }
      const token = user.generateAuthToken();
      return { user, token };
    },
    createItem: async (_, { userId, name, description, startingBid, imageId }) => {
      const item = new Item({
        name,
        description,
        startingBid,
        currentBid: startingBid,
        seller: userId,
        endTime: Date.now() + 24 * 60 * 60 * 1000, // 24 hours from now
        imageId // Include this field
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
    },
    acceptBid: async (_, { itemId, userId }, context) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }

      const item = await Item.findById(itemId).exec();
      if (!item) {
        throw new Error('Item not found');
      }

      if (item.seller.toString() !== context.user.id) {
        throw new Error('Only the seller can accept bids for their item');
      }

      item.endTime = new Date().toISOString();

      if (item.highBidder) {
        const highBidder = await User.findById(item.highBidder).exec();
        if (highBidder) {
          highBidder.itemsWon.push(itemId);
          await highBidder.save();
        }
      }

      await item.save();

      return item;
    },
  },
  User: {
    itemsForSale: (user) => Item.find({ seller: user.id }).exec(),
    bids: (user) => Bid.find({ user: user.id }).exec(),
    itemsWon: (user) => Item.find({ highBidder: user.id}).exec()
    
  },
  Item: {
    isCompleted: (item) => {
      return new Date(item.endTime) < new Date();
    },
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
