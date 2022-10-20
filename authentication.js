const jwt = require('jsonwebtoken')
const parser = require('cookie-parser')
const secret = '3812048094ndqbjkebfcneofneofno39dqwo';
const exp = require('express');
const app = exp();
app.use(parser())

const auth = (req, res, next) => {
    const token = req.cookies["x-access-token"];

    if (!token) {
        res.status(403).send("No token")
    }

    try {
        console.log("There was a token")
        const decode = jwt.verify(token, secret)
        res.user = decode;
        return next();

    } catch (error) {
        console.log(error.message)
        res.status(401).send('404')
    }
}

module.exports = auth;
