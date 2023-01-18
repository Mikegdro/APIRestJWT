const jwt = require('jsonwebtoken')

// middleware to validate token (rutas protegidas)
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    let parsedToken = req.body.headers.Authorization;
    parsedToken = parsedToken.substring(6);

    if (!parsedToken) return res.status(401).json({ error: 'Token vacío' })

    try {
        const verified = jwt.verify(parsedToken, process.env.TOKEN_SECRET)
        req.user = verified
        next() 
    } catch (error) {
        res.status(400).json({error: 'Token inválido'})
    }
}

module.exports = verifyToken;