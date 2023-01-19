const router = require('express').Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('./validate-token');
const mongoose = require('mongoose');
const User = require('../models/user');

router.post('/login', async (req, res) => {
    let correo = JSON.stringify(req.body.email);
    const userExists = await User.findOne({email: correo})
        .then( user => {
            console.log(user)
        })
        .catch( err => {
            console.log("err")
        })

    // const token = jwt.sign({
    //     name: req.body.name,
    //     password: req.body.password
    // }, process.env.TOKEN_SECRET);

    // res.header('auth-token', token).json({
    //     error: null,
    //     data: {token},
    //     body: {
    //         serverIp: process.env.SERVER_IP,
    //         serverPort: process.env.SERVER_PORT
    //     }
    // });
    
    // res.send({
    //     body: {
    //         error: "User Not Found",
    //     }
    // })

});

router.post('/register', async (req, res) => {

});

router.post('/verify', verifyToken, async (req, res) => {
    res.json({
        "error": null 
    })
});

module.exports = router;