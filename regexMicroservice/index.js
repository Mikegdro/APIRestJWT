const createServer = require('http').createServer;
const Server = require('socket.io').Server;
const parser = require('./gramatica');
const jwt = require('jsonwebtoken');
require('dotenv').config();

var clients = [];

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

io.on('connection', ( socket ) => {
    let token = socket.handshake.auth.token;

    socket.send('Welcome!');
    
    let client = clients.find(client => client.token === token);
    if(client === undefined){
        client = { socket, tries: 5, token: token }
        clients.push(client);
    } 

    socket.on('regex', ( arg ) => {
        parseRegex(arg)
            .then( resultado => {
                client.tries--;
                socket.send(resultado);
            }).catch(
                socket.send(new Error('Invalid Regex'))
            )
    })
//Middleware para JWT
}).use((socket, next) => {
    const token = socket.handshake.auth.token;
    
    if(token === undefined) next(new Error('Empty token'))

    try {
        jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    } catch (error) {
        next(new Error('Bad token'))
    }
})

/**
 * TODO => Arreglar esto para que salte un error léxico que se 
 * pueda capturar arriba y devolver un mensaje acorde al cliente
 */
async function parseRegex(regex) {
    try {
        await parser.parse(`Evaluar[${regex.regex}];`);
    } catch (err) {
        console.log(err)
    }
}

httpServer.listen(8023);

console.log("Server is Running...");