import { WebSocketServer } from 'ws';
import axios from "axios"

var wss = new WebSocketServer({port: 8023});
var clientMaster = null;
var clients = [];
var first = true;

console.log("Server is Running...");

wss.broadcast = function broadcastMsg(msg, client) {
    let data = JSON.parse(msg);

    client.send(JSON.stringify(parseRegex()));
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

async function parseRegex() {


    return true;
}

async function validateToken(token) {
    const response = await axios.post('http://localhost:3000/api/user/verify', {
        headers: {
            Authorization: `token ${token}`
        }
    })
    .catch(e => {
        console.log(e)
    })
}

