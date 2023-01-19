var WebSocketServer = require('ws').Server;
var Axios = require('axios');
var parser = require('./gramatica');
var fs = require('fs');

var wss = new WebSocketServer({
    port: 8023,
    verifyClient: function(info, cb) {
        var token = info.req.headers.token;

        if(!token) {
            cb(false, 401, "Unauthorized");
        } else {
            jwt.verify(token, `${process.env.TOKEN_SECRET}`, function (err, decoded) {
                if ( err ) {
                    cb(false, 401, 'Unauthorized');
                } else {
                    info.req.user = decoded;
                    cb(true);
                }
            })
        }
    }
});
var clients = [];

console.log("Server is Running...");

wss.broadcast = function broadcastMsg(msg) {
    //Descodificamos la comunicación y la parseamos
    let regex = msg.toString('utf8');
    regex = JSON.parse(regex);
    
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


wss.on('connection',  ( conn ) => {
    let user = conn.upgradeReq.user;
    ws.send('Welcome!' + user.name);
    ws.on('message', ( data ) => {
        console.log(data)
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