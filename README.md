# Rooster Money Challenge

### Development Technologies Used
* [React](https://reactjs.org/) (specifically [React Hooks](https://reactjs.org/docs/hooks-overview.html))
* [TypeScript](https://www.typescriptlang.org/)
* [Webpack](https://webpack.js.org/)
* [NodeJS](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Material UI](https://material-ui.com/)
* [Material Design Icons](https://materialdesignicons.com/)
* [Less](http://lesscss.org/)
* [Pug](https://pugjs.org/api/getting-started.html)

### Testing Technologies Used
* [Mocha](https://mochajs.org/)
* [Chai](https://www.chaijs.com/)
* [Enzyme](https://airbnb.io/enzyme/)

### Database Technologies Used
* [MongoDB](https://www.mongodb.com/) (specifically [Atlas](https://www.mongodb.com/cloud/atlas))

### Known Limitations
* Unable to select no stars.
* Does not reset to 5 stars automatically on a new day, has to be manually clicked.
* No authentication between the website and the server.

### Further Improvements
* Create a repository base class and an derived class for each collection in the MongoDb database instead of accessing the database and collection directly from within the router class (benefits router).
* Add a "No Stars" button to the screen so that all stars can be deactivated.
* Improve security between client and server (SSL, possibly also using JWT).
* Improve security between server and database (currently IP is not whitelisted - open to all who know username and password).
