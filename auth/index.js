const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors
const cors = require('cors');
var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

//============ Rutas ============
const authRoutes = require("./routes/auth");
app.use('/api/user', authRoutes);

//========== Iniciamos la conexión con la Base de Datos =======//

//Exponemos el puerto para que escuche
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`El servidor está inicializado en el puerto ${PORT}`);
});