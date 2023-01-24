const router = require('express').Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('./validate-token');
const mongoose = require('mongoose');
const user = require('../models/user');

router.post('/login', async (req, res) => {
    
    
    console.log(req.body.email, req.body.password)
    let usuario =
        await user.find({email: req.body.email, password: req.body.password}).exec()
            .then(usuario => {
                console.log(usuario)
            })
            .catch( error => {
                console.log(error)
            })
    

    console.log(usuario)

    const token = jwt.sign({
        name: req.body.email,
        password: req.body.password
    }, process.env.TOKEN_SECRET);

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