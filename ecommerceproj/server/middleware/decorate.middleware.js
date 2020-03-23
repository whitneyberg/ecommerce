
const bodyParser = require('body-parser');

function decorate(app){

    app.use(bodyParser.json());

    return app;
}

module.exports = decorate;