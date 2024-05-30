import { gql } from "@apollo/client";

// Define a query to fetch all users
export const GET_ME = gql`
  query GetMe {
    me {
      id
      username
      email
    }
  }
`;

export const GET_USER_DETAILS = gql`
  query GetUserDetails($id: ID!) {
    user(id: $id) {
      id
      username
      email
      itemsForSale {
        id
        name
        description
        startingBid
        currentBid
        endTime
      }
      bids {
        id
        item {
          id
          name
        }
        amount
      }
      itemsWon {
        id
        name
        description
        currentBid
      }
    }
  }
`;

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
      email
      itemsForSale {
        id
        name
        description
      }
      bids {
        id
        amount
      }
      itemsWon {
        id
        name
      }
    }
  }
`;

// Define a query to fetch a single user by ID
export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      username
      email
      itemsForSale {
        id
        name
        description
      }
      bids {
        id
        amount
      }
      itemsWon {
        id
        name
      }
    }
  }
`;

// Define a query to fetch all items
export const GET_ITEMS = gql`
  query GetItems {
    items {
      id
      name
      description
      startingBid
      currentBid
      seller {
        id
        username
      }
      highBidder {
        id
        username
      }
      endTime
    }
  }
`;

// Define a query to fetch a single item by ID
export const GET_ITEM = gql`
  query GetItem($id: ID!) {
    item(id: $id) {
      id
      name
      description
      startingBid
      currentBid
      seller {
        id
        username
      }
      highBidder {
        id
        username
      }
      endTime
    }
  }
`;

// Define a query to fetch all bids
export const GET_BIDS = gql`
  query GetBids {
    bids {
      id
      amount
      item {
        id
        name
      }
      user {
        id
        username
      }
    }
  }
`;

// Define a query to fetch a single bid by ID
export const GET_BID = gql`
  query GetBid($id: ID!) {
    bid(id: $id) {
      id
      amount
      item {
        id
        name
      }
      user {
        id
        username
      }
    }
  }
`;