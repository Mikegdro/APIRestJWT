var WebSocketServer = require('ws').Server;
var Axios = require('axios');
var parser = require('./gramatica');
var fs = require('fs');

var wss = new WebSocketServer({port: 8023});
var clients = [];

console.log("Server is Running...");

wss.broadcast = function broadcastMsg(msg) {
    //Descodificamos la comunicación y la parseamos
    let regex = msg.toString('utf8');
    regex = JSON.parse(regex);

    //Buscamos el cliente en el array de objetos
    let clientUrl = parseUrl(regex.url);
    let client = clients.find(elem => elem.token == clientUrl);
    
    //Comprobamos la expresión regular
    let regexValidity = parseRegex(regex);

    //Le restamos intentos al usuario y devolvemos un JSON con los datos
    /**
     * TODO => BUSCAR MANERA DE HACER QUE ESTO SE EJECUTE DE MANERA ASÍNCRONA CUANDO
     * LA VALIDEZ DE LA REGEX SE HAYA RESUELTO, NO SE PORQUE, PERO .THEN() NO FUNCIONA
     * 
     */
    client.tries --;
    client.socket.send(JSON.stringify({
        resultado: regexValidity,
        tries: client.tries
    }));
};


wss.on('connection', function connection(ws, request) {
    console.log(`Connection received: ${request.url}`);

    let token = parseUrl(request.url);
    let validToken = validateToken(token);

    if(!validToken) {
        ws.close()
    }

    ws.send(JSON.stringify({
        msg: "Auth completed, you have 5 queries total"
    }))

    clients.push({
        socket: ws,
        token: token,
        tries: 5
    });
    
    ws.on('message', wss.broadcast);

    ws.on('close', e => {
        console.log(`Disconnection: ${ws}`);
        clients.splice(clients.indexOf(clients.find(elem => elem.socket == ws)), 1);
    })
});

async function parseRegex(regex) {
    let regexValidity;

    try {
        regexValidity = await parser.parse(`Evaluar[${regex.regex}];`)
    } catch ( err ) {
        return "Error interno ( 501 )";
    }

    return regex;
}

async function validateToken(token) {
    const response = await Axios.post('http://localhost:3000/api/user/verify', {
        headers: {
            Authorization: `token ${token}`
        }
    })
    .catch(e => {
        console.log(e)
    })

    return true;
}

function parseUrl(url) {
    let parsed = url.substring(url.indexOf('=') + 1);

    return parsed;
}
