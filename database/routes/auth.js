const router = require('express').Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('./validate-token');
const mongoose = require('mongoose');
const User = require('../models/user');

router.post('/login', async (req, res) => {
    
    const token = jwt.sign({
        name: req.body.name,
        password: req.body.password
    }, process.env.TOKEN_SECRET);


    /**                    TO-DO:
     * Aquí hay que implementar que compruebe el usuario
     * en la base de datos antes de devolverle un token.
     * 
     */
    res.header('auth-token', token).json({
        error: null,
        data: {token},
        body: {
            serverIp: process.env.SERVER_IP,
            serverPort: process.env.SERVER_PORT
        }
    });
    
    

});

router.post('/register', async (req, res) => {

});

router.post('/verify', verifyToken, async (req, res) => {
    res.json({
        "error": null 
    })
});

module.exports = router;