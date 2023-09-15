const express = require('express');
const routes = require('./routes');
const app = express();
const cors = require('cors');

app.use(cors());

require('./startup/db')();
require('./startup/routes')(app);

const port = 8080;

routes(app);

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = server;