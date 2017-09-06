# feathers-bee

[![Greenkeeper badge](https://badges.greenkeeper.io/codeanker/feathers-bee.svg)](https://greenkeeper.io/)

[![Code Climate](https://codeclimate.com/github/codeanker/feathers-bee/badges/gpa.svg)](https://codeclimate.com/github/codeanker/feathers-bee)
[![Test Coverage](https://codeclimate.com/github/codeanker/feathers-bee/badges/coverage.svg)](https://codeclimate.com/github/codeanker/feathers-bee/coverage)
[![Dependency Status](https://img.shields.io/david/codeanker/feathers-bee.svg?style=flat-square)](https://david-dm.org/codeanker/feathers-bee)
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
const socketio = require('feathers-socketio');
const handler = require('feathers-errors/handler');
const bodyParser = require('body-parser');
const memory = require('feathers-memory');
const plugin = require('feathers-bee');

// Create a feathers instance.
const app = feathers()
  .configure(socketio())
  .configure(rest())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}));

app.use('/messages', memory({
  paginate: {
    default: 2,
    max: 4
  },
  id:'_id'
}));
app.use('/task', plugin({
  service: app.service('messages'),
  paginate: {
    default: 2,
    max: 4
  }
}));

// A basic error handler, just like Express
app.use(handler());

// Start the server
var server = app.listen(3030);
server.on('listening', function () {
  console.log('Feathers running on 127.0.0.1:3030');
});

```

## License

Copyright (c) 2017

Licensed under the [MIT license](LICENSE).
