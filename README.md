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

### Source Control Technologies Used
* [Github](https://github.com/)

### Hosting Technologies Used
* [Heroku](https://www.heroku.com)

### Known Limitations / Issues
* Unable to select no stars.
* Does not reset to 5 stars automatically on a new day, has to be manually clicked.
* No authentication between the website and the server.
* Client saves profiles and benefits whenever a profile is switched, need better logic to determine whether or not the profiles and benefits have changed because of a profile switch rather than being changed by the user.
* Client webpack seems to be bundling into a single file - client.js; it is not bundling vendor code into libs.js.
* Only tested in Chrome.

### Further Improvements
* Create a repository base class and an derived class for each collection in the MongoDb database instead of accessing the database and collection directly from within the router class (benefits router).
* Add a "No Stars" button to the screen so that all stars can be deactivated.
* Improve security between client and server (SSL, possibly also using JWT).
* Improve security between server and database (currently IP is not whitelisted - open to all who know username and password).
* Add a loading spinner on initial load.
* Look into better mechanism for loading and saving from the server (are there async hooks available?).
* Got Wallaby running tests but would have liked to have got mocha running the tests and set up a CI process in Github when checking in.
* Tried to get Heroku to pull from Github when master branch was updated but didn't seem to pick up on commits, perhaps they need to be from PR's rather than simple commits into branch?
* Would have liked to have containerised this app in docker but ran out of time.