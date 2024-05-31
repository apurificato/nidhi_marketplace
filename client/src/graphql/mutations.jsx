import { gql } from "@apollo/client";

// Define a mutation to create a new user
export const CREATE_USER = gql`
  mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      user {
        id
        username
        email
      }
      token
    }
  }
`;

// Define a mutation to log in a user
export const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      user {
        id
        username
        email
      }
      token
    }
  }
`;

// Define a mutation to create a new item
export const CREATE_ITEM = gql`
  mutation CreateItem($userId: ID!, $name: String!, $description: String!, $startingBid: Float!, $imageId: String!) {
    createItem(userId: $userId, name: $name, description: $description, startingBid: $startingBid, imageId: $imageId) {
      id
      name
      description
      imageId
      startingBid
      currentBid
      seller {
        id
        username
      }
      endTime
    }
  }
`;


// Define a mutation to place a bid on an item

export const PLACE_BID = gql`
  mutation PlaceBid($userId: ID!, $itemId: ID!, $amount: Float!) {
    placeBid(userId: $userId, itemId: $itemId, amount: $amount) {
      id
      amount
      item {
        id
        name
        currentBid
        highBidder {
          id
          username
        }
      }
      user {
        id
        username
      }
    }
  }
`;
 export const ACCEPT_BID = gql`
 mutation AcceptBid($itemId: ID!, $userId: ID!) {
  acceptBid(itemId: $itemId, userId: $userId) {
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
    bids {
      id
      amount
      user {
        id
        username
      }
    }
  }
}
 `