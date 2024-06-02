# nidhi Marketplace
Welcome to nidhi marketplace, a Full-Stack website application that mimics other marketplaces such as eBay or Facebook Marketplace, where users can register an account, create and list items (including item image uploads), and then get to buying and selling items on the site through a live bidding/auction feature. Once they've created an account, users will be able to submit bids on items that they want to buy. This project was built using a M.E.R.N.G. technology stack, which includes React for the Front-end and MongoDB (and Mongoose npm) for the database/data storage, Node.js, Express.js, and GraphQL for Back-end functionality.

![GitHub license](https://img.shields.io/badge/License-MIT-brightgreen.svg)

## Table of Contents
[Features](#features) | [Installation](#installation) | [Project Structure](#project-structure) | [Usage](#usage) | [Technologies](#technologies) | [Credits](#credits) | [Contributions](#contributions) | [License](#license) | [Questions](#questions)

## Features
This website project was created to meet the following criteria, as well as enable the following features:
1. User account creation and registration,
2. User Authentication,
3. Create, Read, Update, Delete (CRUD) operations for data stored in the MongoDB database,
4. Real-time/live bidding on items, and
5. Payment submission to purchase items in the marketplace/auction

## Project Structure
- /client
    - /node_modules
    - /public (folder containing all images used on front-end)
    - /src
        - /assets
        - /components (all of different components used/created with React that are referenced on pages)
        - /context (files that offer context for things such as user authorization)
        - /graphql (queries and mutations files)
        - /pages (files that create different accessible pages that render on site)
            - /dash
                - /components (more components built to use for user dashboard/account)
        - App.jsx
        - client.jsx
        - index.scss
        - main.jsx
        - PrivateRoute.jsx
    - redirects
    - .eslintrc.cjs
    - .gitignore
    - index.html
    - package.json
    - README.md
    - vite.config.js
- /server
    - /config
        - client.js
    - /middleware
        - authMiddleware.jsx
    - /models (folder containing JavaScript files that initialize object models in database)
        - index.js
        - Bid.js
        - Item.js
        - User.js
    - /node_modules
    - /routes
        - auth_routes.js
    - /schema
        - index.js
        - Context.js
        - resolvers.js
        - typeDefs.js
    - .env (environment variables; establishes connection to database and JWT secret)
    - .env_EXAMPLE (file that shows an example of what user needs to add to an .env file to after cloning project)
    - .gitignore
    - package.json
    - server.js
- .gitignore (file that lists other files to be ignored by Github when pushing to repository, such as /node_modules folder and .env file)
- LICENSE (license used for this repository - MIT License)
- package.json (file containing JSON npm dependencies and script commands)
- README (information file containing information about this specific project/application)

## Installation
- Git clone the project repository by visiting the project page, found here (https://github.com/apurificato/nidhi_marketplace):

1. So, first open VS Code platform and also open a command line terminal in VS Code. Then do some 'cd' commands into the directory that you want to save the project folder into (in your system).
2. Then, in the same terminal run this command for cloning by way of https: 'git clone https://github.com/apurificato/nidhi_marketplace.git'. This will clone the whole repository.
3. From there, keeping the same terminal open, make sure you are have moved into the project's directory titled 'nidhi_marketplace', as git should now be enabled.
4. In the same terminal, run this command: 'code . -a' which will open the project in VS Code - you will be able to see this by opening the file/folder workstation in the left-hand column.
5. Once open, you need to make sure all of the project's dependencies that were used are installed. You can do this by running the command 'npm i' in every directory in the project.
6. So, for clarity, installing those dependencies will look like this: In the main directory/folder of the project (aka 'nidhi_marketplace', run the command 'npm i', then once those dependency packages are installed, run a 'cd /client' command to go into the /client folder. In there, again, run the command 'npm i' to install that folder's client-side dependencies that are being used. Once installed, run 'cd ..' to go back to main directory/folder. And lastly, do a 'cd /server' to move into the /server folder and do an 'npm i' command to install the required node modules/packages being used for the server-side code. Run a 'cd ..' command finally to get back to main folder. All dependencies should be installed, causing no issues when starting the server.
7. Lastly, do a command in the main folder to run the servers (relying on Nodemon npm for a dev server). This command has been set up through a script that also utilizes the Concurrently npm to run a server-side server and a client-side server locally simultaneously in the same Node terminal (typically these would be separate, but with using React this is useful so a user can work at the same time while seeing live changes happen in their development environment).
8. Once the servers are started, the user can click to open the Vite client side localhost url and see the website displaying in the browser on the Front-end.

** NOTE: for those inexperienced, when running commands in the terminal, omit the parenthesis surrounding commands that have been listed or mentioned above.

## Instructions at a Glance:
### Installing Server Dependencies
1. cd server
2. npm install (or simply 'npm i')

### Installing Client Dependencies
1. cd ../client
2. npm install (or simply 'npm i')
3. Set up environment variables:

** NOTE: You also need to create a .env file in the server directory with the following variables so that MongoDB database connection can be established:
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret
- Start the server and client:

### Starting the server
1. cd server
2. npm start

### Starting the client
1. cd ../client
2. npm start
3. Open your browser and navigate to http://localhost:3000, for example.

## Usage

1. Sign Up / Log In: Create an account or log in with your existing credentials.
2. Browse Items: Browse through the list of items for sale and available for bidding.
3. Place a Bid: Bids can be placed direclty on item cards on the Buy Items page or bids can be place on the single item page, through bid buttons/fields.
4. View and Item: Click on an item to view details and see the single item on its own page.
4. Add Items: If you want to sell something, you can create a listing and add new items for auction through the List/Sell and Item page or through a button found on the User Account page.
5. Manage Profile/User Account Data: Users will be able to see data associated with their account, including items that they have listed for sale, items that they are bidding on, and items that they have bought (aka 'Bids Won', resolving the auction for that item).

## Technologies
The following technologies and tools have been used in this project, which includes the M.E.R.N.G. Stack, as well as other languages, tools, and resources:
- Frontend: Javascript, Vite & React, HTML, CSS, SCSS (SaSS) Compiler, CSS Bootstrap Framework - all used for streamlined styling.
- Backend: Node.js, Express.js, GraphQL, Apollo GraphQL Server
- Backend/Database: MongoDB (and Mongoose npm) and GraphQL for querying/updating the database.
- Authentication: JSON Web Tokens (JWT)
- Real-time Updates: WebSockets
- Payment: Stripe API

## Credits
This Website application was created, designed, programmed, and coded by William Gallagher, Vincent Galante, Mirsad Abedinoski, Anthony Purificato.
- Rutgers Coding Bootcamp provided resources and support for completing this project, as it was a group project required to complete the course.
- OpenAI ChatGPT was utilized at some points for general coding assistance and aid upon encountering problems with code.

## Contributions
Since this code is public and open-source, contributions are welcomed and even encouraged! Each of us creators of this application are enthusiastic for programming and enjoy learning new concepts and pushing the boundaries of our skills to become better programmers and developers.
- Feel free to clone and/or fork the code, or
- Open an issue to discuss what you would like to change.

## License
Website/Application is available for public use, hosted on Github servers, utilizing an MIT License - see the LICENSE file for details.

![GitHub license](https://img.shields.io/badge/License-MIT-brightgreen.svg)
  
For more information on license please click the [Link](https://opensource.org/licenses/MIT)

## Questions
Check out my [GitHub](https://github.com/apurificato)
  
For additional questions, reach out to me on [LinkedIn](https://www.linkedin.com/in/apurificato/)

[![My Skills](https://skillicons.dev/icons?i=linkedin)](https://www.linkedin.com/in/apurificato/)