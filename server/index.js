const server = require('./app');
require('dotenv').config();

server.listen(8080, function() {
  console.log('Server is listening on http://localhost:8080');
});