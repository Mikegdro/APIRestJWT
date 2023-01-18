var WebSocketServer = require('ws').Server;
var Axios = require('axios');
var parser = require('./gramatica');
var fs = require('fs');

var wss = new WebSocketServer({port: 8023});
var clientMaster = null;
var clients = [];
var first = true;


console.log("Server is Running...");

wss.broadcast = function broadcastMsg(msg) {
    console.log(msg.toJSON())
    let regex = msg.toString('utf8');

    console.log(regex)

    regex = JSON.parse(regex);

    let client = regex.ws;
    

    let regexValidity = parseRegex(regex);


};


wss.on('connection', function connection(ws, request) {
    console.log(`Connection received: ${request.url}`);

    let url = request.url;
    let parsed = url.substring(url.indexOf('=') + 1);

    if(parsed == '' && !validateToken(parsed)) {
        ws.close()
    } else {
        ws.send(JSON.stringify({
            msg: "Auth completed, you have 5 queries total"
        }))

        clients.push(ws);
    }

    ws.on('message', wss.broadcast);

    ws.on('close', e => {
        console.log(`Disconnection: ${ws}`);
        clients.splice(clients.indexOf(ws), 1);
    })
});

async function parseRegex(regex) {
    let regexValidity;

    try {
        regexValidity = await parser.parse(`Evaluar[${regex[0].value}];`)
    } catch( err ) {
        console.log(err);
    }
    
    return regex;
}

async function validateToken(token) {
    const response = await post('http://localhost:3000/api/user/verify', {
        headers: {
            Authorization: `token ${token}`
        }
    })
    .catch(e => {
        console.log(e)
    })
}

