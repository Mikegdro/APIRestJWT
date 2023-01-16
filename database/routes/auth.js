const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {

    emailVerifier(req.body.email);

    const token = jwt.sign({
        name: req.body.name,
        email: req.body.email
    }, process.env.TOKEN_SECRET);

    res.header('auth-token', token).json({
        error: null,
        data: {token}
    })

});

module.exports = router;