// =======
// Puerto configuration
// =======
process.env.PORT = process.env.PORT || 3000;


//==================================================
// Ambiente
//==================================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';


//==================================================
//  Base de datos
//==================================================

let bdUrl;
if (process.env.NODE_ENV === 'dev') {
    bdUrl = 'mongodb://localhost:27017/cafe';
} else {
    bdUrl = process.env.MONGO_DB;
}

process.env.dbPath = bdUrl;

console.log('The data base: ' + process.env.dbPath);