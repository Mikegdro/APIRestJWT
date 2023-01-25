/**
 * Imports necesarios para el funcionamiento de la app
 */
const createServer = require('http').createServer;
const Server = require('socket.io').Server;
const parser = require('./gramatica');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//Array de clientes en el que se almacenará información acerca de cada una de las conexiones
var clients = [];

//
var workers = [];
/**
 * Servidores tanto de web socket como http necesarios para la comunicación con la parte de
 * cliente
 */
const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
})

/**
 * Evento de conexión
 * 
 * @param { socket } object objeto con los datos tanto del 
 * websocket como de la conexión http ya que al usar socket.io
 * se monta un http encima del socket para el uso de cabeceras 
 */
io.on('connection', ( socket ) => {
    let token = socket.handshake.auth.token;

    socket.send('Welcome!');
    
    let client = clients.find(client => client.token === token);
    if(client === undefined){
        client = { socket, tries: 5, token: token }
        clients.push(client);
    } 

    /**
     * Evento de mensaje de tipo "regex" para cuando el usuario manda una 
     * expresión regular
     * @param { arg } object Argumentos de la consulta del usuario
     */
    socket.on('regex', ( arg ) => {
        setTimeout( () => {
            parseRegex(arg)
                .then( resultado => {
                    client.tries--;
                    socket.send(resultado);
                }).catch( err => {
                    socket.send(err)
                })
        }, 5000)        
    })
//Middleware para JWT
}).use((socket, next) => {
    const token = socket.handshake.auth.token;
    
    if(token === undefined) next(new Error('Empty token'))

    try {
        jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    } catch (error) {
        next(new Error('Bad token'));
    }
})

/**
 * TODO => Arreglar esto para que salte un error léxico que se 
 * pueda capturar arriba y devolver un mensaje acorde al cliente
 */
async function parseRegex(regex) {

    let parsed = await parser.parse(`Evaluar[${regex.regex}];`);
    
    
    console.log(parsed)

    //return parsed;
}

httpServer.listen(8023);

console.log("Server is Running...");