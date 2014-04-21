Settlers of Catan
===

Implementation of Settlers of Catan for BYU CS 340, Winter 2014 Semester by Team Lumberjack (Team 3).

This project is creates a web-based version of Settlers of Catan. The code includes both the client-side application and the server to support it. The online game can be played by 4 players.

There are example json files under the 'examples' folder

### Group Members
* Alan Dayton
* Chris Brown
* Jared Forsyth
* Nate McMaster
* Spence Gardner


### Setup
Install all JS dependencies with `npm install --save-dev`.

Install Grunt `npm install -g grunt-cli`.  This may require `sudo` on some systems.

Build the Javascript files by running `grunt`. 

### YUI
Documentation can be build by running `grunt docs`. This creates a YUI doc in /docs/javascript/.

### Run the server
Run the server using `ant server`; then navigate to http://localhost:8081/ in order to read the documentation.


### Debugging test cases
To debug node, follow these steps:

1. Install [node-inspector](https://github.com/node-inspector/node-inspector). `npm install -g node-inspector`
2. Run `node-inspector`.
3. Start grunt tests in debug mode. In Bash, this is `node --debug-brk $(which grunt) test`
4. Open the debugger. **Only works in Chrome** <http://127.0.0.1:8080/debug?port=5858>
