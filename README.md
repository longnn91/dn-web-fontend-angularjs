# Da Nang Land Platform - High Quality Product

## Table of contents

### Info
* The project using AngularJS
* Author: Long Nguyen - shenlong1991@gmail.com
* Position: Front-End Developer

### Setup virtual domain
* 127.0.0.1 training-frontend.com

### Install project
* Install Nodejs version 6 or later via [NVM](https://github.com/creationix/nvm)
* [Install yarn](https://yarnpkg.com/en/docs/install)
* Install global packages: yarn add global gulp webpack
* Go to root project
* Install node modules: yarn install
* Create .env file for development
```

API_URL=http://localhost:3000/
APP_NAME=Dnland
APP_ENV=development
DEVELOPMENT=true
NODE_ENV=development

```
* NODE_ENV=development for build local dev

* Development at local will be out

```
* Build project ( Learn more script in package.json)
- DEV
```
yarn dev
```

### Tools
* [Using Atom Editor](https://atom.io/)
* Install Atom packages: atom-beautify, linter, linter-eslint

### Coding
* AngularJS 1.5.8 document: [Angular](https://code.angularjs.org/1.5.8/docs/api)
* Coding convention: [Angular Best Practices](https://github.com/johnpapa/angular-styleguide)
* Using [Javascript ECMAScript 6](http://es6-features.org/)
* Using [SASS](http://sass-lang.com/) for development
* Using [Gulp](http://gulpjs.com/) and [Webpack](https://webpack.github.io/) for build and optimizing front-end code.

### Before do task
* Please create new brand with your issue.
* Please pull new code from **develop** brand before checkout your brand

### Before commit
* Please don't include anything that not been developed by you.
* Please don't commit anything that can be regenerated from other things that were committed such as bower_components, node_modules.
* Your code, you must be cleanup and please check format code before commit ( tabs, spaces, blank ).
* In your message commit, please reference your issue for review task. Ex: Enigma-100.
* Please using **develop** brand for development and don't use **master** brand.

### Optional commit
* Merge code from **develop** brand and if conflict please fix conflict.

### Bitbucket target
* Create new pull request with your brand and merge to **develop** brand.
* Add reviewers for review your pull request.
* When you create new pull request if you see conflict, please decline pull request and fix.

### Formatting
* Please using 2 Spaces for indentation ( .js, .scss )
* Please using 2 Tab for indentation ( html )
* Never mix tabs and spaces
