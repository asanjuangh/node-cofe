const mongoose = require("mongoose");


mongoose.connect(process.env.dbPath, { useNewUrlParser: true }, (err, resp) => {
    if (err) {
        console.error(">>> Error conecting to db: " + err);
        throw err;
    }

    console.log("Dada Base Online...");
});