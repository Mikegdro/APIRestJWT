const router = require('express').Router();
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const bcrypt = require('bcryptjs');

/** 
 * Ruta de Login , recoge los datos de la request, comprueba la base de datos
 * y le devuelve una repuesta de login.
 * @param { object } req Información de la request del usuario
 * @param { object } res Objeto respuesta inyectado automáticamente para responder al 
 * usuario.
 */
router.post('/login', async (req, res) => {

    //Buscamos al usuario
    await user.find({email: req.body.email}).exec()
        .then(usuario => {
            
            //Comparamos las contraseñas
            if( bcrypt.compareSync(req.body.password, usuario[0].password) ) {
                
                let token = createToken(req.body);

                res.header('auth-token', token).json({
                    error: null,
                    data: {token},
                    body: {
                        serverIp: process.env.SERVER_IP,
                        serverPort: process.env.SERVER_PORT
                    }
                });
            } else {
                res.status(401).json({
                    error: "Unauthorized"
                })
            }

        })
        .catch( error => {
            res.json({
                error: `401 Unauthorized ${error}`
            })
        })

});

/**
 * Ruta register, recoge los datos de la request, registra al usuario, 
 * y le devuelve una repuesta de login.
 * @param { object } req Información de la request del usuario
 * @param { object } res Objeto respuesta inyectado automáticamente para responder al 
 * usuario.
 */
router.post('/register', async (req, res) => {
    //Comprobamos si existe un usuario con ese mismo email
    let exists = await user.find({email:req.body.email}).exec()
        .then( usr => {
            return usr;
        })
        .catch( err => {
            console.log(err)
        })

    //Si existe devolvemos una respuesta temprana para que no cree el usuario
    if(exists.toLocaleString() == "") {
        //Hasheamos la contraseña
        let password = hashPassword(req.body.password);

        //Creamos el usuario
        let usuario = new user({
            email: req.body.email,
            password: password
        })

        //Guardamos el usuario
        usuario.save()
            .then( usr => {
                console.log(`User has logged in ${usr}`);

                let token = createToken(req.body);

                res.header('auth-token', token).json({
                    error: null,
                    data: {token},
                    body: {
                        serverIp: process.env.SERVER_IP,
                        serverPort: process.env.SERVER_PORT
                    }
                });

            })
            .catch( err => {
                console.log(err)
            })
    } else {
        res.status(401).send("Sorry, user already exists!");
    }

});

/**
 * Crea el hash de una contraseña
 * @param { password } password 
 * @returns 
 */
function hashPassword(password) {
    //Generamos la "Sal" y hasheamos la password
    let salt = bcrypt.genSaltSync(10);
    let pass = bcrypt.hashSync(password, salt);
    return pass;
}

/**
 * Crea un token con JWT usando DOTENV para recoger la clave secreta de otro archivo
 * @param { object } payload Información del usuario para que forme parte del token
 * @returns { object } token creado
 */
function createToken (payload) {
    let token = jwt.sign({
        name: payload.email,
        password: payload.password
    }, process.env.TOKEN_SECRET);

    return token;
}

module.exports = router;