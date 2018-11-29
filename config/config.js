// =======
// Puerto configuration
// =======
process.env.PORT = process.env.PORT || 3000;


//==================================================
// Ambiente
//==================================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//==================================================
// Secret key
//==================================================
process.env.JWT_SEED = process.env.JWT_SEED || 'dev_secret_seed';

//==================================================
// Google client id
//==================================================
process.env.GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || '125035945532-5kvmtvuhuovvuj7m364sjngac4aprass.apps.googleusercontent.com';

//==================================================
// Expiration time jwt token
//==================================================
process.env.JWT_EXPIRATION_TIME = process.env.JWT_EXPIRATION_TIME || 60 * 60 * 24 * 5;

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
console.log('the expiration time = ' + process.env.JWT_EXPIRATION_TIME);