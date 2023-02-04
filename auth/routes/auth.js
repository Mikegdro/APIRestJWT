const router = require('express').Router();
const jwt = require('jsonwebtoken');

/** 
 * Ruta de Login , recoge los datos de la request, comprueba la base de datos
 * y le devuelve una repuesta de login.
 * @param { object } req Información de la request del usuario
 * @param { object } res Objeto respuesta inyectado automáticamente para responder al 
 * usuario.
 */
router.post('/login', async (req, res) => {
    console.log(req.body.email)
    let token = createToken(req.body);
    logged(res, token);
});

/**
 * Le pasamos la respuesta y el token para que construya el JSON
 * de log que le tiene que llegar al usuario.
 * @param {Response} res 
 * @param {jwt} token 
 */
function logged(res, token) {
    res.header('auth-token', token).json({
        error: null,
        data: {token},
        body: {
            serverIp: process.env.SERVER_IP,
            serverPort: process.env.SERVER_PORT
        }
    });
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