require('../config/config');
require('../db/mongo');

const express = require('express');
const app = express();
const path = require('path');

app.use(require("./controllers/config"));

app.use(express.static(path.resolve(__dirname, '../public')));

app.listen(process.env.PORT, () => {
    console.log('Listening port:' + process.env.PORT);
});