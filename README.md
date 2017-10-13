# feathers-bee

[![Greenkeeper badge](https://badges.greenkeeper.io/codeanker/feathers-bee.svg)](https://greenkeeper.io/)
[![Code Climate](https://codeclimate.com/github/codeanker/feathers-bee/badges/gpa.svg)](https://codeclimate.com/github/codeanker/feathers-bee)
[![Dependency Status](https://img.shields.io/david/codeanker/feathers-bee.svg?style=flat-square)](https://david-dm.org/codeanker/feathers-bee)
[![Download Status](https://img.shields.io/npm/dm/feathers-bee.svg?style=flat-square)](https://www.npmjs.com/package/feathers-bee)

## Installation

```
npm install feathers-bee --save
```

## Documentation

### Setup

```js
app.use('/bee', bee({
  service: app.service('serviceToLog'), // add your service
}));
```
### Plugin Args
* **service:** The service to log
* **paginate:** The default pagenate stuff

### Bee Queue events
The [bee-queue events](https://github.com/bee-queue/bee-queue#queue-local-events) are implemented as custom feathers events

## Usage
* **Create a new job:** call create at the bee service to create a new job
* **Get a job:** call get with a job id to get a job
* **Find jobs:** call find at the bee service to find the waiting jobs
  * change type with params


## Complete Example

Here's an example of a Feathers server that uses `feathers-bee`.

```js
const feathers = require('feathers');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
const handler = require('feathers-errors/handler');
const bodyParser = require('body-parser');
const memory = require('feathers-memory');
const bee = require('feathers-bee');

// Create a feathers instance.
const app = feathers()
  .configure(socketio())
  .configure(rest())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({extended: true}));

// Create any service you like.
app.use('/messages', memory({
  paginate: {
    default: 2,
    max: 4
  },
  id:'_id'
}));

// Create bee service
app.use('/bee', bee({
  service: app.service('messages'), // add your service
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
