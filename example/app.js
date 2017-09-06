const feathers = require('feathers');
const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
const handler = require('feathers-errors/handler');
const bodyParser = require('body-parser');
const memory = require('feathers-memory');
const plugin = require('../lib');

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
