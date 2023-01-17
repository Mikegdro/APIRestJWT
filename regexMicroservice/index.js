const WebSocketServer = require("ws").Server;
require('dotenv').config();
const jwt = require('jsonwebtoken');

var wss = new WebSocketServer({port: 8023});
var clientMaster = null;
var clients = [];
var first = true;

console.log("Server is Running...");

wss.broadcast = function broadcastMsg(msg, client) {
    
};


wss.on('connection', function connection(ws, request) {
    console.log(`Connection received: ${request.url}`);

    let url = request.url;
    let parsed = url.substring(url.indexOf('=') + 1);

    if(parsed != '' && validateToken(parsed)) {
        ws.send(JSON.stringify({
            msg: "Auth completed, you have 5 queries total"
        }))
    } else {
        ws.close();
    }

    ws.on('message', wss.broadcast);

    ws.on('close', e => console.log(`Disconnection: ${ws}`))
});

function validateToken(token) {
    // const token = req.header('auth-token');
    console.log(token, process.env.TOKEN_SECRET)
    if (!token) return res.status(401).json({ error: 'Token vacío' });

    return jwt.verify(token, process.env.TOKEN_SECRET);
    
}

