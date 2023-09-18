const bodyParser = require('body-parser');
const user = require('./user');
const post = require('./post');

module.exports = (app) => {
    app.use(
        bodyParser.json(),
        user,
        post
    )
}