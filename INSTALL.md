Getting Started
====
To run this project, follow the steps below.
## Installing the dependencies and tools
This project uses NPM and Grunt to manage dependencies and create a fresh build. To install NPM dependencies, you must have NodeJS and NPM installed. 

1. Run `npm install` to download and install all dependencies. This will copy libraries as well as the TA's source code into node_modules.
2. Run `npm install -g grunt-cli` to install the CLI for [Grunt task runner](http://gruntjs.com). (You may need to use `sudo` on some Linux systems. _If sudo is not available_, run `npm install grunt-cli` to install locally, and then subsitute `./node_modules/.bin/grunt` through the rest of the instructions)

## Build and run the project
Once all dependencies are installed, use the grunt targets to build the project.

1. Run `grunt` to build the project. This create a fresh build inside the directory **build/**. All of the JS code from **src/js/** is concatenated into one file, **build/gameplay/js/app.js**. 
2. Run `grunt docs` to generate the YUI docs for the implementation. These are put in **build/docs/javascript/**.
3. Run `ant server` to start the server. Navigate to <http://localhost:8081> to view the project.

## Run the tests
1. Run `grunt test` to run the command-line version of the tests. This also prepares the browser tests.
2. Open <http://localhost:8081/test.html> to run the tests in the browser. (The server must be running to view this page, see step 3 from above)

## Test coverage
1. Run `grunt coverage` to produce a report about the line coverage of the tests. The report file is **coverage.html**.

## JSHint
1. You can run jshint on all source code (both test and source) with `grunt jshint`.
2. To run only on source code, run `grunt jshint:models`.
3. To run only on the test code, run `grunt jshint:tests`.

