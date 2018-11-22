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
    bdUrl = 'mongodb://admin:c0f32108nov@ds029807.mlab.com:29807/cofe'
}

process.env.dbPath = bdUrl;

console.log('The data base: ' + process.env.dbPath);