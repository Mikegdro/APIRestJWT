/**
 * Imports necesarios para el funcionamiento de la app
 */
const createServer = require('http').createServer;
const Server = require('socket.io').Server;
const jwt = require('jsonwebtoken');
const { parse } = require('path');
require('dotenv').config();

//Array de clientes en el que se almacenará información acerca de cada una de las conexiones
var clients = [];

//Workers disponibles para trabajar
var availableWorkers = 4;

//Tareas por hacer, aquí se almacenarán las tareas en formato pila para cuando los workers estén disponibles
var tasks = [];
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
        
        //Llamamos a la función que delega el trabajo
        workDelegator(arg, client);
        
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
 * Función recursiva que se llama a si misma al acabar una tarea para limpiar
 * la lista de tareas pendientes
 * @param {object} arg Argumentos de la expresión regular
 * @param {object} client Socket del cliente para devolverle una respuesta
 */
async function workDelegator(arg, client) {

    if(availableWorkers > 0) {
        //Creamos un worker
        var myWorker = new Worker("./parser/parser.js");

        myWorker.onmessage = function(event) {
            console.log(event.data);
        }

        //Restamos uno a la cantidad de workers disponibles

        //Añadimos el evento de respuesta del worker

        //Liberamos el worker si no hay más tareas disponibles

        //Devolvemos respuesta al usuario


    } else {
        //Añadimos la expresión regular y el usuario al <map> de tareas

    }

    
}

httpServer.listen(8023);

console.log("Server is Running...");