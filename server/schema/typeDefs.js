const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  id: ID!
  username: String!
  email: String!
  itemsForSale: [Item!]
  bids: [Bid!]
  itemsWon: [Item!]
}

type Item {
  id: ID!
  name: String!
  description: String!
  startingBid: Float!
  currentBid: Float!
  seller: User!
  highBidder: User
  endTime: String!
  bids: [Bid!]
  isCompleted: Boolean!
  imageId: String # Add this line
}

type Bid {
  id: ID!
  item: Item!
  user: User!
  amount: Float!
}

type AuthPayload {
  user: User!
  token: String!
}

type Query {
  me: User
  users: [User!]
  user(id: ID!): User
  items: [Item!]
  item(id: ID!): Item
  bids: [Bid!]
  bid(id: ID!): Bid
}

type Mutation {
  createUser(username: String!, email: String!, password: String!): AuthPayload!
  login(email: String!, password: String!): AuthPayload!
  createItem(userId: ID!, name: String!, description: String!, startingBid: Float!, imageId: String!): Item! # Add imageId
  placeBid(userId: ID!, itemId: ID!, amount: Float!): Bid!
  acceptBid(itemId: ID!, userId: ID!): Item! # New mutation for accepting bids
}
`;

module.exports = typeDefs;
