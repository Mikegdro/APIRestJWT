const router = require('express').Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('./validate-token');
const mongoose = require('mongoose');
const { User } = require('../models/user')


router.post('/login', async (req, res) => {

    const userExists = User.findOne({
        email: /miguel@gmail.com/i
    }, function (err, user) {
        assert(/miguel@gmail.com/i.test(user.username))
    })

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
    });
    
    res.send({
        body: {
            error: "User Not Found",
        }
    })

});

router.post('/verify', verifyToken, async (req, res) => {
    res.json({
        "error": null 
    })
});

module.exports = router;