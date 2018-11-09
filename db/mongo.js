const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/cafe', (err, resp) => {
    if (err) {
        throw err;
    }

    console.log("Dada Base Online...");
});