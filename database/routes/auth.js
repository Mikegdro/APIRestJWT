const router = require('express').Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('./validate-token');

router.post('/login', async (req, res) => {

    const token = jwt.sign({
        name: req.body.name,
        password: req.body.password
    }, process.env.TOKEN_SECRET);

    res.header('auth-token', token).json({
        error: null,
        data: {token},
        body: {
            serverIp: process.env.SERVER_IP,
            serverPort: process.env.SERVER_PORT
        }
    })

});

router.post('/verify', verifyToken, async (req, res) => {
    res.json({
        "error": null 
    })
});

module.exports = router;