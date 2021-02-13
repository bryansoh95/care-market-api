const config = require('config');
const app = require('./app');

const host = config.get('server.host');
const port = config.get('server.port');

app.listen(port, host, () => {
  console.log('The API server is running on port ' + port);
});