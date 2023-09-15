const bodyParser = require('body-parser');
const user = require('./user');

module.exports = (app) => {
    app.use(
        bodyParser.json(),
        user
    )
}