require('../config/config');
require('../db/mongo');

const express = require('express');
const app = express();

app.use(require("./controllers/user"));

app.listen(process.env.PORT, () => {
    console.log('Listening port:' + process.env.PORT);
});