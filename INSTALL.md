Getting Started
====
To run this project, follow the steps below.
## Installing the dependencies and tools
This project uses NPM and Grunt to manage dependencies and create a fresh build. To install NPM dependencies, you must have NodeJS and NPM installed. 

1. Run `npm install` to download and install all dependencies. This will copy libraries as well as the TA's source code into node_modules.
2. Run `npm install -g grunt-cli` to install the CLI for [Grunt task runner](http://gruntjs.com). (You may need to use `sudo` on some Linux systems.)

## Build and run the project
Once all dependencies are installed, use the grunt targets to build the project.

1. Run `grunt` to build the project. This create a fresh build inside the directory **build/**. All of the JS code from **src/js/** is concatenated into one file, **build/gameplay/js/app.js**. 
3. Run `grunt docs` to generate the YUI docs for the implementation. These are put in **build/docs/javascript/**.
2. Run `ant server` to start the server. Navigate to <http://localhost:8081> to view the project.

## Run the tests
1. Run `grunt test` to run the command-line version of the tests.
2. Run `grunt test:browser` and open <http://localhost:8081/test.html>. The server must be running to view this page.

## Test coverage
1. Run `grunt coverage` to produce a report about the line coverage of the tests. The report file is **coverage.html**.
