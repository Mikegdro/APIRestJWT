/**
 * Imports necesarios para el funcionamiento de la app
 */
const createServer = require('http').createServer;
const Server = require('socket.io').Server;
const jwt = require('jsonwebtoken');
const worker = require('worker_threads');
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

    socket.send({
        error: null,
        msg: "Welcome!"
    });
    
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
        //Si estamos en el hilo principal, delegamos el trabajo a otro worker
        if(worker.isMainThread) {
            workDelegator(arg, client);
        }
   
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
 * Función que delega el trabajo a workers
 * @param {object} arg Argumentos de la expresión regular
 * @param {object} client Socket del cliente para devolverle una respuesta
 */
async function workDelegator(arg, client, oldWorker) {
    
    console.log(availableWorkers)

    if(availableWorkers > 0 || oldWorker != undefined) {
        //Creamos una promesa que se encargará de crear el worker y ejecutar el trabajo
        const currentWorker = oldWorker || new worker.Worker("./parser/parser.js", {
            workerData: arg.regex
        })

        currentWorker.on('message', (msg) => {
            client.socket.send({
                error: null,
                msg: msg
            })

            if(tasks.length > 0) {
                let task = tasks.pop();
                workDelegator(task.regex, task.client, currentWorker);
            } else {
                availableWorkers++;
                currentWorker.terminate();
            }
        });

        currentWorker.on('error', (error) => {
            client.socket.send({
                error: null,
                msg: error
            })

            if(tasks.length > 0) {
                let task = tasks.pop();
                workDelegator(task.regex, task.client, currentWorker);
            } else {
                availableWorkers++;
                currentWorker.terminate();
            }
        });

        currentWorker.on('exit', code => {
            if (code !== 0)
                new Error(`Worker stopped with exit code ${code}`);
        });

        //Restamos uno a la cantidad de workers disponibles
        availableWorkers--;

    } else {
        //Añadimos la expresión regular y el usuario al <map> de tareas
        tasks.push({
            client: client,
            regex: regex
        });
    }


    console.log(availableWorkers)
}

httpServer.listen(8023);

console.log("Server is Running...");