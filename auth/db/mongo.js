//Recogemos mongoose
const mongoose = require('mongoose');
require('dotenv').config;


const initDB = async function() {
    
    //Uri para la conexión a BBDD 
    const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/?authMechanism=DEFAULT`;

    //Conexión a mongo con mongoose
    mongoose.connect( uri, {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected");
    }).catch( err => {
        console.error("Algo ha fallado al conectaro con la base de datos de mongo" + err);
    });
}

module.exports = initDB;
