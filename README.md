# Bidding-Site

- Welcome to the Bidding-Site, a web application similar to eBay where users can bid on items. This project is built using React for the frontend, MongoDB and Mongoose for the database, and GraphQL for API communication.

## Table of Contents

[Features](#features)
[Installation](#installation)
[Usage](#usage)
[Technologies](#technologies)
[Contributing](#contributing)
[License](#license)

## Features

1. User Authentication
2. Create, Read, Update, Delete (CRUD) operations for items
3. Real-time bidding on items
4. User profile management

## Installation

1. Clone the repository:

- git clone https://github.com/yourusername/auction-website.git
- cd bidding-site
- Install dependencies for the server and client:


## Server dependencies

1. cd server
2. npm install

## Client dependencies

1. cd ../client
2. npm install
3. Set up environment variables:

- Create a .env file in the server directory with the following variables:

- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret
- Start the server and client:


## Start the server

1. cd server
2. npm start

## Start the client

1. cd ../client
2. npm start
3. Open your browser and navigate to http://localhost:3000.

## Usage

1. Sign Up / Log In: Create an account or log in with your existing credentials.
2. Browse Items: Browse through the list of items available for bidding.
3. Place a Bid: Click on an item to view details and place a bid.
4. Add Items: If you're a seller, you can add new items for auction from your profile page.
5. Manage Profile: Update your profile information and view your bidding history.


## Technologies

- Frontend: React, Apollo Client, Tailwind CSS
- Backend: Node.js, Express, GraphQL, Apollo Server
- Database: MongoDB, Mongoose
- Authentication: JSON Web Tokens (JWT)
- Real-time Updates: WebSockets

## Contributing

- Contributions are welcome! Please create a pull request with your changes or open an issue to discuss what you would like to change.

## License

- This project is licensed under the MIT License. See the LICENSE file for details.
