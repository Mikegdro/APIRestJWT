//Recogemos mongoose
const mongoose = require('mongoose');
const user = require('../models/user');
require('dotenv').config;


const initDB = async function() {
    
    //Uri para la conexión a BBDD 
    const uri = `mongodb://${process.env.DBUSER}:${process.env.DBPASSWORD}@127.0.0.1:1888/?authMechanism=DEFAULT`;

    //Conexión a mongo con mongoose
    mongoose.connect( uri, {
        dbName: process.env.DBNAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected");
    }).catch( err => {
        console.error("Algo ha fallado al conectaro con la base de datos de mongo" + err);
    });

    
}

module.exports = initDB;
