//Recogemos mongoose
const mongoose = require('mongoose');
require('dotenv').config;

//Uri para la conexión a BBDD 
const uri = `mongodb://${process.env.USER}:${process.env.PASSWORD}@127.0.0.1:1888/?authMechanism=DEFAULT`;

//Conexión a mongo con mongoose
mongoose.connect( uri, {
    dbName: 'regexUserDb',
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected");
}).catch( err => {
    console.error("Algo ha fallado al conectaro con la base de datos de mongo" + err);
});

