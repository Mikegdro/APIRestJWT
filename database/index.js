const express = require("express");
const router = express.Router();

// require("./mongo/mongo");

const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'Funciona!'
    })
})

// cors
const cors = require('cors');
var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

//============ Rutas ============
const authRoutes = require("./routes/auth");
const verifyToken = require("./routes/validate-token");

app.use('/api/user', authRoutes);

//Exponemos el puerto para que escuche
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`El servidor está inicializado en el puerto ${PORT}`);
});