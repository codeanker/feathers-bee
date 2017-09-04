# feathers-bee

[![Build Status](https://travis-ci.org/superbarne/feathers-bee.png?branch=master)](https://travis-ci.org/superbarne/feathers-bee)
[![Code Climate](https://codeclimate.com/github/superbarne/feathers-bee/badges/gpa.svg)](https://codeclimate.com/github/superbarne/feathers-bee)
[![Test Coverage](https://codeclimate.com/github/superbarne/feathers-bee/badges/coverage.svg)](https://codeclimate.com/github/superbarne/feathers-bee/coverage)
[![Dependency Status](https://img.shields.io/david/superbarne/feathers-bee.svg?style=flat-square)](https://david-dm.org/superbarne/feathers-bee)
[![Download Status](https://img.shields.io/npm/dm/feathers-bee.svg?style=flat-square)](https://www.npmjs.com/package/feathers-bee)

> 

## Installation

```
npm install feathers-bee --save
```

## Documentation

Please refer to the [feathers-bee documentation](http://docs.feathersjs.com/) for more details.

## Complete Example

Here's an example of a Feathers server that uses `feathers-bee`. 

```js
const feathers = require('feathers');
const rest = require('feathers-rest');
const hooks = require('feathers-hooks');
const bodyParser = require('body-parser');
const errorHandler = require('feathers-errors/handler');
const plugin = require('feathers-bee');

// Initialize the application
const app = feathers()
  .configure(rest())
  .configure(hooks())
  // Needed for parsing bodies (login)
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  // Initialize your feathers plugin
  .use('/plugin', plugin())
  .use(errorHandler());

app.listen(3030);

console.log('Feathers app started on 127.0.0.1:3030');
```

## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).
